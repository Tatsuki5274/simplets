/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import AWS, { CognitoIdentityServiceProvider } from "aws-sdk";
import { ApolloQueryResult } from "@apollo/client";
import AWSAppSyncClient from "aws-appsync";
import * as yargs from "yargs";
import { v4 as uuidv4 } from "uuid";
import * as jsonData from "./config.json";
import gql from "graphql-tag";
import {
  createGroup,
  createCompany,
  createEmployee,
} from "./graphql/mutations";
import { CreateCompanyInput } from "./API";
import { CreateGroupInput } from "./API";
import { CreateEmployeeInput } from "./API";
import { EmployeeType } from "./API";
import { BooleanType } from "./API";
require("aws-amplify").AUTH_TYPE;

type TypConfigJson = {
  [env: string]:
    | {
        userpoolid?: string;
        graphqlEndpoint?: string;
        region?: string;
        url?: string;
        IAM?: string;
      }
    | undefined;
};

const main = async () => {
  //パスワード生成する関数
  const createPassword = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const str = numbers + letters + letters.toUpperCase();
    const length = 8;
    let password = "";
    const num = numbers.charAt(Math.random());

    for (let i = 0; i < length; i++) {
      password += str.charAt(Math.floor(Math.random() * str.length));
    }
    return password + num;
  };

  async function graphqlMutation(mutation: string, params: unknown) {
    const result = (await client.mutate({
      mutation: gql(mutation),
      variables: params,
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    })) as ApolloQueryResult<unknown>;
    return result;
  }
  //コマンド引数取り出し
  const argv = yargs
    .option("ccode", {
      describe: "Company Code to register",
      type: "string",
    })
    .option("cname", {
      describe: "Company Name to register",
      type: "string",
    })
    .option("email", {
      describe: "Mail Address to register",
      type: "string",
    })
    .option("start", {
      describe: "Start Month to register",
      type: "number",
    })
    .option("env", {
      describe: "Environment to register",
      type: "string",
    }).argv;

  const argvObj = await argv;

  if (!argvObj.ccode) {
    throw new Error("[失敗]ccodeが入力されていません");
  }
  if (!argvObj.cname) {
    throw new Error("[失敗]cnameが入力されていません");
  }
  if (!argvObj.email) {
    throw new Error("[失敗]emailが入力されていません");
  }
  if (!argvObj.start) {
    throw new Error("[失敗]startが入力されていません");
  }
  if (!argvObj.env) {
    throw new Error("[失敗]envが入力されていません");
  }
  console.log("[成功]パラメーターが正常に入力されました");

  //エンドポイントのエラー・完了メッセージ
  const JsonTypedData: TypConfigJson = jsonData;
  const environment = JsonTypedData[argvObj.env];
  if (typeof environment == "undefined") {
    throw new Error("[失敗]環境名が設定に存在しません");
  } else if (!environment.userpoolid) {
    throw new Error("[失敗]ユーザープールが設定に存在しません");
  } else if (!environment.graphqlEndpoint) {
    throw new Error("[失敗]AppSyncエンドポイントが設定に存在しません");
  } else if (!environment.url) {
    throw new Error("[失敗]ログイン先URLが設定に存在しません");
  } else {
    console.log("[成功]設定の取得に成功しました");
  }

  //アタッチするプロファイル設定
  const credentialProfile = environment.IAM;
  if (typeof credentialProfile != "string") {
    throw new Error("プロファイル名が存在しません");
  }
  const credentials = new AWS.SharedIniFileCredentials({
    profile: credentialProfile,
  });

  AWS.config.update({
    region: "ap-northeast-1",
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
    },
  });

  const pass = createPassword();
  //ユーザープールにユーザーを追加
  const accountRegister = new CognitoIdentityServiceProvider();
  const userParams: CognitoIdentityServiceProvider.AdminCreateUserRequest = {
    UserPoolId: environment.userpoolid,
    Username: argvObj.email,
    TemporaryPassword: pass,
    UserAttributes: [
      {
        Name: "email",
        Value: argvObj.email,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
      {
        Name: "custom:companyId",
        Value: argvObj.ccode,
      },
      {
        Name: "custom:isCompanyAdmin",
        Value: "true",
      },
    ],
  };

  const inputUser = await accountRegister.adminCreateUser(userParams).promise();
  const sub = inputUser.User?.Attributes?.find((element) => {
    return element.Name === "sub";
  })?.Value;
  if (typeof sub != "string") {
    throw new Error("subが取得できませんでした");
  }
  console.log("[成功]ユーザープールへユーザーを登録しました");

  //グループを追加
  const groupRegister = new CognitoIdentityServiceProvider();
  const groupParams: CognitoIdentityServiceProvider.CreateGroupRequest = {
    GroupName: argvObj.ccode,
    UserPoolId: environment.userpoolid,
  };
  await groupRegister.createGroup(groupParams).promise();
  console.log("[成功]ユーザープールへグループを登録しました");

  //ユーザーをグループに追加
  const userToGroup = new CognitoIdentityServiceProvider();
  const userToGroupParam: CognitoIdentityServiceProvider.AdminAddUserToGroupRequest =
    {
      GroupName: argvObj.ccode,
      UserPoolId: environment.userpoolid,
      Username: argvObj.email,
    };
  await userToGroup.adminAddUserToGroup(userToGroupParam).promise();
  console.log("[成功]ユーザーをグループへ追加しました");

  if (!environment.region) {
    throw new Error("regionが設定されていません");
  }

  const client = new AWSAppSyncClient({
    url: environment.graphqlEndpoint,
    region: environment.region,
    disableOffline: true,
    auth: {
      type: "AWS_IAM",
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
      },
    },
  });

  //会社情報追加
  const companyInput: CreateCompanyInput = {
    id: argvObj.ccode,
    isContractEvaluation: true,
    isContractReport: true,
    name: argvObj.cname,
    shortName: "",
    startMonth: argvObj.start,
    url: null,
  };
  const companyVariables = {
    input: companyInput,
  };
  await graphqlMutation(createCompany, companyVariables);
  console.log("[成功]会社テーブルへデータを追加しました");

  //部署情報追加
  const groupId = uuidv4();
  const groupInput: CreateGroupInput = {
    id: groupId,
    companyID: argvObj.ccode,
    no: "0",
    name: "デフォルト",
  };
  const groupVariables = {
    input: groupInput,
  };

  await graphqlMutation(createGroup, groupVariables);
  console.log("[成功]部署テーブルへデータを追加しました");

  //社員情報追加
  const employeeInput: CreateEmployeeInput = {
    companyID: argvObj.ccode,
    email: argvObj.email,
    username: argvObj.email,
    firstName: "",
    grade: "",
    groupID: groupId,
    isCompanyAdmin: true,
    isDeleted: BooleanType.FALSE,
    lastName: "",
    manager: EmployeeType.OTHER,
    no: "0",
    sub: sub,
    superiorUsername: "",
  };
  const employeeVariables = {
    input: employeeInput,
  };
  await graphqlMutation(createEmployee, employeeVariables);
  console.log("[成功]社員テーブルへデータを追加しました");

  func.outputUrl(environment.url);
  func.outputId(argvObj.ccode);
  func.outputUserName(argvObj.email);
  func.outputPassword(pass);
};

const func = {
  // 純粋関数にする。全ての引数に対して(４つ)
  outputUrl: (url: string) => {
    console.log("ログインURL:", url);
  },
  outputId: (ccode: string) => {
    console.log("会社ID:", ccode);
  },
  outputUserName: (email: string) => {
    console.log("ユーザー名:", email);
  },
  outputPassword: (password: string) => {
    console.log("パスワード:", password);
  },
};

main();

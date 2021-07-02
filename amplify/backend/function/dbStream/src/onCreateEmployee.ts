import AWS from "aws-sdk";
import { updateEmployee } from "./graphql/mutations";
import { EmployeeDao } from "./libs/dao/employeeDao";
import { env } from "process";
import generatePassword from "password-generator";
import { getTypeErrorMessage, StreamEventRecordType } from "./types";

AWS.config.update({ region: "ap-northeast-1" });

/**
 * @throws Error
 * @throws TypeError
 */
export default async function (record: StreamEventRecordType) {
  const cognitoidentityserviceprovider =
    new AWS.CognitoIdentityServiceProvider();

  const userPoolId = env.AUTH_SCCSYSTEME53C89F0_USERPOOLID;
  if (!userPoolId) {
    throw new Error("userPoolId is not defined");
  }

  const dynamoDb = record?.dynamodb;
  const newImage = dynamoDb?.NewImage;
  const keys = dynamoDb?.Keys;

  if (typeof newImage !== "object") {
    throw new TypeError("newImage is not object");
  }
  const email: unknown = newImage?.email?.S;
  const companyID: unknown = newImage?.companyID?.S;
  const isCompanyAdmin: unknown = newImage?.isCompanyAdmin?.BOOL;
  const username: unknown = keys?.username?.S;
  // 型チェック
  if (typeof email !== "string") {
    throw new TypeError(getTypeErrorMessage("email", "string", typeof email));
  }
  if (typeof companyID !== "string") {
    throw new TypeError(
      getTypeErrorMessage("companyID", "string", typeof companyID)
    );
  }
  if (typeof isCompanyAdmin !== "boolean") {
    throw new TypeError(
      getTypeErrorMessage("isCompanyAdmin", "boolean", typeof isCompanyAdmin)
    );
  }
  if (typeof username !== "string") {
    throw new TypeError(
      getTypeErrorMessage("username", "string", typeof username)
    );
  }
  const password = generateCustomPassword();

  const params = {
    UserPoolId: userPoolId,
    Username: username,
    DesiredDeliveryMediums: [
      "EMAIL",
      /* more items */
    ],
    // ForceAliasCreation: true || false,
    // MessageAction: "SUPPRESS",
    TemporaryPassword: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "email_verified",
        Value: "false",
      },
      {
        Name: "custom:companyId",
        Value: companyID,
      },
      {
        Name: "custom:isCompanyAdmin",
        Value: isCompanyAdmin ? "true" : "false",
      },
      /* more items */
    ],
    // ValidationData: [
    //   {s
    //     Name: 'STRING_VALUE', /* required */
    //     Value: 'STRING_VALUE'
    //   },
    //   /* more items */
    // ]
  };
  const result = await cognitoidentityserviceprovider
    .adminCreateUser(params)
    .promise();

  const sub =
    result.User?.Attributes?.find((element) => {
      return element.Name === "sub";
    })?.Value || null;

  if (!sub) {
    throw new Error("sub is not defined");
  }
  // const updated = await updateEmployeeSub(username, sub, companyID);
  const updated = await EmployeeDao.update(updateEmployee, {
    username: username,
    sub: sub,
  });

  if (!updated) {
    throw new Error('Employee couldn\'t update field "sub"');
  }
  // eslint-disable-next-line no-console
  console.log("done");
}

/**
 * @description パスワードを作成する関数
 * @returns 作成したランダムなパスワードを返却する
 * @see https://www.npmjs.com/package/password-generator
 */
const generateCustomPassword = (): string => {
  const maxLength = 10;
  const minLength = 10;
  const uppercaseMinCount = 0;
  const lowercaseMinCount = 1;
  const numberMinCount = 1;
  const specialMinCount = 0;
  const UPPERCASE_RE = /([A-Z])/g;
  const LOWERCASE_RE = /([a-z])/g;
  const NUMBER_RE = /([\d])/g;
  const SPECIAL_CHAR_RE = /([\\?\\-])/g;
  const NON_REPEATING_CHAR_RE = /([\w\d\\?\\-])\1{2,}/g;

  const isStrongEnough = (password: string) => {
    const uc = password.match(UPPERCASE_RE);
    const lc = password.match(LOWERCASE_RE);
    const n = password.match(NUMBER_RE);
    const sc = password.match(SPECIAL_CHAR_RE);
    const nr = password.match(NON_REPEATING_CHAR_RE);
    return (
      password.length >= minLength &&
      !nr &&
      uc &&
      uc.length >= uppercaseMinCount &&
      lc &&
      lc.length >= lowercaseMinCount &&
      n &&
      n.length >= numberMinCount &&
      sc &&
      sc.length >= specialMinCount
    );
  };

  const customPassword = (): string => {
    let password = "";
    const randomLength =
      Math.floor(Math.random() * (maxLength - minLength)) + minLength;
    let i = 0;
    while (!isStrongEnough(password)) {
      password = generatePassword(randomLength, false, /[\w\d\\?\\-]/);
      i++;
      if (i > 100) {
        // eslint-disable-next-line no-console
        console.error(
          "パスワードを試行回数以内で作成することができませんでした"
        );
        throw new Error("Too many times to generate password.");
      }
    }
    return password;
  };
  return customPassword();
};

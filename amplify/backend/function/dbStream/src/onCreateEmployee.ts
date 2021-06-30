import AWS from "aws-sdk";
import { env } from "process";
import updateEmployeeSub from "./scripts/updateEmployeeSub";

AWS.config.update({ region: "ap-northeast-1" });

export default async function (record: any) {
  const cognitoidentityserviceprovider =
    new AWS.CognitoIdentityServiceProvider();

  const userPoolId = env.AUTH_SCCSYSTEME53C89F0_USERPOOLID;
  if (!userPoolId) {
    throw new Error("userPoolId is not defined");
  }

  console.log("record:", JSON.stringify(record));
  const dynamoDb = record?.dynamodb;
  const newImage = dynamoDb?.NewImage;
  if (typeof newImage !== "object") {
    throw new TypeError("newImage is not object");
  }
  const email: unknown = newImage?.email?.S;
  const companyID: unknown = newImage?.companyID?.S;
  const isCompanyAdmin: unknown = newImage?.isCompanyAdmin?.BOOL;
  const username: unknown = newImage?.username?.S;

  // 型チェック
  if (typeof email !== "string") {
    throw new TypeError("email is not string");
  }
  if (typeof companyID !== "string") {
    throw new TypeError("companyID is not string");
  }
  if (typeof isCompanyAdmin !== "boolean") {
    throw new TypeError("isCompanyAdmin is not boolean");
  }
  if (typeof username !== "string") {
    throw new TypeError("username is not string");
  }

  const params = {
    UserPoolId: userPoolId,
    Username: username,
    DesiredDeliveryMediums: [
      "EMAIL",
      /* more items */
    ],
    // ForceAliasCreation: true || false,
    // MessageAction: "SUPPRESS",
    TemporaryPassword: "pass1234", // 乱数生成を検討
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
  console.log(JSON.stringify(result));

  const sub =
    result.User?.Attributes?.find((element) => {
      return element.Name === "sub";
    })?.Value || null;

  if (!sub) {
    throw new Error("sub is not defined");
  }
  const updated = await updateEmployeeSub(username, sub, companyID);
}

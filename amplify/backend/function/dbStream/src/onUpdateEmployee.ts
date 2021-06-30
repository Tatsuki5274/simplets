import AWS from "aws-sdk";
import { env } from "process";

AWS.config.update({ region: "ap-northeast-1" });

export default async function (record: any) {
  const cognitoidentityserviceprovider =
    new AWS.CognitoIdentityServiceProvider();

  const dynamoDb = record?.dynamodb;
  const keys = dynamoDb?.Keys;
  const newImage = dynamoDb?.NewImage;
  const oldImage = dynamoDb?.OldImage;
  const newCompanyId: unknown = newImage?.companyID?.S;
  const oldCompanyId: unknown = oldImage?.companyID?.S;
  // const oldIsCompanyAdmin: unknown = oldImage?.isCompanyAdmin?.BOOL;
  const newIsCompanyAdmin: unknown = newImage?.isCompanyAdmin?.BOOL;
  const username: unknown = keys?.username?.S;

  const userPoolId = env.AUTH_SCCSYSTEME53C89F0_USERPOOLID;
  if (!userPoolId) {
    throw new Error("userPoolId is not defined");
  }
  if (newCompanyId !== oldCompanyId) {
    // 社員の所属会社を変更することは許容しない
    throw new Error("company can't update");
  }
  if (typeof username !== "string") {
    throw new TypeError("username is not string");
  }
  if (typeof newIsCompanyAdmin !== "boolean") {
    throw new TypeError("newIsCompanyAdmin is not boolean");
  }

  // 意図の不明な条件分岐
  // if (
  //   oldCompanyId !== newCompanyId ||
  //   oldIsCompanyAdmin !== newIsCompanyAdmin
  // ) {
  const params = {
    UserAttributes: [
      // {
      //   Name: "custom:companyId",
      //   Value: String(newCompanyId),
      // },
      {
        Name: "custom:isCompanyAdmin",
        Value: newIsCompanyAdmin ? "true" : "false",
      },
    ],
    UserPoolId: userPoolId,
    Username: username,
  };
  const result = await cognitoidentityserviceprovider
    .adminUpdateUserAttributes(params)
    .promise();
  console.log(JSON.stringify(result));
}

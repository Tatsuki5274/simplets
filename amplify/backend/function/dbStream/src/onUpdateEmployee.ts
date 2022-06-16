import AWS from "aws-sdk";
import { env } from "process";
import { getTypeErrorMessage, StreamEventRecordType } from "./types";

AWS.config.update({ region: "ap-northeast-1" });

/**
 * @throws Error
 * @throws TypeError
 */
export default async function (record: StreamEventRecordType) {
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
    throw new Error("userPoolId is not set");
  }
  if (newCompanyId !== oldCompanyId) {
    // 社員の所属会社を変更することは許容しない
    throw new Error("To chenage company is not allowed");
  }
  if (typeof username !== "string") {
    throw new TypeError(
      getTypeErrorMessage("username", "string", typeof username)
    );
  }
  if (typeof newIsCompanyAdmin !== "boolean") {
    throw new TypeError(
      getTypeErrorMessage(
        "newIsCompanyAdmin",
        "boolean",
        typeof newIsCompanyAdmin
      )
    );
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

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(result));
}

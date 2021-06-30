import AWS from "aws-sdk";
import { env } from "process";

AWS.config.update({ region: "ap-northeast-1" });

export default async function (record: any) {
  const cognitoidentityserviceprovider =
    new AWS.CognitoIdentityServiceProvider();

  const dynamoDb = record?.dynamodb;
  const keys = dynamoDb?.Keys;
  const username: unknown = keys?.username?.S;

  const userPoolId = env.AUTH_SCCSYSTEME53C89F0_USERPOOLID;
  if (!userPoolId) {
    throw new Error("userPoolId is not defined");
  }
  if (typeof username !== "string") {
    throw new TypeError("username is not string");
  }

  const params = {
    UserPoolId: userPoolId,
    Username: username,
  };
  const result = await cognitoidentityserviceprovider
    .adminDeleteUser(params)
    .promise();
  console.log(JSON.stringify(result));
}

import AWS from "aws-sdk";
import { env } from "process";

AWS.config.update({ region: "ap-northeast-1" });

export default async function (record: any) {
  const cognitoidentityserviceprovider =
    new AWS.CognitoIdentityServiceProvider();

  const dynamoDb = record["dynamodb"];
  const keys = dynamoDb["Keys"];
  const username = keys["username"].S;

  if (env.AUTH_SCCSYSTEME53C89F0_USERPOOLID) {
    const params = {
      UserPoolId: env.AUTH_SCCSYSTEME53C89F0_USERPOOLID /* required */,
      Username: username /* required */,
    };
    const result = await cognitoidentityserviceprovider
      .adminDeleteUser(params)
      .promise();
    console.log(JSON.stringify(result));
  }
}

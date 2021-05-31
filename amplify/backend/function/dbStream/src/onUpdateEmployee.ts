import AWS from "aws-sdk";
import { env } from "process";

AWS.config.update({ region: "ap-northeast-1" });

export default async function (record: any) {
  const cognitoidentityserviceprovider =
    new AWS.CognitoIdentityServiceProvider();

  const dynamoDb = record["dynamodb"];
  const keys = dynamoDb["Keys"];
  const newImage = dynamoDb["NewImage"];
  const oldImage = dynamoDb["OldImage"];
  const newCompanyId = newImage["companyID"].S;
  const oldCompanyId = oldImage["companyID"].S;
  const oldIsCompanyAdmin = oldImage["isCompanyAdmin"].BOOL;
  const newIsCompanyAdmin = newImage["isCompanyAdmin"].BOOL;
  const username = keys["username"].S;

  if (env.AUTH_SCCSYSTEME53C89F0_USERPOOLID) {
    if (
      oldCompanyId !== newCompanyId ||
      oldIsCompanyAdmin !== newIsCompanyAdmin
    ) {
      const params = {
        UserAttributes: [
          /* required */
          {
            Name: "custom:companyId" /* required */,
            Value: String(newCompanyId),
          },
          {
            Name: "custom:isCompanyAdmin" /* required */,
            Value: String(newIsCompanyAdmin),
          },
          /* more items */
        ],
        UserPoolId: env.AUTH_SCCSYSTEME53C89F0_USERPOOLID /* required */,
        Username: username /* required */,
        // ClientMetadata: {
        //     '<StringType>': 'STRING_VALUE',
        //     /* '<StringType>': ... */
        // }
      };
      const result = await cognitoidentityserviceprovider
        .adminUpdateUserAttributes(params)
        .promise();
      console.log(JSON.stringify(result));
    }
  }
}

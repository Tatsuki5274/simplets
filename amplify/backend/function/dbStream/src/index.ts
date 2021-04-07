// AUTH_SCCSYSTEME53C89F0_USERPOOLID

import AWS from "aws-sdk";
import { env } from "process";
import updateEmployeeSub from "./scripts/updateEmployeeSub";

AWS.config.update({ region: 'ap-northeast-1' });
export const handler = async (event: any) => {
    // Todo eventの型定義

    const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    for (const record of event.Records) {
        const ddbARN = record['eventSourceARN']
        const ddbTable = ddbARN.split(':')[5].split('/')[1]     // dynamoDBテーブル名 例. Sheet-xxxxxxx-dev, Group-xxxxxxxx-prodなど
        const typeName = ddbTable.split('-')[0]                 // GraphQLスキーマ Type名 例. Sheet, Groupなど
        const eventName = record['eventName']                   // イベント名 例、INSERTなど

        switch (typeName) {
            case "Employee":
                switch (eventName) {
                    case "INSERT":
                        if (env.AUTH_SCCSYSTEME53C89F0_USERPOOLID) {
                            var params = {
                                UserPoolId: env.AUTH_SCCSYSTEME53C89F0_USERPOOLID, /* required */
                                Username: 'admintest1', /* required */
                                // ClientMetadata: {
                                //   '<StringType>': 'STRING_VALUE',
                                //   /* '<StringType>': ... */
                                // },
                                DesiredDeliveryMediums: [
                                    "EMAIL",
                                    /* more items */
                                ],
                                // ForceAliasCreation: true || false,
                                // MessageAction: "SUPPRESS",
                                TemporaryPassword: 'pass1234',
                                UserAttributes: [
                                    {
                                        Name: 'email', /* required */
                                        Value: 'yhamazaki@sisco-consulting.co.jp'
                                    },
                                    {
                                        Name: 'email_verified', /* required */
                                        Value: 'false'
                                    },
                                    {
                                        Name: 'custom:companyId', /* required */
                                        Value: 'SCC'
                                    },
                                    /* more items */
                                ],
                                // ValidationData: [
                                //   {
                                //     Name: 'STRING_VALUE', /* required */
                                //     Value: 'STRING_VALUE'
                                //   },
                                //   /* more items */
                                // ]
                            };
                            const result = await cognitoidentityserviceprovider.adminCreateUser(params).promise();
                            console.log(JSON.stringify(result))

                            const userName = result.User?.Username;
                            const sub = result.User?.Attributes?.find(element => {
                                return element.Name === "sub"
                            })?.Value
                            const companyId = result.User?.Attributes?.find(element => {
                                return element.Name === "custom:companyId"
                            })?.Value
                            if (userName && sub && companyId) {
                                const updated = await updateEmployeeSub(userName, sub, companyId);
                            } else {
                                throw new Error("required field is undefined")
                            }
                        }
                        break
                    default:
                        throw new Error("不明なイベントが指定されました");
                }
                break
        }
    }

    // Todo レスポンスの検討（設計
    const response = {
        statusCode: 200,
        body: "event",
    };

    return response;
};

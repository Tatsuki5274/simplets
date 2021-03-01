import { ApolloQueryResult } from "@apollo/client";
import AWS from "aws-sdk";
import { env } from "process";
import { ListEmployeesQuery, UpdateEmployeeMutationVariables } from "../API";
import { executeMutation, executeQuery } from "../client";
import { updateEmployee } from "../graphql/mutations";
import { listEmployees } from "../graphql/queries";

var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

async function getUsersFromUserPool() {
    const userPoolId = env.AUTH_SCCSYSTEME53C89F0_USERPOOLID
    console.log("ユーザープール", userPoolId)

    if (userPoolId) {
        const params = {
            UserPoolId: userPoolId, /* required */
            AttributesToGet: [
                'sub',
            ],
            // Filter: 'STRING_VALUE',
            // Limit: 'NUMBER_VALUE',
            // PaginationToken: 'STRING_VALUE'
        };

        // cognitoidentityserviceprovider.listUsers(params, function(err, data) {
        //     if (err) console.log(err, err.stack); // an error occurred
        //     else     console.log(data);           // successful response
        // });     
        const response = await cognitoidentityserviceprovider.listUsers(params).promise();
        // console.log("response", JSON.stringify(response, null, 2));
        return response.Users?.map(user => {
            return {
                username: user.Username || null,
                sub: user.Attributes?.find(attr => {
                    return attr.Name === "sub"
                })?.Value || null
            }
        }) || null
    } else {
        console.log("ユーザープールが未設定です")
        return null
    }
}

export default async function () {
    //subの取得
    const users = await getUsersFromUserPool()

    if (users) {
        //変更元の取得
        const employees: ApolloQueryResult<ListEmployeesQuery> | null = await executeQuery(listEmployees, {})

        //データが正常かチェック
        if (employees?.data.listEmployees?.items) {

            //変更の反映開始
            for (const emp of employees.data.listEmployees.items) {

                // 更新対象のチェック
                if (emp?.username && emp.companyID) {
                    const param: UpdateEmployeeMutationVariables = {
                        input: {
                            companyID: emp.companyID,
                            username: emp.username,
                            sub: users.find(user => {
                                return user.username === emp.username
                            })?.sub || null
                        }
                    }
                    // console.log("param", param)

                    //更新処理の実行
                    const updated = await executeMutation(updateEmployee, param)
                    console.log("result", updated)
                }
            }
        }
    }

}
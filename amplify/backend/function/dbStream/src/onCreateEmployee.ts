import AWS from "aws-sdk";
import { env } from "process";
import updateEmployeeSub from "./scripts/updateEmployeeSub";

AWS.config.update({ region: "ap-northeast-1" });

export default async function (record: any) {
  const cognitoidentityserviceprovider =
    new AWS.CognitoIdentityServiceProvider();

  if (env.AUTH_SCCSYSTEME53C89F0_USERPOOLID) {
    console.log("record:", JSON.stringify(record));
    const dynamoDb = record["dynamodb"];
    const newImage = dynamoDb["NewImage"];
    const email = String(newImage["email"].S);
    const companyID = String(newImage["companyID"].S);
    const isCompanyAdmin = String(newImage["isCompanyAdmin"].BOOL);
    const username = String(newImage["username"].S);

    const params = {
      UserPoolId: env.AUTH_SCCSYSTEME53C89F0_USERPOOLID /* required */,
      Username: username,
      // Username: 'yhamazaki+2@sisco-consulting.co.jp', /* required */
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
      TemporaryPassword: "pass1234",
      UserAttributes: [
        {
          Name: "email" /* required */,
          Value: email,
        },
        {
          Name: "email_verified" /* required */,
          Value: "false",
        },
        {
          Name: "custom:companyId" /* required */,
          Value: companyID,
        },
        {
          Name: "custom:isCompanyAdmin",
          Value: isCompanyAdmin,
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
    // const result = {
    //   User: {
    //     Username: "yhamazaki+11@sisco-consulting.co.jp",
    //     Attributes: [
    //       {
    //         Name: "sub",
    //         Value: "4a7279b3-2411-4c85-974c-32b087453910",
    //       },
    //       {
    //         Name: "email_verified",
    //         Value: "false",
    //       },
    //       {
    //         Name: "custom:companyId",
    //         Value: "SCC",
    //       },
    //       {
    //         Name: "custom:isCompanyAdmin",
    //         Value: "false",
    //       },
    //       {
    //         Name: "email",
    //         Value: "yhamazaki+11@sisco-consulting.co.jp",
    //       },
    //     ],
    //     UserCreateDate: "2021-03-24T08:43:55.910Z",
    //     UserLastModifiedDate: "2021-03-24T08:43:55.910Z",
    //     Enabled: true,
    //     UserStatus: "FORCE_CHANGE_PASSWORD",
    //   },
    // };
    console.log(JSON.stringify(result));

    const userName = result.User?.Username;
    const sub = result.User?.Attributes?.find((element) => {
      return element.Name === "sub";
    })?.Value;
    const companyId = result.User?.Attributes?.find((element) => {
      return element.Name === "custom:companyId";
    })?.Value;
    if (userName && sub && companyId) {
      const updated = await updateEmployeeSub(userName, sub, companyId);
    } else {
      throw new Error("required field is undefined");
    }
  }
}

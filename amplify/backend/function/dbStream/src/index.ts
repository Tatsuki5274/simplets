// AUTH_SCCSYSTEME53C89F0_USERPOOLID

// import AWS from "aws-sdk";
import onUpdateEmployee from "./onUpdateEmployee";
import onCreateEmployee from "./onCreateEmployee";
import onDeleteEmployee from "./onDeleteEmployee";
// import { env } from "process";
// import updateEmployeeSub from "./scripts/updateEmployeeSub";

// AWS.config.update({ region: 'ap-northeast-1' });
export const handler = async (event: any) => {
  // Todo eventの型定義

  // const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  try {
    for (const record of event.Records) {
      const ddbARN = record["eventSourceARN"];
      const ddbTable = ddbARN.split(":")[5].split("/")[1]; // dynamoDBテーブル名 例. Sheet-xxxxxxx-dev, Group-xxxxxxxx-prodなど
      const typeName = ddbTable.split("-")[0]; // GraphQLスキーマ Type名 例. Sheet, Groupなど
      const eventName = record["eventName"]; // イベント名 例、INSERTなど

      console.log("typeName:", typeName);
      console.log(JSON.stringify(record));

      switch (typeName) {
        case "Employee":
          switch (eventName) {
            case "INSERT":
              // console.log("record:", JSON.stringify(record))
              // const dynamoDb = record["dynamodb"];
              // const newImage = dynamoDb['NewImage'];
              // const email = newImage['email'].S;
              // const companyId = newImage['companyID'].S;
              // const isCompanyAdmin = newImage['isCompanyAdmin'].BOOL;
              // const username = newImage['username'].S;

              await onCreateEmployee(record);

              break;
            case "MODIFY":
              await onUpdateEmployee(record);
              break;
            case "REMOVE":
              await onDeleteEmployee(record);
              break;
            default:
              throw new Error("不明なイベントが指定されました");
          }
          break;
        default:
          throw new Error("不明なイベントが指定されました");
      }
    }
  } catch (e) {
    console.error("Error", e);
    return {
      statusCode: 500,
      message: `${e.name}: ${e.message}`,
    };
  }

  const response = {
    statusCode: 200,
    message: "Operation successfully completed",
    //result: result
  };
  return response;
};

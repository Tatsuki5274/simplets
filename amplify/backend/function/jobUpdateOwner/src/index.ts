import UpdateOwners from "./jobs/updateOwners";
import { StreamEventType } from "./types";

export type EventType = {
  typeName?: string;
  fieldName?: string;
  arguments?: any;
  identity?: any;
};

export type ObjectType = {
  [key: string]: ObjectType | string | boolean;
};

/*
context: {
    "functionName": "mock-function-name",
    "functionVersion": "1",
    "invokedFunctionArn": "mock-function-arn",
    "memoryLimitInMB": "128",
    "awsRequestId": "LAMBDA_INVOKE",
    "logGroupName": "LAMBDA_INVOKE",
    "logStreamName": "LAMBDA_INVOKE",
    "callbackWaitsForEmptyEventLoop": true
}
*/

// export const handler = async (
//   event: EventType
//   // context: unknown
// ): Promise<unknown> => {
//   const typeName: string | null = event.typeName || null;
//   const fieldName: string | null = event.fieldName || null;
//   let result: unknown = null;

//   const companyId: string | null =
//     event?.identity?.claims?.["custom:companyId"] || null;
//   const isCompanyAdmin =
//     event?.identity?.claims?.["custom:isCompanyAdmin"] === "true";

//   if (typeName === "Mutation") {
//     if (fieldName === "updateOwners") {
//       if (!isCompanyAdmin) {
//         // 社内管理者であることを検証
//         throw new Error("You don't have permission.");
//       }
//       if (!companyId) {
//         throw new Error("companyId is required.");
//       }

//       result = await UpdateOwners(event);
//     } else {
//       throw new Error("unknown fieldName");
//     }
//   } else {
//     throw new Error("unknown typeName");
//   }

//   console.log("Success", JSON.stringify(result));
//   return result;
// };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const handler = async (event: StreamEventType) => {
  try {
    for (const record of event.Records) {
      const ddbARN = record["eventSourceARN"];
      const ddbTable = ddbARN.split(":")[5].split("/")[1]; // dynamoDBテーブル名 例. Sheet-xxxxxxx-dev, Group-xxxxxxxx-prodなど
      const typeName = ddbTable.split("-")[0]; // GraphQLスキーマ Type名 例. Sheet, Groupなど
      const eventName = record["eventName"]; // イベント名 例、INSERTなど

      switch (typeName) {
        case "Job":
          switch (eventName) {
            case "INSERT":
              // eslint-disable-next-line no-case-declarations
              const companyId = record.dynamodb.NewImage?.companyID?.S;
              // eslint-disable-next-line no-case-declarations
              const email = record.dynamodb.NewImage?.email?.S;
              if (typeof companyId !== "string") {
                throw new Error("ID is not string");
              }
              if (typeof email !== "string") {
                throw new Error("email is not string");
              }
              await UpdateOwners(companyId, email);
              break;
            // case "MODIFY":
            //   await onUpdateEmployee(record);
            //   break;
            // case "REMOVE":
            //   await onDeleteEmployee(record);
            //   break;
            default:
              throw new Error("不明なイベントが指定されました");
          }
          break;
        default:
          throw new Error("不明なテーブルが指定されました");
      }
    }
  } catch (e) {
    // 各種処理で例外を検知した場合はエラーとして返却する

    if (e instanceof Error) {
      // eslint-disable-next-line no-console
      console.error("Error", e);
      return {
        statusCode: 500,
        message: `${e.name}: ${e.message}`,
      };
    }
  }

  const response = {
    statusCode: 200,
    message: "Operation successfully completed",
    //result: result
  };
  return response;
};

// userPoolId: AUTH_SCCSYSTEME53C89F0_USERPOOLID
import onUpdateEmployee from "./onUpdateEmployee";
import onCreateEmployee from "./onCreateEmployee";
import onDeleteEmployee from "./onDeleteEmployee";
import { StreamEventType } from "./types";

// AWS.config.update({ region: 'ap-northeast-1' });
export const handler = async (event: StreamEventType) => {
  try {
    for (const record of event.Records) {
      const ddbARN = record["eventSourceARN"];
      const ddbTable = ddbARN.split(":")[5].split("/")[1]; // dynamoDBテーブル名 例. Sheet-xxxxxxx-dev, Group-xxxxxxxx-prodなど
      const typeName = ddbTable.split("-")[0]; // GraphQLスキーマ Type名 例. Sheet, Groupなど
      const eventName = record["eventName"]; // イベント名 例、INSERTなど

      switch (typeName) {
        case "Employee":
          switch (eventName) {
            case "INSERT":
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
          throw new Error("不明なテーブルが指定されました");
      }
    }
  } catch (e) {
    // 各種処理で例外を検知した場合はエラーとして返却する

    // eslint-disable-next-line no-console
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

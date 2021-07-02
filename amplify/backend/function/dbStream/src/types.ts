/**
 * @description DynamoDB StreamによってトリガーされたLambda関数の入力
 */
export type StreamEventType = {
  Records: StreamEventRecordType[];
};

/**
 * @description DynamoDB一件に対する変更の形式
 */
export type StreamEventRecordType = {
  eventID: string;
  eventName: string;
  eventSourceARN: string;
  dynamodb: {
    Keys: {
      [key: string]: { [key: string]: string | boolean };
    };
    NewImage?: {
      [key: string]: { [key: string]: string | boolean };
    };
    OldImage?: {
      [key: string]: { [key: string]: string | boolean };
    };
  };
};

/**
 * @description 想定しない型が指定された場合のエラーメッセージを作成する関数
 * @param fieldName 想定しない型が得られた属性名
 * @param expectedType 期待する型名
 * @param givenType 実際に得られた型名
 * @returns エラーメッセージを返却する
 */
export const getTypeErrorMessage = (
  fieldName: string,
  expectedType: string,
  givenType: string
): string => {
  const message = `"${fieldName}" is expected ${expectedType}, but given ${givenType}`;
  return message;
};

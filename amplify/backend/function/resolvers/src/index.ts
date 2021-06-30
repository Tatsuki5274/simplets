// import * as lambda from 'aws-lambda';
import UpdateOwners from "./resolvers/updateOwners";

export type EventType = {
  typeName?: string;
  fieldName?: string;
  arguments?: ObjectType;
  identity?: ObjectType;
};

export type ObjectType = {
  [key: string]: ObjectType | string | boolean;
};

type ResponseType = ObjectType;

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

export const handler = async (event: EventType, context: any) => {
  const typeName: string | null = event.typeName || null;
  const fieldName: string | null = event.fieldName || null;
  let result: ResponseType | undefined = undefined;
  console.log("It's only on TypeScript");

  try {
    if (typeName === "Mutation") {
      if (fieldName === "updateOwners") {
        result = await UpdateOwners(event);
      } else {
        throw new Error("fieldName is undefined");
      }
    } else {
      throw new Error("typeName is undefined");
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
    result: result,
  };
  return response;
};

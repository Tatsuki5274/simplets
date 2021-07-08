import deleteSheetWithChildrenByCompanyAdmin from "./resolvers/deleteSheetWithChildrenByCompanyAdmin";
import { deleteSheet } from "./graphql/mutations";
import UpdateOwners from "./resolvers/updateOwners";

export type EventType = {
  typeName?: string;
  fieldName?: string;
  arguments?: any;
  identity?: ObjectType;
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

export const handler = async (
  event: EventType,
  context: unknown
): Promise<unknown> => {
  const typeName: string | null = event.typeName || null;
  const fieldName: string | null = event.fieldName || null;
  let result: unknown = null;

  if (typeName === "Mutation") {
    if (fieldName === "updateOwners") {
      result = await UpdateOwners(event);
    } else if (fieldName === "deleteSheetWithChildrenByCompanyAdmin") {
      const id = event?.arguments?.input?.id || null;
      if (typeof id !== "string") {
        throw new TypeError("id is not string");
      }
      result = await deleteSheetWithChildrenByCompanyAdmin(
        deleteSheet,
        {
          id: id,
        },
        event.identity?.claims
      );
    } else {
      throw new Error("unknown fieldName");
    }
  } else {
    throw new Error("unknown typeName");
  }

  console.log("Success", JSON.stringify(result));
  return result;
};

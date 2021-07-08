import deleteSheetWithChildrenByCompanyAdmin from "./resolvers/deleteSheetWithChildrenByCompanyAdmin";
import { deleteSheet } from "./graphql/mutations";
import UpdateOwners from "./resolvers/updateOwners";
import getOwnCompany from "./resolvers/getOwnCompany";

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

export const handler = async (
  event: EventType,
  context: unknown
): Promise<unknown> => {
  const typeName: string | null = event.typeName || null;
  const fieldName: string | null = event.fieldName || null;
  let result: unknown = null;

  const companyId: string | null =
    event?.identity?.claims?.["custom:companyId"] || null;
  const isCompanyAdmin =
    event?.identity?.claims?.["custom:isCompanyAdmin"] === "true";

  if (typeName === "Mutation") {
    if (fieldName === "updateOwners") {
      if (!isCompanyAdmin) {
        // 社内管理者であることを検証
        throw new Error("You don't have permission");
      }
      if (!companyId) {
        throw new Error("companyId is required.");
      }

      result = await UpdateOwners(event);
    } else if (fieldName === "deleteSheetWithChildrenByCompanyAdmin") {
      if (!isCompanyAdmin) {
        // 社内管理者であることを検証
        throw new Error("You don't have permission");
      }
      if (!companyId) {
        throw new Error("companyId is required.");
      }

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
  } else if (typeName === "Query") {
    if (fieldName === "getOwnCompany") {
      if (!companyId) {
        throw new Error("companyId is required.");
      }
      const query: unknown = event?.arguments?.query || null;
      if (typeof query !== "string") {
        throw new TypeError("query is not string.");
      }

      result = await getOwnCompany(query, companyId);
    } else {
      throw new Error("unknown fieldName");
    }
  } else {
    throw new Error("unknown typeName");
  }

  console.log("Success", JSON.stringify(result));
  return result;
};

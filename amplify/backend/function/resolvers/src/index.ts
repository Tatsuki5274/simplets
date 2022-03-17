import deleteSheetWithChildrenByCompanyAdmin from "./resolvers/deleteSheetWithChildrenByCompanyAdmin";
import { deleteSheet } from "./graphql/mutations";
import UpdateOwners from "./resolvers/updateOwners";
import getOwnCompany from "./resolvers/getOwnCompany";
import updateReportByCompanyAdmin from "./resolvers/updateReportByCompanyAdmin";
import deleteReportByCompanyAdmin from "./resolvers/deleteReportByCompanyAdmin";
import createCategoryByCompanyAdmin from "./resolvers/createCategoryByCompanyAdmin";
import updateCategoryByCompanyAdmin from "./resolvers/updateCategoryByCompanyAdmin";
import deleteCategoryByCompanyAdmin from "./resolvers/deleteCategoryByCompanyAdmin";
import createEmployeeByCompanyAdmin from "./resolvers/createEmployeeByCompanyAdmin";
import updateEmployeeByCompanyAdmin from "./resolvers/updateEmployeeByCompanyAdmin";
import deleteEmployeeByCompanyAdmin from "./resolvers/deleteEmployeeByCompanyAdmin";
import createGroupByCompanyAdmin from "./resolvers/createGroupByCompanyAdmin";
import updateGroupByCompanyAdmin from "./resolvers/updateGroupByCompanyAdmin";
import deleteGroupByCompanyAdmin from "./resolvers/deleteGroupByCompanyAdmin";
import updateSheetByCompanyAdmin from "./resolvers/updateSheetByCompanyAdmin";

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
  event: EventType
  // context: unknown
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
    } else if (fieldName === "createCategoryByCompanyAdmin") {
      if (!isCompanyAdmin) {
        // 社内管理者であることを検証
        throw new Error("You don't have permission");
      }
      if (!companyId) {
        throw new Error("companyId is required.");
      }
      const params = event?.arguments?.input;
      if (typeof params !== "object") {
        throw new TypeError("params not provided.");
      }
      result = await createCategoryByCompanyAdmin(params, companyId);
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
    } else if (fieldName === "updateCategoryByCompanyAdmin") {
      if (!isCompanyAdmin) {
        // 社内管理者であることを検証
        throw new Error("You don't have permission");
      }
      if (!companyId) {
        throw new Error("companyId is required.");
      }
      const params = event?.arguments?.input;
      if (typeof params !== "object") {
        throw new TypeError("params not provided.");
      }
      result = await updateCategoryByCompanyAdmin(params, companyId);
      // todo テスト
    } else if (fieldName === "deleteCategoryByCompanyAdmin") {
      if (!isCompanyAdmin) {
        // 社内管理者であることを検証
        throw new Error("You don't have permission");
      }
      if (!companyId) {
        throw new Error("companyId is required.");
      }
      const params = event?.arguments?.input;
      if (typeof params !== "object") {
        throw new TypeError("params not provided.");
      }
      result = await deleteCategoryByCompanyAdmin(params, companyId);
    } else if (fieldName === "createEmployeeByCompanyAdmin") {
      if (!isCompanyAdmin) {
        // 社内管理者であることを検証
        throw new Error("You don't have permission");
      }
      if (!companyId) {
        throw new Error("companyId is required.");
      }
      const params = event?.arguments?.input;
      if (typeof params !== "object") {
        throw new TypeError("params not provided.");
      }
      result = await createEmployeeByCompanyAdmin(params, companyId);
    } else if (fieldName === "updateEmployeeByCompanyAdmin") {
      if (!isCompanyAdmin) {
        // 社内管理者であることを検証
        throw new Error("You don't have permission");
      }
      if (!companyId) {
        throw new Error("companyId is required.");
      }
      const params = event?.arguments?.input;
      if (typeof params !== "object") {
        throw new TypeError("params not provided.");
      }
      result = await updateEmployeeByCompanyAdmin(params, companyId);
    } else if (fieldName === "deleteEmployeeByCompanyAdmin") {
      if (!isCompanyAdmin) {
        // 社内管理者であることを検証
        throw new Error("You don't have permission");
      }
      if (!companyId) {
        throw new Error("companyId is required.");
      }
      const params = event?.arguments?.input;
      if (typeof params !== "object") {
        throw new TypeError("params not provided.");
      }
      const loginUserSub = event.identity.claims.sub;
      result = await deleteEmployeeByCompanyAdmin(
        params,
        companyId,
        loginUserSub
      );
    } else if (fieldName === "createGroupByCompanyAdmin") {
      if (!isCompanyAdmin) {
        // 社内管理者であることを検証
        throw new Error("You don't have permission");
      }
      if (!companyId) {
        throw new Error("companyId is required.");
      }
      const params = event?.arguments?.input;
      if (typeof params !== "object") {
        throw new TypeError("params not provided.");
      }
      result = await createGroupByCompanyAdmin(params, companyId);
    } else if (fieldName === "updateGroupByCompanyAdmin") {
      if (!isCompanyAdmin) {
        // 社内管理者であることを検証
        throw new Error("You don't have permission");
      }
      if (!companyId) {
        throw new Error("companyId is required.");
      }
      const params = event?.arguments?.input;
      if (typeof params !== "object") {
        throw new TypeError("params not provided.");
      }
      result = await updateGroupByCompanyAdmin(params, companyId);
    } else if (fieldName === "deleteGroupByCompanyAdmin") {
      if (!isCompanyAdmin) {
        // 社内管理者であることを検証
        throw new Error("You don't have permission");
      }
      if (!companyId) {
        throw new Error("companyId is required.");
      }
      const params = event?.arguments?.input;
      if (typeof params !== "object") {
        throw new TypeError("params not provided.");
      }
      result = await deleteGroupByCompanyAdmin(params, companyId);
    } else if (fieldName === "updateSheetByCompanyAdmin") {
      if (!isCompanyAdmin) {
        // 社内管理者であることを検証
        throw new Error("You don't have permission");
      }
      if (!companyId) {
        throw new Error("companyId is required.");
      }
      const params = event?.arguments?.input;
      if (typeof params !== "object") {
        throw new TypeError("params not provided.");
      }
      result = await updateSheetByCompanyAdmin(params, companyId);
    } else if (fieldName === "updateReportByCompanyAdmin") {
      if (!isCompanyAdmin) {
        // 社内管理者であることを検証
        throw new Error("You don't have permission");
      }
      if (!companyId) {
        throw new Error("companyId is required.");
      }
      const params = event?.arguments?.input;
      if (typeof params !== "object") {
        throw new TypeError("params not provided.");
      }
      result = await updateReportByCompanyAdmin(params, companyId);
    } else if (fieldName === "deleteReportByCompanyAdmin") {
      if (!isCompanyAdmin) {
        // 社内管理者であることを検証
        throw new Error("You don't have permission");
      }
      if (!companyId) {
        throw new Error("companyId is required.");
      }
      const params = event?.arguments?.input;
      if (typeof params !== "object") {
        throw new TypeError("params not provided.");
      }
      result = await deleteReportByCompanyAdmin(params, companyId);
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

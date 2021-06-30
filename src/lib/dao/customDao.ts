import { updateOwners } from "graphql/mutations";
import * as APIt from "../../API";
import { BaseDao } from "./common/baseDao";

export const CustomDao = {
  /**
   * @description カスタムリゾルバーを実行
   * @returns リゾルバーの実行結果
   */
  updateOwners: async (): Promise<APIt.UpdateOwnerResponseType> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await BaseDao.create(updateOwners, {});
    if (typeof result !== "object" || !result) {
      throw TypeError("Response is not object");
    }
    return {
      __typename: "UpdateOwnerResponseType",
      statusCode: result?.updateOwners?.statusCode || undefined,
      message: result?.updateOwners?.message || undefined,
      result: result?.updateOwners?.result || undefined,
    };
  },
};

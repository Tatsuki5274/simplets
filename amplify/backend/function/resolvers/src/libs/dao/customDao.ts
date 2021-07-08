import { updateOwners } from "graphql/mutations";
import * as APIt from "../../API";
import { BaseDao } from "./common/baseDao";

export const CustomDao = {
  /**
   * @description カスタムリゾルバーを実行
   * @returns リゾルバーの実行結果
   * @authority 社内管理者
   */
  updateOwners: async (): Promise<APIt.UpdateOwnerResponseType> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await BaseDao.create(updateOwners, {});
    if (typeof result !== "object" || !result) {
      throw TypeError("Response is not object");
    }
    if (!result?.updateOwners?.isSuccess) {
      throw new Error("Operation failed");
    }
    return result?.updateOwners || null;
  },
};

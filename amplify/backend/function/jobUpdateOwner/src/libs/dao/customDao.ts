import { sendEmail, updateOwners } from "../../graphql/mutations";
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
      // eslint-disable-next-line no-console
      console.error("型エラー: 結果がオブジェクトではありません。");
      throw TypeError("内部エラーが発生しました。");
    }
    if (!result?.updateOwners?.isSuccess) {
      throw new Error("処理に失敗しました。");
    }
    return result?.updateOwners || null;
  },
  sendEmail: async (
    params: APIt.sendEmailInput
  ): Promise<APIt.SendEmailMutation> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (await BaseDao.create(
      sendEmail,
      params
    )) as APIt.SendEmailMutation;
    return result;
  },
};

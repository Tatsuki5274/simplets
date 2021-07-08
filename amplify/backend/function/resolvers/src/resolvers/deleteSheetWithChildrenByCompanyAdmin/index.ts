import { SheetDao } from "../../libs/dao/sheetDao";
import { DeleteObjectiveInput, Sheet } from "../../API";
import { ObjectiveDao } from "../../libs/dao/objectiveDao";
import { getSheet } from "../../graphql/queries";
import {
  deleteObjective,
  deleteSection,
  deleteSheet,
} from "../../graphql/mutations";
import { SectionDao } from "../../libs/dao/sectionDao";

/**
 * @param query 削除に用いるミューテーション
 * @param params 削除する対象のid
 * @param claims ログインしているユーザーのクレーム
 * @returns 削除した対象の評価シート
 * @description 評価シートを削除する処理。この処理は社内管理者のみに許可された操作。
 */
const deleteSheetWithChildrenByCompanyAdmin = async (
  query: string,
  params: DeleteObjectiveInput,
  claims: any
): Promise<Sheet | null> => {
  if (typeof claims !== "object") {
    throw TypeError("claims is not found.");
  }
  const companyId: string | null = claims["custom:companyId"] || null;

  const sheetId = params.id;
  const sheet = await SheetDao.get(getSheet, { id: sheetId });

  // 会社チェック
  if (sheet?.companyID !== companyId) {
    // 自社の評価シートではない場合
    throw new Error("You don't have permission");
  }

  // 全ての目標カテゴリを削除する
  await Promise.all(
    sheet?.section?.items?.map(async (section) => {
      if (!section?.id) {
        throw new Error("section.idがありません");
      }

      // 全ての目標を削除する
      await Promise.all(
        section?.objective?.items?.map(async (objective) => {
          if (!objective?.id) {
            throw new Error("objective.idがありません");
          }
          const delObjective = await ObjectiveDao.delete(deleteObjective, {
            id: objective.id,
          });
          if (!delObjective) {
            throw new Error("目標の削除に失敗しました");
          }
        }) || []
      );

      // 目標の削除に成功した場合は所属する目標カテゴリを削除する
      const delSection = SectionDao.delete(deleteSection, {
        id: section.id,
      });
      if (!delSection) {
        throw new Error("目標カテゴリの削除に失敗しました");
      }
      return;
    }) || []
  );

  const result = SheetDao.delete(deleteSheet, params);
  if (!result) {
    throw new Error("Operation failed");
  }
  return result;
};
export default deleteSheetWithChildrenByCompanyAdmin;

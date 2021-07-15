import { getCategory } from "../../graphql/queries";
import { Category, UpdateCategoryInput } from "../../API";
import { updateCategory } from "../../graphql/mutations";
import { CategoryDao } from "../../libs/dao/categoryDao";

/**
 */
const updateCategoryByCompanyAdmin = async (
  params: UpdateCategoryInput,
  companyId: string
): Promise<Category | null> => {
  delete params.companyID; // 会社番号の変更は無効化する
  const category = await CategoryDao.get(getCategory, { id: params.id });
  if (category?.companyID !== companyId) {
    // 登録しているカテゴリが別の会社のデータの場合は拒否
    throw new Error("You don't have permission");
  }
  const updateResult = await CategoryDao.update(updateCategory, params);
  if (!updateResult) {
    // 自社の評価シートではない場合
    throw new Error("Operation failed.");
  }

  return updateResult;
};
export default updateCategoryByCompanyAdmin;

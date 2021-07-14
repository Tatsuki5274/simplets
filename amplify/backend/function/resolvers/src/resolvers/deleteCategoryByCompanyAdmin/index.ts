import { getCategory } from "../../graphql/queries";
import { Category, DeleteCategoryInput } from "../../API";
import { deleteCategory } from "../../graphql/mutations";
import { CategoryDao } from "../../libs/dao/categoryDao";

/**
 */
const deleteCategoryByCompanyAdmin = async (
  params: DeleteCategoryInput,
  companyId: string
): Promise<Category | null> => {
  const category = await CategoryDao.get(getCategory, { id: params.id });
  if (category?.companyID !== companyId) {
    throw new Error("You don't have permission");
  }
  const deleteResult = await CategoryDao.delete(deleteCategory, params);
  if (!deleteResult) {
    // 自社の評価シートではない場合
    throw new Error("Operation failed.");
  }

  return deleteResult;
};
export default deleteCategoryByCompanyAdmin;

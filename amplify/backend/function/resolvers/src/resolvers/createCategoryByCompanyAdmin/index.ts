import { Category, CreateCategoryInput } from "../../API";
import { createCategory } from "../../graphql/mutations";
import { CategoryDao } from "../../libs/dao/categoryDao";

/**
 */
const createCategoryByCompanyAdmin = async (
  params: CreateCategoryInput,
  companyId: string
): Promise<Category | null> => {
  params.companyID = companyId; // 会社番号を上書きする
  const category = await CategoryDao.create(createCategory, params);
  if (!category) {
    throw new Error("Operation failed.");
  }

  return category;
};
export default createCategoryByCompanyAdmin;

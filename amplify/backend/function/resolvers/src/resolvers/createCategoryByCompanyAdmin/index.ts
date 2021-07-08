import { Category, CreateCategoryInput } from "../../API";
import { createCategory } from "../../graphql/mutations";
import { CategoryDao } from "../../libs/dao/categoryDao";

/**
 */
const createCategoryByCompanyAdmin = async (
  query: string,
  params: CreateCategoryInput,
  claims: any
): Promise<Category | null> => {
  if (typeof claims !== "object") {
    throw TypeError("claims is not found.");
  }
  const companyId: string | null = claims["custom:companyId"] || null;

  if (!companyId) {
    // 会社番号が登録されていない場合
    throw new Error("CompanyID is not found.");
  }

  params.companyID = companyId;
  const category = await CategoryDao.create(createCategory, params);
  if (!category) {
    // 自社の評価シートではない場合
    throw new Error("Operation failed.");
  }

  return category;
};
export default createCategoryByCompanyAdmin;

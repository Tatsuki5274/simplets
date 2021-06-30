import * as APIt from "../../API";
import { Category } from "../../API";
import { BaseDao } from "./common/baseDao";

export const CategoryDao = {
  create: async (
    mutation: string,
    params: APIt.CreateCategoryInput
  ): Promise<Category | null> => {
    const result = (await BaseDao.create(
      mutation,
      params
    )) as APIt.CreateCategoryMutation;
    return result.createCategory || null;
  },
  update: async (
    mutation: string,
    params: APIt.UpdateCategoryInput
  ): Promise<Category | null> => {
    const result = (await BaseDao.update(
      mutation,
      params
    )) as APIt.UpdateCategoryMutation;
    return result.updateCategory || null;
  },
  delete: async (
    mutation: string,
    params: APIt.DeleteCategoryInput
  ): Promise<Category | null> => {
    const result = (await BaseDao.delete(
      mutation,
      params
    )) as APIt.DeleteCategoryMutation;
    return result.deleteCategory || null;
  },
  get: async (
    query: string,
    params: APIt.GetCategoryQueryVariables
  ): Promise<Category | null> => {
    const result = (await BaseDao.get(query, params)) as APIt.GetCategoryQuery;
    return result.getCategory || null;
  },

  /**
   * @deprecated 検証用のみ
   */
  list: async (
    query: string,
    params: APIt.ListCategorysQueryVariables
  ): Promise<(Category | null)[] | null> => {
    const result = (await BaseDao.list(
      query,
      params
    )) as APIt.ListCategorysQuery;
    return result.listCategorys?.items || null;
  },
  listCompany: async (
    query: string,
    params: APIt.ListCategorysCompanyQueryVariables
  ): Promise<(Category | null)[] | null> => {
    const result = (await BaseDao.list(
      query,
      params
    )) as APIt.ListCategorysCompanyQuery;
    return result.listCategorysCompany?.items || null;
  },
};

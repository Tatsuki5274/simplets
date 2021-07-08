import * as APIt from "../../API";
import { Company } from "../../API";
import { BaseDao } from "./common/baseDao";

export const CompanyDao = {
  create: async (
    mutation: string,
    params: APIt.CreateCompanyInput
  ): Promise<Company | null> => {
    const result = (await BaseDao.create(
      mutation,
      params
    )) as APIt.CreateCompanyMutation;
    return result.createCompany || null;
  },
  update: async (
    mutation: string,
    params: APIt.UpdateCompanyInput
  ): Promise<Company | null> => {
    const result = (await BaseDao.update(
      mutation,
      params
    )) as APIt.UpdateCompanyMutation;
    return result.updateCompany || null;
  },
  delete: async (
    mutation: string,
    params: APIt.DeleteCompanyInput
  ): Promise<Company | null> => {
    const result = (await BaseDao.delete(
      mutation,
      params
    )) as APIt.DeleteCompanyMutation;
    return result.deleteCompany || null;
  },
  /**
   * @param params 指定の会社IDのデータを取得する
   */
  get: async (
    query: string,
    params: APIt.GetCompanyQueryVariables
  ): Promise<Company | null> => {
    const result = (await BaseDao.get(query, params)) as APIt.GetCompanyQuery;
    return result.getCompany || null;
  },
  // 仕様検討中
  // /**
  //  * @description 自分の所属する会社情報を取得する
  //  */
  // getOwn: async (query: string): Promise<Company | null> => {
  //   const result = (await BaseDao.get(query, {})) as APIt.GetOwnCompanyQuery;
  //   return result.getOwnCompany || null;
  // },
  /**
   * @deprecated 検証用のみ
   * @authority IAM
   */
  list: async (
    query: string,
    params: APIt.ListCompanysQueryVariables
  ): Promise<(Company | null)[] | null> => {
    const result = (await BaseDao.list(
      query,
      params
    )) as APIt.ListCompanysQuery;
    return result.listCompanys?.items || null;
  },
};

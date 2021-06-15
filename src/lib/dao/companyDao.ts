/* eslint-disable no-console */ //暫定措置
import * as APIt from "API";
import { Company } from "API";
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
  get: async (
    query: string,
    params: APIt.GetCompanyQueryVariables
  ): Promise<Company | null> => {
    const result = (await BaseDao.get(query, params)) as APIt.GetCompanyQuery;
    return result.getCompany || null;
  },
  /**
   * @deprecated 検証用のみ
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

/* eslint-disable no-console */ //暫定措置
import * as APIt from "API";
import { Sheet } from "API";
import { BaseDao } from "./common/baseDao";

export const SheetDao = {
  create: async (
    mutation: string,
    params: APIt.CreateSheetInput
  ): Promise<Sheet | null> => {
    const result = (await BaseDao.create(
      mutation,
      params
    )) as APIt.CreateSheetMutation;
    return (result.createSheet as Sheet) || null;
  },
  update: async (
    mutation: string,
    params: APIt.UpdateSheetInput
  ): Promise<Sheet | null> => {
    const result = (await BaseDao.update(
      mutation,
      params
    )) as APIt.UpdateSheetMutation;
    return (result.updateSheet as Sheet) || null;
  },
  delete: async (
    mutation: string,
    params: APIt.DeleteSheetInput
  ): Promise<Sheet | null> => {
    const result = (await BaseDao.delete(
      mutation,
      params
    )) as APIt.DeleteSheetMutation;
    return (result.deleteSheet as Sheet) || null;
  },
  get: async (
    query: string,
    params: APIt.GetSheetQueryVariables
  ): Promise<Sheet | null> => {
    const result = (await BaseDao.get(query, params)) as APIt.GetSheetQuery;
    return (result.getSheet as Sheet) || null;
  },
  /**
   * @deprecated 検証用のみ
   */
  list: async (
    query: string,
    params: APIt.ListSheetsQueryVariables
  ): Promise<(Sheet | null)[] | null> => {
    const result = (await BaseDao.list(query, params)) as APIt.ListSheetsQuery;
    return (result.listSheets?.items as (Sheet | null)[]) || null;
  },
  listCompany: async (
    query: string,
    params: APIt.ListSheetsCompanyQueryVariables
  ): Promise<(Sheet | null)[] | null> => {
    const result = (await BaseDao.list(
      query,
      params
    )) as APIt.ListSheetsCompanyQuery;
    return (result.listSheetsCompany?.items as (Sheet | null)[]) || null;
  },
  listReviewee: async (
    query: string,
    params: APIt.ListSheetsRevieweeQueryVariables
  ): Promise<(Sheet | null)[] | null> => {
    const result = (await BaseDao.list(
      query,
      params
    )) as APIt.ListSheetsRevieweeQuery;
    return (result.listSheetsReviewee?.items as (Sheet | null)[]) || null;
  },
};

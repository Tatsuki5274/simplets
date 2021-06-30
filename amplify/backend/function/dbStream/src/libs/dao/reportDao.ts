import * as APIt from "../../API";
import { Report } from "../../API";
import { BaseDao } from "./common/baseDao";

export const ReportDao = {
  create: async (
    mutation: string,
    params: APIt.CreateReportInput
  ): Promise<Report | null> => {
    const result = (await BaseDao.create(
      mutation,
      params
    )) as APIt.CreateReportMutation;
    return (result.createReport as Report) || null; // unsafe
  },
  update: async (
    mutation: string,
    params: APIt.UpdateReportInput
  ): Promise<Report | null> => {
    const result = (await BaseDao.update(
      mutation,
      params
    )) as APIt.UpdateReportMutation;
    return (result.updateReport as Report) || null;
  },
  delete: async (
    mutation: string,
    params: APIt.DeleteReportInput
  ): Promise<Report | null> => {
    const result = (await BaseDao.delete(
      mutation,
      params
    )) as APIt.DeleteReportMutation;
    return (result.deleteReport as Report) || null;
  },
  get: async (
    query: string,
    params: APIt.GetReportQueryVariables
  ): Promise<Report | null> => {
    const result = (await BaseDao.get(query, params)) as APIt.GetReportQuery;
    return (result.getReport as Report) || null;
  },
  /**
   * @deprecated 検証用のみ
   */
  list: async (
    query: string,
    params: APIt.ListReportsQueryVariables
  ): Promise<(Report | null)[] | null> => {
    const result = (await BaseDao.list(query, params)) as APIt.ListReportsQuery;
    return result.listReports?.items as (Report | null)[] | null;
  },
  listSub: async (
    query: string,
    params: APIt.ListReportsSubQueryVariables
  ): Promise<(Report | null)[] | null> => {
    const result = (await BaseDao.list(
      query,
      params
    )) as APIt.ListReportsSubQuery;
    return result.listReportsSub?.items as (Report | null)[] | null;
  },
  listCompanyDate: async (
    query: string,
    params: APIt.ListReportsCompanyDateQueryVariables
  ): Promise<(Report | null)[] | null> => {
    const result = (await BaseDao.list(
      query,
      params
    )) as APIt.ListReportsCompanyDateQuery;
    return result.listReportsCompanyDate?.items as (Report | null)[] | null;
  },
  /**
   * @deprecated listSubへの切り替えを推奨
   */
  listReviewee: async (
    query: string,
    params: APIt.ListReportsRevieweeQueryVariables
  ): Promise<(Report | null)[] | null> => {
    const result = (await BaseDao.list(
      query,
      params
    )) as APIt.ListReportsRevieweeQuery;
    return result.listReportsReviewee?.items as (Report | null)[] | null;
  },
};

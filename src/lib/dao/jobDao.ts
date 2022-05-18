import * as APIt from "../../API";
import { Job } from "../../API";
import { BaseDao } from "./common/baseDao";

export const JobDao = {
  create: async (
    mutation: string,
    params: APIt.CreateJobInput
  ): Promise<Job | null> => {
    const result = (await BaseDao.create(
      mutation,
      params
    )) as APIt.CreateJobMutation;
    return result.createJob || null;
  },
  update: async (
    mutation: string,
    params: APIt.UpdateJobInput
  ): Promise<Job | null> => {
    const result = (await BaseDao.update(
      mutation,
      params
    )) as APIt.UpdateJobMutation;
    return result.updateJob || null;
  },
  delete: async (
    mutation: string,
    params: APIt.DeleteJobInput
  ): Promise<Job | null> => {
    const result = (await BaseDao.delete(
      mutation,
      params
    )) as APIt.DeleteJobMutation;
    return result.deleteJob || null;
  },
  /**
   * @param params 指定の会社IDのデータを取得する
   */
  get: async (
    query: string,
    params: APIt.GetJobQueryVariables
  ): Promise<Job | null> => {
    const result = (await BaseDao.get(query, params)) as APIt.GetJobQuery;
    return result.getJob || null;
  },
  /**
   * @deprecated 検証用のみ
   * @authority IAM
   */
  list: async (
    query: string,
    params: APIt.ListJobsQueryVariables
  ): Promise<(Job | null)[] | null> => {
    const result = (await BaseDao.list(query, params)) as APIt.ListJobsQuery;
    return result.listJobs?.items || null;
  },
  createByAdmin: async (
    mutation: string
    // params: APIt.UpdateJobInput
  ): Promise<void> => {
    await BaseDao.create(mutation, {});
    // return (result.createJobByAdmin as Job) || null;
  },
};

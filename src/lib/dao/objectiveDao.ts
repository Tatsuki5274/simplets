/* eslint-disable no-console */ //暫定措置
import * as APIt from "API";
import { Objective } from "API";
import { BaseDao } from "./common/baseDao";

export const ObjectiveDao = {
  create: async (
    mutation: string,
    params: APIt.CreateObjectiveInput
  ): Promise<Objective | null> => {
    const result = (await BaseDao.create(
      mutation,
      params
    )) as APIt.CreateObjectiveMutation;
    return result.createObjective || null;
  },
  update: async (
    mutation: string,
    params: APIt.UpdateObjectiveInput
  ): Promise<Objective | null> => {
    const result = (await BaseDao.update(
      mutation,
      params
    )) as APIt.UpdateObjectiveMutation;
    return result.updateObjective || null;
  },
  delete: async (
    mutation: string,
    params: APIt.DeleteObjectiveInput
  ): Promise<Objective | null> => {
    const result = (await BaseDao.delete(
      mutation,
      params
    )) as APIt.DeleteObjectiveMutation;
    return result.deleteObjective || null;
  },
  get: async (
    query: string,
    params: APIt.GetObjectiveQueryVariables
  ): Promise<Objective | null> => {
    const result = (await BaseDao.get(query, params)) as APIt.GetObjectiveQuery;
    return result.getObjective || null;
  },
  /**
   * @deprecated 検証用のみ
   */
  list: async (
    query: string,
    params: APIt.ListObjectivesQueryVariables
  ): Promise<(Objective | null)[] | null> => {
    const result = (await BaseDao.list(
      query,
      params
    )) as APIt.ListObjectivesQuery;
    return result.listObjectives?.items || null;
  },
};

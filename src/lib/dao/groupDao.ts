/* eslint-disable no-console */ //暫定措置
import * as APIt from "API";
import { Group } from "API";
import { BaseDao } from "./common/baseDao";

export const GroupDao = {
  create: async (
    mutation: string,
    params: APIt.CreateGroupInput
  ): Promise<Group | null> => {
    const result = (await BaseDao.create(
      mutation,
      params
    )) as APIt.CreateGroupMutation;
    return result.createGroup || null;
  },
  update: async (
    mutation: string,
    params: APIt.UpdateGroupInput
  ): Promise<Group | null> => {
    const result = (await BaseDao.update(
      mutation,
      params
    )) as APIt.UpdateGroupMutation;
    return result.updateGroup || null;
  },
  delete: async (
    mutation: string,
    params: APIt.DeleteGroupInput
  ): Promise<Group | null> => {
    const result = (await BaseDao.delete(
      mutation,
      params
    )) as APIt.DeleteGroupMutation;
    return result.deleteGroup || null;
  },
  get: async (
    query: string,
    params: APIt.GetGroupQueryVariables
  ): Promise<Group | null> => {
    const result = (await BaseDao.get(query, params)) as APIt.GetGroupQuery;
    return result.getGroup || null;
  },
  /**
   * @deprecated 検証用のみ
   */
  list: async (
    query: string,
    params: APIt.ListGroupsQueryVariables
  ): Promise<(Group | null)[] | null> => {
    const result = (await BaseDao.list(query, params)) as APIt.ListGroupsQuery;
    return result.listGroups?.items || null;
  },
  listCompany: async (
    query: string,
    params: APIt.ListGroupsCompanyQueryVariables
  ): Promise<(Group | null)[] | null> => {
    const result = (await BaseDao.list(
      query,
      params
    )) as APIt.ListGroupsCompanyQuery;
    return result.listGroupsCompany?.items || null;
  },
};

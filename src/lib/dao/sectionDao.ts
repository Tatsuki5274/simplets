/* eslint-disable no-console */ //暫定措置
import * as APIt from "API";
import { Section } from "API";
import { BaseDao } from "./common/baseDao";

export const SectionDao = {
  create: async (
    mutation: string,
    params: APIt.CreateSectionInput
  ): Promise<Section | null> => {
    const result = (await BaseDao.create(
      mutation,
      params
    )) as APIt.CreateSectionMutation;
    return (result.createSection as Section) || null;
  },
  update: async (
    mutation: string,
    params: APIt.UpdateSectionInput
  ): Promise<Section | null> => {
    const result = (await BaseDao.update(
      mutation,
      params
    )) as APIt.UpdateSectionMutation;
    return (result.updateSection as Section) || null;
  },
  delete: async (
    mutation: string,
    params: APIt.DeleteSectionInput
  ): Promise<Section | null> => {
    const result = (await BaseDao.delete(
      mutation,
      params
    )) as APIt.DeleteSectionMutation;
    return (result.deleteSection as Section) || null;
  },
  get: async (
    query: string,
    params: APIt.GetSectionQueryVariables
  ): Promise<Section | null> => {
    const result = (await BaseDao.get(query, params)) as APIt.GetSectionQuery;
    return (result.getSection as Section) || null;
  },
  /**
   * @deprecated 検証用のみ
   */
  list: async (
    query: string,
    params: APIt.ListSectionsQueryVariables
  ): Promise<(Section | null)[] | null> => {
    const result = (await BaseDao.list(
      query,
      params
    )) as APIt.ListSectionsQuery;
    return (result.listSections?.items as (Section | null)[]) || null;
  },
};

import * as APIt from "API";
import { Section } from "API";
import { graphqlMutation, graphqlQuery } from "./common/sdk";

export const SectionDao = {
  create: async (
    mutation: string,
    params: APIt.CreateSectionInput
  ): Promise<Section | null> => {
    try {
      const createI: APIt.CreateSectionInput = params;
      const createMV: APIt.CreateSectionMutationVariables = {
        input: createI,
      };
      const createR = await graphqlMutation<
        APIt.CreateSectionMutationVariables,
        APIt.CreateSectionMutation
      >(mutation, createMV);
      if (createR.data) {
        const createTM: APIt.CreateSectionMutation = createR.data;
        if (createTM.createSection) {
          const section: Section = createTM.createSection as Section; // unsafe
          return section;
        } else console.error("情報の作成に失敗しました");
      } else console.error("情報の作成に失敗しました");
    } catch (e) {
      if (e && e.data && e.data.createSection) {
        console.error("違反があります", e.errors);
        return e.data.createSection as Section;
      } else {
        console.error(e);
      }
    }
    return null;
  },
  update: async (
    mutation: string,
    params: APIt.UpdateSectionInput
  ): Promise<Section | null> => {
    try {
      const updateI: APIt.UpdateSectionInput = params;
      const updateMV: APIt.UpdateSectionMutationVariables = {
        input: updateI,
      };
      const updateR = await graphqlMutation<
        APIt.UpdateSectionMutationVariables,
        APIt.UpdateSectionMutation
      >(mutation, updateMV);
      if (updateR.data) {
        const updateTM: APIt.UpdateSectionMutation = updateR.data;
        if (updateTM.updateSection) {
          const section: Section = updateTM.updateSection as Section; // unsafe
          return section;
        } else console.error("情報の更新に失敗しました");
      } else console.error("情報の更新に失敗しました");
    } catch (e) {
      if (e && e.data && e.data.updateSection) {
        console.error("違反があります", e.errors);
        return e.data.updateSection as Section;
      } else {
        console.error(e);
      }
    }
    return null;
  },
  delete: async (
    mutation: string,
    params: APIt.DeleteSectionInput
  ): Promise<Section | null> => {
    try {
      let deletedSection: Section | null = null;
      const deleteI: APIt.DeleteSectionInput = params;
      const deleteMV: APIt.DeleteSectionMutationVariables = {
        input: deleteI,
      };
      const deleteR = await graphqlMutation<
        APIt.DeleteSectionMutationVariables,
        APIt.DeleteSectionMutation
      >(mutation, deleteMV);
      if (deleteR.data) {
        const deleteTM: APIt.DeleteSectionMutation = deleteR.data;
        if (deleteTM.deleteSection) {
          deletedSection = deleteTM.deleteSection as Section; // unsafe
          return deletedSection;
        } else console.error("情報の削除に失敗しました");
      } else console.error("情報の削除に失敗しました");
    } catch (e) {
      if (e && e.data && e.data.deleteSection) {
        console.error("違反があります", e.errors);
        return e.data.deleteSection as Section;
      } else {
        console.error(e);
      }
    }
    return null;
  },
  get: async (
    query: string,
    params: APIt.GetSectionQueryVariables
  ): Promise<Section | null> => {
    try {
      const getQV: APIt.GetSectionQueryVariables = params;
      const getGQL = await await graphqlQuery<
        APIt.GetSectionQueryVariables,
        APIt.GetSectionQuery
      >(query, getQV);
      if (getGQL.data) {
        const getQ: APIt.GetSectionQuery = getGQL.data;
        if (getQ.getSection) {
          const gotSection: Section = getQ.getSection as Section; // unsafe
          return gotSection;
        } else console.error("情報の取得に失敗しました");
      } else console.error("情報の取得に失敗しました");
    } catch (e) {
      if (e && e.data && e.data.getSection) {
        console.error("違反があります", e.errors);
        return e.data.getSection as Section;
      } else {
        console.error(e);
      }
    }
    return null;
  },

  listSheet: async (
    query: string,
    params: APIt.ListSectionsSheetQueryVariables
  ): Promise<Section[] | null> => {
    try {
      const listQV: APIt.ListSectionsSheetQueryVariables = params;
      const listGQL = await graphqlQuery<
        APIt.ListSectionsSheetQueryVariables,
        APIt.ListSectionsSheetQuery
      >(query, listQV);
      if (listGQL.data) {
        const listQ: APIt.ListSectionsSheetQuery = listGQL.data;
        if (listQ.listSectionsSheet && listQ.listSectionsSheet.items) {
          const gotSections = listQ.listSectionsSheet.items as Section[];
          return gotSections;
        } else console.error("情報の取得に失敗しました");
      } else console.error("情報の取得に失敗しました");
    } catch (e) {
      if (e && e.data && e.data.listSectionsSheet) {
        console.error("違反があります", e.errors);
        return e.data.listSectionsSheet.items as Section[];
      } else {
        console.error(e);
      }
    }
    return null;
  },
};

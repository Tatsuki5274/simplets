/* eslint-disable no-console */
import { graphqlMutation, graphqlQuery } from "../../dependent/client";

export const BaseDao = {
  create: async (
    mutation: string,
    params: unknown
  ): Promise<unknown | null> => {
    try {
      const createMV = {
        input: params,
      };
      const createR = await graphqlMutation(mutation, createMV);
      if (!createR.data) {
        throw new Error("データを追加できませんでした");
      }
      const createTM = createR.data;
      return createTM;
    } catch (e) {
      console.error("baseDao", e);
      return null;
      // if (e && e.data && e.data.createCategory) {
      //   console.error("違反があります", e.errors);
      //   return e.data.createCategory as Category;
      // } else {
      //   console.error(e);
      // }
    }
  },
  update: async (
    mutation: string,
    params: unknown
  ): Promise<unknown | null> => {
    try {
      const updateMV = {
        input: params,
      };
      const updateR = await graphqlMutation(mutation, updateMV);
      if (!updateR.data) {
        throw new Error("データを更新できませんでした");
      }

      const updateTM = updateR.data;
      return updateTM;
    } catch (e) {
      console.error("baseDao", e);
      return null;
      // if (e && e.data && e.data.updateCategory) {
      //   console.error("違反があります", e.errors);
      //   return e.data.updateCategory as Category;
      // } else {
      //   console.error(e);
      // }
    }
  },
  delete: async (
    mutation: string,
    params: unknown
  ): Promise<unknown | null> => {
    try {
      const deleteMV = {
        input: params,
      };
      const deleteR = await graphqlMutation(mutation, deleteMV);
      if (!deleteR.data) {
        throw new Error("データを削除できませんでした");
      }

      const deleteTM = deleteR.data;
      return deleteTM;
    } catch (e) {
      console.error("baseDao", e);
      return null;
      // if (e && e.data && e.data.deleteCategory) {
      //   console.error("違反があります", e.errors);
      //   return e.data.deleteCategory as Category;
      // } else {
      //   console.error(e);
      // }
    }
  },
  get: async (query: string, params: unknown): Promise<unknown | null> => {
    try {
      const getGQL = await await graphqlQuery(query, params);
      if (!getGQL.data) {
        throw new Error("データを更新できませんでした");
      }

      const getQ = getGQL.data;
      return getQ;
    } catch (e) {
      console.error("baseDao", e);
      return null;
      // if (e && e.data && e.data.getCategory) {
      //   console.error("違反があります", e.errors);
      //   return e.data.getCategory as Category;
      // } else {
      //   console.error(e);
      // }
    }
  },

  list: async (query: string, params: unknown): Promise<unknown | null> => {
    try {
      const listGQL = await graphqlQuery(query, params);
      if (!listGQL.data) {
        throw new Error("データを更新できませんでした");
      }

      const listQ = listGQL.data;
      return listQ;
    } catch (e) {
      console.error("baseDao", e);
      return null;
      // if (e && e.data && e.data.listCategorysCompany) {
      //   console.error("違反があります", e.errors);
      //   return e.data.listCategorysCompany.items as Category[];
      // } else {
      //   console.error(e);
      // }
    }
  },
};

import * as APIt from 'API';
import { Category } from 'API';
import { graphqlMutation, graphqlQuery } from "./common/sdk";

export const CategoryDao = {
  create: async (mutation: string, params: APIt.CreateCategoryInput): Promise<Category | null> => {
    try {
      const createI: APIt.CreateCategoryInput = params
      const createMV: APIt.CreateCategoryMutationVariables = {
        input: createI,
      };
      const createR = await graphqlMutation
        <APIt.CreateCategoryMutationVariables, APIt.CreateCategoryMutation>
        (mutation, createMV)
      if (createR.data) {
        const createTM: APIt.CreateCategoryMutation = createR.data
        if (createTM.createCategory) {
          const category: Category = createTM.createCategory
          return category
        } else console.error("情報の作成に失敗しました")
      } else console.error("情報の作成に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.createCategory) {
        console.error("違反があります", e.errors)
        return e.data.createCategory as Category
      } else {
        console.error(e)
      }
    }
    return null
  },
  update: async (mutation: string, params: APIt.UpdateCategoryInput): Promise<Category | null> => {
    try {
      const updateI: APIt.UpdateCategoryInput = params
      const updateMV: APIt.UpdateCategoryMutationVariables = {
        input: updateI,
      };
      const updateR = await graphqlMutation
        <APIt.UpdateCategoryMutationVariables, APIt.UpdateCategoryMutation>
        (mutation, updateMV)
      if (updateR.data) {
        const updateTM: APIt.UpdateCategoryMutation = updateR.data
        if (updateTM.updateCategory) {
          const category: Category = updateTM.updateCategory
          return category
        } else console.error("情報の更新に失敗しました")
      } else console.error("情報の更新に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.updateCategory) {
        console.error("違反があります", e.errors)
        return e.data.updateCategory as Category
      } else {
        console.error(e)
      }
    }
    return null
  },
  delete: async (mutation: string, params: APIt.DeleteCategoryInput): Promise<Category | null> => {
    try {
      let deletedCategory: Category | null = null
      const deleteI: APIt.DeleteCategoryInput = params
      const deleteMV: APIt.DeleteCategoryMutationVariables = {
        input: deleteI,
      };
      const deleteR = await graphqlMutation
        <APIt.DeleteCategoryMutationVariables, APIt.DeleteCategoryMutation>
        (mutation, deleteMV)
      if (deleteR.data) {
        const deleteTM: APIt.DeleteCategoryMutation = deleteR.data
        if (deleteTM.deleteCategory) {
          deletedCategory = deleteTM.deleteCategory
          return deletedCategory
        } else console.error("情報の削除に失敗しました")
      } else console.error("情報の削除に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.deleteCategory) {
        console.error("違反があります", e.errors)
        return e.data.deleteCategory as Category
      } else {
        console.error(e)
      }
    }
    return null
  },
  get: async (query: string, params: APIt.GetCategoryQueryVariables): Promise<Category | null> => {
    try {
      const getQV: APIt.GetCategoryQueryVariables = params
      const getGQL = await await graphqlQuery
        <APIt.GetCategoryQueryVariables, APIt.GetCategoryQuery>
        (query, getQV)
      if (getGQL.data) {
        const getQ: APIt.GetCategoryQuery = getGQL.data
        if (getQ.getCategory) {
          const gotCategory: Category = getQ.getCategory
          return gotCategory
        } else console.error("情報の取得に失敗しました")
      } else console.error("情報の取得に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.getCategory) {
        console.error("違反があります", e.errors)
        return e.data.getCategory as Category
      } else {
        console.error(e)
      }
    }
    return null
  },

  list: async (query: string, params: APIt.ListCategorysQueryVariables): Promise<Category[] | null> => {
    try {
      const listQV: APIt.ListCategorysQueryVariables = params
      const listGQL = await graphqlQuery
        <APIt.ListCategorysQueryVariables, APIt.ListCategorysQuery>
        (query, listQV)
      if (listGQL.data) {
        const listQ: APIt.ListCategorysQuery = listGQL.data;
        if (listQ.listCategorys && listQ.listCategorys.items) {
          const gotCategorys = listQ.listCategorys.items as Category[]
          return gotCategorys
        } else console.error("情報の取得に失敗しました")
      } else console.error("情報の取得に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.listCategorys) {
        console.error("違反があります", e.errors)
        return e.data.listCategorys.items as Category[]
      } else {
        console.error(e)
      }
    }
    return null
  },
}
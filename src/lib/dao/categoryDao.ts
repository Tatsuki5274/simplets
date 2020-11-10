import { Category } from "App";
import * as APIt from 'API';
import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";

export const CategoryDao = {
    create: async(mutation: string ,params: APIt.CreateCategoryInput): Promise<Category | null> => {
      try{
        let id: string = ''
        const createI: APIt.CreateCategoryInput = params
        const createMV: APIt.CreateCategoryMutationVariables = {
          input: createI,
        };
        const createR: GraphQLResult<APIt.CreateCategoryMutation> = 
          await API.graphql(graphqlOperation(mutation, createMV)) as GraphQLResult<APIt.CreateCategoryMutation>;
        if (createR.data) {
          const createTM: APIt.CreateCategoryMutation = createR.data
          if (createTM.createCategory) {
            const category: Category = createTM.createCategory
            return category
          }else console.error("情報の作成に失敗しました")
        }else console.error("情報の作成に失敗しました")
      }catch(e){
        console.error(e)
      }
      return null
    },
    update: async(mutation: string, params: APIt.UpdateCategoryInput): Promise<Category | null> => {
      try{
        const updateI: APIt.UpdateCategoryInput = params
        const updateMV: APIt.UpdateCategoryMutationVariables = {
            input: updateI,
        };
        const updateR: GraphQLResult<APIt.UpdateCategoryMutation> = 
          await API.graphql(graphqlOperation(mutation, updateMV)) as GraphQLResult<APIt.UpdateCategoryMutation>;
        if (updateR.data) {
          const updateTM: APIt.UpdateCategoryMutation = updateR.data
          if (updateTM.updateCategory) {
            const category: Category = updateTM.updateCategory
            return category
          }else console.error("情報の更新に失敗しました")
        }else console.error("情報の更新に失敗しました")
      }catch(e){
        console.error(e)
      }
      return null
    },
    delete: async(mutation: string, params: APIt.UpdateCategoryInput): Promise<Category | null> => {
      try{
        let deletedCategory: Category | null = null
        const deleteI: APIt.DeleteCategoryInput = params
        const deleteMV: APIt.DeleteCategoryMutationVariables = {
          input: deleteI,
        };
        const deleteR: GraphQLResult<APIt.DeleteCategoryMutation> = 
          await API.graphql(graphqlOperation(mutation, deleteMV)) as GraphQLResult<APIt.DeleteCategoryMutation>;
        if (deleteR.data) {
          const deleteTM: APIt.DeleteCategoryMutation = deleteR.data
          if (deleteTM.deleteCategory) {
            deletedCategory = deleteTM.deleteCategory
            return deletedCategory
          }else console.error("情報の削除に失敗しました")
        }else console.error("情報の削除に失敗しました")
      }catch(e){
        console.error(e)
      }
      return null
    },
    get: async(query: string, params: APIt.GetCategoryQueryVariables): Promise<Category | null> => {
      try{
        const getQV: APIt.GetCategoryQueryVariables = params
        const getGQL: GraphQLResult<APIt.GetCategoryQuery> = 
          await API.graphql(graphqlOperation(query, getQV)) as GraphQLResult<APIt.GetCategoryQuery>;
        if (getGQL.data) {
          const getQ: APIt.GetCategoryQuery = getGQL.data
          if (getQ.getCategory) {
            const gotCategory: Category = getQ.getCategory
            return gotCategory
          }else console.error("情報の取得に失敗しました")
        }else console.error("情報の取得に失敗しました")
      }catch(e){
        console.error(e)
      }
      return null
    },

    list: async(query: string, params: APIt.ListCategorysQueryVariables): Promise<Category[] | null> => {
      try{
        const listQV: APIt.ListCategorysQueryVariables = params
        const listGQL: GraphQLResult<APIt.ListCategorysQuery> = 
          await API.graphql(graphqlOperation(query, listQV)) as GraphQLResult<APIt.ListCategorysQuery>;
        if (listGQL.data) {
          const listQ: APIt.ListCategorysQuery = listGQL.data;
          if (listQ.listCategorys && listQ.listCategorys.items) {
            const gotCategorys = listQ.listCategorys.items as Category[]
            return gotCategorys
          }else console.error("情報の取得に失敗しました")
        }else console.error("情報の取得に失敗しました")
      }catch(e){
        console.error(e)
      }
      return null
    },
}
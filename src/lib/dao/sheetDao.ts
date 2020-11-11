import { Sheet } from "App";
import * as APIt from 'API';
import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";

export const SheetDao = {
    create: async(mutation: string ,params: APIt.CreateSheetInput): Promise<Sheet | null> => {
      try{
        const createI: APIt.CreateSheetInput = params
        const createMV: APIt.CreateSheetMutationVariables = {
          input: createI,
        };
        const createR: GraphQLResult<APIt.CreateSheetMutation> = 
          await API.graphql(graphqlOperation(mutation, createMV)) as GraphQLResult<APIt.CreateSheetMutation>;
        if (createR.data) {
          const createTM: APIt.CreateSheetMutation = createR.data
          if (createTM.createSheet) {
            const sheet: Sheet = createTM.createSheet
            return sheet
          }else console.error("情報の作成に失敗しました")
        }else console.error("情報の作成に失敗しました")
      }catch(e){
        if(e && e.data && e.data.createSheet){
          console.error("違反があります", e.errors)
          return e.data.createSheet as Sheet
        }else{
          console.error(e)
        }      }
      return null
    },
    update: async(mutation: string, params: APIt.UpdateSheetInput): Promise<Sheet | null> => {
      try{
        const updateI: APIt.UpdateSheetInput = params
        const updateMV: APIt.UpdateSheetMutationVariables = {
            input: updateI,
        };
        const updateR: GraphQLResult<APIt.UpdateSheetMutation> = 
          await API.graphql(graphqlOperation(mutation, updateMV)) as GraphQLResult<APIt.UpdateSheetMutation>;
        if (updateR.data) {
          const updateTM: APIt.UpdateSheetMutation = updateR.data
          if (updateTM.updateSheet) {
            const sheet: Sheet = updateTM.updateSheet
            return sheet
          }else console.error("情報の更新に失敗しました")
        }else console.error("情報の更新に失敗しました")
      }catch(e){
        if(e && e.data && e.data.updateSheet){
          console.error("違反があります", e.errors)
          return e.data.updateSheet as Sheet
        }else{
          console.error(e)
        }
      }
      return null
    },
    delete: async(mutation: string, params: APIt.UpdateSheetInput): Promise<Sheet | null> => {
      try{
        let deletedSheet: Sheet | null = null
        const deleteI: APIt.DeleteSheetInput = params
        const deleteMV: APIt.DeleteSheetMutationVariables = {
          input: deleteI,
        };
        const deleteR: GraphQLResult<APIt.DeleteSheetMutation> = 
          await API.graphql(graphqlOperation(mutation, deleteMV)) as GraphQLResult<APIt.DeleteSheetMutation>;
        if (deleteR.data) {
          const deleteTM: APIt.DeleteSheetMutation = deleteR.data
          if (deleteTM.deleteSheet) {
            deletedSheet = deleteTM.deleteSheet
            return deletedSheet
          }else console.error("情報の削除に失敗しました")
        }else console.error("情報の削除に失敗しました")
      }catch(e){
        if(e && e.data && e.data.deleteSheet){
          console.error("違反があります", e.errors)
          return e.data.deleteSheet as Sheet
        }else{
          console.error(e)
        }
      }
      return null
    },
    get: async(query: string, params: APIt.GetSheetQueryVariables): Promise<Sheet | null> => {
      try{
        const getQV: APIt.GetSheetQueryVariables = params
        const getGQL: GraphQLResult<APIt.GetSheetQuery> = 
          await API.graphql(graphqlOperation(query, getQV)) as GraphQLResult<APIt.GetSheetQuery>;
        if (getGQL.data) {
          const getQ: APIt.GetSheetQuery = getGQL.data
          if (getQ.getSheet) {
            const gotSheet: Sheet = getQ.getSheet
            return gotSheet
          }else console.error("情報の取得に失敗しました")
        }else console.error("情報の取得に失敗しました")
      }catch(e){
        if(e && e.data && e.data.getSheet){
          console.error("違反があります", e.errors)
          return e.data.getSheet as Sheet
        }else{
          console.error(e)
        }
      }
      return null
    },

    list: async(query: string, params: APIt.ListSheetsQueryVariables): Promise<Sheet[] | null> => {
        try{
            const listQV: APIt.ListSheetsQueryVariables = params
            const listGQL: GraphQLResult<APIt.ListSheetsQuery> = 
            await API.graphql(graphqlOperation(query, listQV)) as GraphQLResult<APIt.ListSheetsQuery>;
            if (listGQL.data) {
              const listQ: APIt.ListSheetsQuery = listGQL.data;
              if (listQ.listSheets && listQ.listSheets.items) {
                  const gotSheets = listQ.listSheets.items as Sheet[]
                  return gotSheets
              }else console.error("情報の取得に失敗しました")
            }else console.error("情報の取得に失敗しました")
        }catch(e){
            if(e && e.data && e.data.listSheets){
                console.error("違反があります", e.errors)
                return e.data.listSheets.items as Sheet[]
            }else{
                console.error(e)
            }
        }
        return null
    },
}
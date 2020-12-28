import { Sheet } from "App";
import * as APIt from 'API';
import gql from 'graphql-tag';
import { ApolloQueryResult } from "@apollo/client";
import { client } from "./common";

export const SheetDao = {
  create: async (mutation: string, params: APIt.CreateSheetInput): Promise<Sheet | null> => {
    try {
      const createI: APIt.CreateSheetInput = params
      const createMV: APIt.CreateSheetMutationVariables = {
        input: createI,
      };
      const createR = await client.mutate({
        mutation: gql(mutation),
        variables: createMV,
        fetchPolicy: 'no-cache',
      }) as ApolloQueryResult<APIt.CreateSheetMutation>;
      if (createR.data) {
        const createTM: APIt.CreateSheetMutation = createR.data
        if (createTM.createSheet) {
          const sheet: Sheet = createTM.createSheet
          return sheet
        } else console.error("情報の作成に失敗しました")
      } else console.error("情報の作成に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.createSheet) {
        console.error("違反があります", e.errors)
        return e.data.createSheet as Sheet
      } else {
        console.error(e)
      }
    }
    return null
  },
  update: async (mutation: string, params: APIt.UpdateSheetInput): Promise<Sheet | null> => {
    try {
      const updateI: APIt.UpdateSheetInput = params
      const updateMV: APIt.UpdateSheetMutationVariables = {
        input: updateI,
      };
      const updateR = await client.mutate({
        mutation: gql(mutation),
        variables: updateMV,
        fetchPolicy: 'no-cache',
      }) as ApolloQueryResult<APIt.UpdateSheetMutation>;
      if (updateR.data) {
        const updateTM: APIt.UpdateSheetMutation = updateR.data
        if (updateTM.updateSheet) {
          const sheet: Sheet = updateTM.updateSheet
          return sheet
        } else console.error("情報の更新に失敗しました")
      } else console.error("情報の更新に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.updateSheet) {
        console.error("違反があります", e.errors)
        return e.data.updateSheet as Sheet
      } else {
        console.error(e)
      }
    }
    return null
  },
  delete: async (mutation: string, params: APIt.DeleteSheetInput): Promise<Sheet | null> => {
    try {
      let deletedSheet: Sheet | null = null
      const deleteI: APIt.DeleteSheetInput = params
      const deleteMV: APIt.DeleteSheetMutationVariables = {
        input: deleteI,
      };
      const deleteR = await client.mutate({
        mutation: gql(mutation),
        variables: deleteMV,
        fetchPolicy: 'no-cache',
      }) as ApolloQueryResult<APIt.DeleteSheetMutation>;
      if (deleteR.data) {
        const deleteTM: APIt.DeleteSheetMutation = deleteR.data
        if (deleteTM.deleteSheet) {
          deletedSheet = deleteTM.deleteSheet
          return deletedSheet
        } else console.error("情報の削除に失敗しました")
      } else console.error("情報の削除に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.deleteSheet) {
        console.error("違反があります", e.errors)
        return e.data.deleteSheet as Sheet
      } else {
        console.error(e)
      }
    }
    return null
  },
  get: async (query: string, params: APIt.GetSheetQueryVariables): Promise<Sheet | null> => {
    try {
      const getQV: APIt.GetSheetQueryVariables = params
      const getGQL= await client.query({
        query: gql(query),
        variables: getQV,
        fetchPolicy: 'network-only',
      }) as ApolloQueryResult<APIt.GetSheetQuery>;
      if (getGQL.data) {
        const getQ: APIt.GetSheetQuery = getGQL.data
        if (getQ.getSheet) {
          const gotSheet: Sheet = getQ.getSheet
          return gotSheet
        } else console.error("情報の取得に失敗しました")
      } else console.error("情報の取得に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.getSheet) {
        console.error("違反があります", e.errors)
        return e.data.getSheet as Sheet
      } else {
        console.error(e)
      }
    }
    return null
  },

  list: async (query: string, params: APIt.ListSheetsQueryVariables): Promise<Sheet[] | null> => {
    try {
      const listQV: APIt.ListSheetsQueryVariables = params
      const listGQL = await client.query({
        query: gql(query),
        variables: listQV,
        fetchPolicy: 'network-only',
      }) as ApolloQueryResult<APIt.ListSheetsQuery>;
      if (listGQL.data) {
        const listQ: APIt.ListSheetsQuery = listGQL.data;
        if (listQ.listSheets && listQ.listSheets.items) {
          const gotSheets = listQ.listSheets.items as Sheet[]
          return gotSheets
        } else console.error("情報の取得に失敗しました")
      } else console.error("情報の取得に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.listSheets) {
        console.error("違反があります", e.errors)
        return e.data.listSheets.items as Sheet[]
      } else {
        console.error(e)
      }
    }
    return null
  },
}
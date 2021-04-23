import * as APIt from 'API';
import { Sheet } from 'API';
import { graphqlMutation, graphqlQuery } from "./common/sdk";

export const SheetDao = {
  create: async (mutation: string, params: APIt.CreateSheetInput): Promise<Sheet | null> => {
    try {
      const createI: APIt.CreateSheetInput = params
      const createMV: APIt.CreateSheetMutationVariables = {
        input: createI,
      };
      const createR = await graphqlMutation
        <APIt.CreateSheetMutationVariables, APIt.CreateSheetMutation>
        (mutation, createMV)
      if (createR.data) {
        const createTM: APIt.CreateSheetMutation = createR.data
        if (createTM.createSheet) {
          const sheet: Sheet = createTM.createSheet as Sheet // unsafe
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
      const updateR = await graphqlMutation
        <APIt.UpdateSheetMutationVariables, APIt.UpdateSheetMutation>
        (mutation, updateMV)
      if (updateR.data) {
        const updateTM: APIt.UpdateSheetMutation = updateR.data
        if (updateTM.updateSheet) {
          const sheet: Sheet = updateTM.updateSheet as Sheet // unsafe
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
      const deleteR = await graphqlMutation
        <APIt.DeleteSheetMutationVariables, APIt.DeleteSheetMutation>
        (mutation, deleteMV)
      if (deleteR.data) {
        const deleteTM: APIt.DeleteSheetMutation = deleteR.data
        if (deleteTM.deleteSheet) {
          deletedSheet = deleteTM.deleteSheet as Sheet // unsafe
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
      const getGQL = await await graphqlQuery
        <APIt.GetSheetQueryVariables, APIt.GetSheetQuery>
        (query, getQV)
      if (getGQL.data) {
        const getQ: APIt.GetSheetQuery = getGQL.data
        if (getQ.getSheet) {
          const gotSheet: Sheet = getQ.getSheet as Sheet // unsafe
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

  listCompany: async (query: string, params: APIt.ListSheetsCompanyQueryVariables): Promise<Sheet[] | null> => {
    try {
      const listQV: APIt.ListSheetsCompanyQueryVariables = params
      const listGQL = await graphqlQuery
        <APIt.ListSheetsCompanyQueryVariables, APIt.ListSheetsCompanyQuery>
        (query, listQV)
      if (listGQL.data) {
        const listQ: APIt.ListSheetsCompanyQuery = listGQL.data;
        if (listQ.listSheetsCompany && listQ.listSheetsCompany.items) {
          const gotSheets = listQ.listSheetsCompany.items as Sheet[]
          return gotSheets
        } else console.error("情報の取得に失敗しました")
      } else console.error("情報の取得に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.listSheetsCompany) {
        console.error("違反があります", e.errors)
        return e.data.listSheetsCompany.items as Sheet[]
      } else {
        console.error(e)
      }
    }
    return null
  },

  listReviewee: async (query: string, params: APIt.ListSheetsRevieweeQueryVariables): Promise<Sheet[] | null> => {
    try {
      const listRevieweeQV: APIt.ListSheetsRevieweeQueryVariables = params
      const listRevieweeGQL = await graphqlQuery
        <APIt.ListSheetsRevieweeQueryVariables, APIt.ListSheetsRevieweeQuery>
        (query, listRevieweeQV)
      if (listRevieweeGQL.data) {
        const listRevieweeQ: APIt.ListSheetsRevieweeQuery = listRevieweeGQL.data;
        if (listRevieweeQ.listSheetsReviewee && listRevieweeQ.listSheetsReviewee.items) {
          const gotSheets = listRevieweeQ.listSheetsReviewee.items as Sheet[]
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
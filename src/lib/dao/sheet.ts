import { Sheet } from "App";
import * as APIt from 'API';
import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { createSheet, deleteSheet, updateSheet } from "graphql/mutations";

export const SheetDao = {
    async create(mutation: string ,params: APIt.CreateSheetInput){
        let id: string = ''
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
            return sheet;
          }
        }
        return null;
    },
    async update(mutation: string, params: APIt.UpdateSheetInput){
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
            }
        }   
      return null;
    },
    async delete(mutation: string, params: APIt.UpdateSheetInput){
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
        }
      }
      return deletedSheet
    },
    async get(query: string, params: APIt.GetSheetQueryVariables){
      const getQV: APIt.GetSheetQueryVariables = params
      const getGQL: GraphQLResult<APIt.GetSheetQuery> = 
        await API.graphql(graphqlOperation(query, getQV)) as GraphQLResult<APIt.GetSheetQuery>;
      if (getGQL.data) {
        const getQ: APIt.GetSheetQuery = getGQL.data
        if (getQ.getSheet) {
          const gotSheet: Sheet = getQ.getSheet
          return gotSheet
        }
      }
      return null;
    },
    async list(query: string, params: APIt.ListSheetsQueryVariables){
      const listQV: APIt.ListSheetsQueryVariables = params
      const listGQL: GraphQLResult<APIt.ListSheetsQuery> = 
        await API.graphql(graphqlOperation(query, listQV)) as GraphQLResult<APIt.ListSheetsQuery>;
      if (listGQL.data) {
        const listQ: APIt.ListSheetsQuery = listGQL.data;
        if (listQ.listSheets && listQ.listSheets.items) {
          const gotSheets = listQ.listSheets.items as Sheet[]
          return gotSheets
        }
      }
      return null
    }
    
}
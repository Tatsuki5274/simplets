import { Sheet } from "App";
import { daoInterface } from "./interface";
import * as APIt from 'API';
import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { createSheet, updateSheet } from "graphql/mutations";

export class SheetDao implements daoInterface<Sheet>{
    async create(params: Sheet){
        let id: string = '';
        const createI: APIt.CreateSheetInput = params;
        const createMV: APIt.CreateSheetMutationVariables = {
          input: createI,
        };
        const createR: GraphQLResult<APIt.CreateSheetMutation> = 
          await API.graphql(graphqlOperation(createSheet, createMV)) as GraphQLResult<APIt.CreateSheetMutation>;
        if (createR.data) {
          const createTM: APIt.CreateSheetMutation = createR.data;
          if (createTM.createSheet) {
            const sheet: Sheet = createTM.createSheet;
            return sheet;
          }
        }
        return null;
    }
    async update(params: Sheet){
        const updateI: APIt.UpdateSheetInput = params;
        const updateMV: APIt.UpdateSheetMutationVariables = {
            input: updateI,
        };
        const updateR: GraphQLResult<APIt.UpdateSheetMutation> = 
        await API.graphql(graphqlOperation(updateSheet, updateMV)) as GraphQLResult<APIt.UpdateSheetMutation>;
        if (updateR.data) {
            const updateTM: APIt.UpdateSheetMutation = updateR.data;
            if (updateTM.updateSheet) {
            const sheet: Sheet = updateTM.updateSheet;
            return sheet;
            }
        }   
      return null;
    }
    async delete(id: string){
        return id;
    }
    async get(id: string){
        return "" as unknown as Sheet
    }
    
}
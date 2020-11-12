import { Section } from "App";
import * as APIt from 'API';
import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";

export const SectionDao = {
    create: async(mutation: string ,params: APIt.CreateSectionInput): Promise<Section | null> => {
      try{
        const createI: APIt.CreateSectionInput = params
        const createMV: APIt.CreateSectionMutationVariables = {
          input: createI,
        };
        const createR: GraphQLResult<APIt.CreateSectionMutation> = 
          await API.graphql(graphqlOperation(mutation, createMV)) as GraphQLResult<APIt.CreateSectionMutation>;
        if (createR.data) {
          const createTM: APIt.CreateSectionMutation = createR.data
          if (createTM.createSection) {
            const section: Section = createTM.createSection
            return section
          }else console.error("情報の作成に失敗しました")
        }else console.error("情報の作成に失敗しました")
      }catch(e){
        if(e && e.data && e.data.createSection){
          console.error("違反があります", e.errors)
          return e.data.createSection as Section
        }else{
          console.error(e)
        }      }
      return null
    },
    update: async(mutation: string, params: APIt.UpdateSectionInput): Promise<Section | null> => {
      try{
        const updateI: APIt.UpdateSectionInput = params
        const updateMV: APIt.UpdateSectionMutationVariables = {
            input: updateI,
        };
        const updateR: GraphQLResult<APIt.UpdateSectionMutation> = 
          await API.graphql(graphqlOperation(mutation, updateMV)) as GraphQLResult<APIt.UpdateSectionMutation>;
        if (updateR.data) {
          const updateTM: APIt.UpdateSectionMutation = updateR.data
          if (updateTM.updateSection) {
            const section: Section = updateTM.updateSection
            return section
          }else console.error("情報の更新に失敗しました")
        }else console.error("情報の更新に失敗しました")
      }catch(e){
        if(e && e.data && e.data.updateSection){
          console.error("違反があります", e.errors)
          return e.data.updateSection as Section
        }else{
          console.error(e)
        }
      }
      return null
    },
    delete: async(mutation: string, params: APIt.UpdateSectionInput): Promise<Section | null> => {
      try{
        let deletedSection: Section | null = null
        const deleteI: APIt.DeleteSectionInput = params
        const deleteMV: APIt.DeleteSectionMutationVariables = {
          input: deleteI,
        };
        const deleteR: GraphQLResult<APIt.DeleteSectionMutation> = 
          await API.graphql(graphqlOperation(mutation, deleteMV)) as GraphQLResult<APIt.DeleteSectionMutation>;
        if (deleteR.data) {
          const deleteTM: APIt.DeleteSectionMutation = deleteR.data
          if (deleteTM.deleteSection) {
            deletedSection = deleteTM.deleteSection
            return deletedSection
          }else console.error("情報の削除に失敗しました")
        }else console.error("情報の削除に失敗しました")
      }catch(e){
        if(e && e.data && e.data.deleteSection){
          console.error("違反があります", e.errors)
          return e.data.deleteSection as Section
        }else{
          console.error(e)
        }
      }
      return null
    },
    get: async(query: string, params: APIt.GetSectionQueryVariables): Promise<Section | null> => {
      try{
        const getQV: APIt.GetSectionQueryVariables = params
        const getGQL: GraphQLResult<APIt.GetSectionQuery> = 
          await API.graphql(graphqlOperation(query, getQV)) as GraphQLResult<APIt.GetSectionQuery>;
        if (getGQL.data) {
          const getQ: APIt.GetSectionQuery = getGQL.data
          if (getQ.getSection) {
            const gotSection: Section = getQ.getSection
            return gotSection
          }else console.error("情報の取得に失敗しました")
        }else console.error("情報の取得に失敗しました")
      }catch(e){
        if(e && e.data && e.data.getSection){
          console.error("違反があります", e.errors)
          return e.data.getSection as Section
        }else{
          console.error(e)
        }
      }
      return null
    },

    list: async(query: string, params: APIt.ListSectionsQueryVariables): Promise<Section[] | null> => {
        try{
            const listQV: APIt.ListSectionsQueryVariables = params
            const listGQL: GraphQLResult<APIt.ListSectionsQuery> = 
            await API.graphql(graphqlOperation(query, listQV)) as GraphQLResult<APIt.ListSectionsQuery>;
            if (listGQL.data) {
              const listQ: APIt.ListSectionsQuery = listGQL.data;
              if (listQ.listSections && listQ.listSections.items) {
                  const gotSections = listQ.listSections.items as Section[]
                  return gotSections
              }else console.error("情報の取得に失敗しました")
            }else console.error("情報の取得に失敗しました")
        }catch(e){
            if(e && e.data && e.data.listSections){
                console.error("違反があります", e.errors)
                return e.data.listSections.items as Section[]
            }else{
                console.error(e)
            }
        }
        return null
    },
}
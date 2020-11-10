import { Objective } from "App";
import * as APIt from 'API';
import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";

export const ObjectiveDao = {
    create: async(mutation: string ,params: APIt.CreateObjectiveInput): Promise<Objective | null> => {
      try{
        let id: string = ''
        const createI: APIt.CreateObjectiveInput = params
        const createMV: APIt.CreateObjectiveMutationVariables = {
          input: createI,
        };
        const createR: GraphQLResult<APIt.CreateObjectiveMutation> = 
          await API.graphql(graphqlOperation(mutation, createMV)) as GraphQLResult<APIt.CreateObjectiveMutation>;
        if (createR.data) {
          const createTM: APIt.CreateObjectiveMutation = createR.data
          if (createTM.createObjective) {
            const objective: Objective = createTM.createObjective
            return objective
          }else console.error("情報の作成に失敗しました")
        }else console.error("情報の作成に失敗しました")
      }catch(e){
        console.error(e)
      }
      return null
    },
    update: async(mutation: string, params: APIt.UpdateObjectiveInput): Promise<Objective | null> => {
      try{
        const updateI: APIt.UpdateObjectiveInput = params
        const updateMV: APIt.UpdateObjectiveMutationVariables = {
            input: updateI,
        };
        const updateR: GraphQLResult<APIt.UpdateObjectiveMutation> = 
          await API.graphql(graphqlOperation(mutation, updateMV)) as GraphQLResult<APIt.UpdateObjectiveMutation>;
        if (updateR.data) {
          const updateTM: APIt.UpdateObjectiveMutation = updateR.data
          if (updateTM.updateObjective) {
            const objective: Objective = updateTM.updateObjective
            return objective
          }else console.error("情報の更新に失敗しました")
        }else console.error("情報の更新に失敗しました")
      }catch(e){
        console.error(e)
      }
      return null
    },
    delete: async(mutation: string, params: APIt.UpdateObjectiveInput): Promise<Objective | null> => {
      try{
        let deletedObjective: Objective | null = null
        const deleteI: APIt.DeleteObjectiveInput = params
        const deleteMV: APIt.DeleteObjectiveMutationVariables = {
          input: deleteI,
        };
        const deleteR: GraphQLResult<APIt.DeleteObjectiveMutation> = 
          await API.graphql(graphqlOperation(mutation, deleteMV)) as GraphQLResult<APIt.DeleteObjectiveMutation>;
        if (deleteR.data) {
          const deleteTM: APIt.DeleteObjectiveMutation = deleteR.data
          if (deleteTM.deleteObjective) {
            deletedObjective = deleteTM.deleteObjective
            return deletedObjective
          }else console.error("情報の削除に失敗しました")
        }else console.error("情報の削除に失敗しました")
      }catch(e){
        console.error(e)
      }
      return null
    },
    get: async(query: string, params: APIt.GetObjectiveQueryVariables): Promise<Objective | null> => {
      try{
        const getQV: APIt.GetObjectiveQueryVariables = params
        const getGQL: GraphQLResult<APIt.GetObjectiveQuery> = 
          await API.graphql(graphqlOperation(query, getQV)) as GraphQLResult<APIt.GetObjectiveQuery>;
        if (getGQL.data) {
          const getQ: APIt.GetObjectiveQuery = getGQL.data
          if (getQ.getObjective) {
            const gotObjective: Objective = getQ.getObjective
            return gotObjective
          }else console.error("情報の取得に失敗しました")
        }else console.error("情報の取得に失敗しました")
      }catch(e){
        console.error(e)
      }
      return null
    },

    list: async(query: string, params: APIt.ListObjectivesQueryVariables): Promise<Objective[] | null> => {
      try{
        const listQV: APIt.ListObjectivesQueryVariables = params
        const listGQL: GraphQLResult<APIt.ListObjectivesQuery> = 
          await API.graphql(graphqlOperation(query, listQV)) as GraphQLResult<APIt.ListObjectivesQuery>;
        if (listGQL.data) {
          const listQ: APIt.ListObjectivesQuery = listGQL.data;
          if (listQ.listObjectives && listQ.listObjectives.items) {
            const gotObjectives = listQ.listObjectives.items as Objective[]
            return gotObjectives
          }else console.error("情報の取得に失敗しました")
        }else console.error("情報の取得に失敗しました")
      }catch(e){
        console.error(e)
      }
      return null
    },
}
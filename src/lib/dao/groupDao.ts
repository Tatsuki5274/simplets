import { Group } from "App";
import * as APIt from 'API';
import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";

export const GroupDao = {
    create: async(mutation: string ,params: APIt.CreateGroupInput): Promise<Group | null> => {
      try{
        const createI: APIt.CreateGroupInput = params
        const createMV: APIt.CreateGroupMutationVariables = {
          input: createI,
        };
        const createR: GraphQLResult<APIt.CreateGroupMutation> = 
          await API.graphql(graphqlOperation(mutation, createMV)) as GraphQLResult<APIt.CreateGroupMutation>;
        if (createR.data) {
          const createTM: APIt.CreateGroupMutation = createR.data
          if (createTM.createGroup) {
            const group: Group = createTM.createGroup
            return group
          }else console.error("情報の作成に失敗しました")
        }else console.error("情報の作成に失敗しました")
      }catch(e){
        if(e && e.data && e.data.createGroup){
          console.error("違反があります", e.errors)
          return e.data.createGroup as Group
        }else{
          console.error(e)
        }      }
      return null
    },
    update: async(mutation: string, params: APIt.UpdateGroupInput): Promise<Group | null> => {
      try{
        const updateI: APIt.UpdateGroupInput = params
        const updateMV: APIt.UpdateGroupMutationVariables = {
            input: updateI,
        };
        const updateR: GraphQLResult<APIt.UpdateGroupMutation> = 
          await API.graphql(graphqlOperation(mutation, updateMV)) as GraphQLResult<APIt.UpdateGroupMutation>;
        if (updateR.data) {
          const updateTM: APIt.UpdateGroupMutation = updateR.data
          if (updateTM.updateGroup) {
            const group: Group = updateTM.updateGroup
            return group
          }else console.error("情報の更新に失敗しました")
        }else console.error("情報の更新に失敗しました")
      }catch(e){
        if(e && e.data && e.data.updateGroup){
          console.error("違反があります", e.errors)
          return e.data.updateGroup as Group
        }else{
          console.error(e)
        }
      }
      return null
    },
    delete: async(mutation: string, params: APIt.UpdateGroupInput): Promise<Group | null> => {
      try{
        let deletedGroup: Group | null = null
        const deleteI: APIt.DeleteGroupInput = params
        const deleteMV: APIt.DeleteGroupMutationVariables = {
          input: deleteI,
        };
        const deleteR: GraphQLResult<APIt.DeleteGroupMutation> = 
          await API.graphql(graphqlOperation(mutation, deleteMV)) as GraphQLResult<APIt.DeleteGroupMutation>;
        if (deleteR.data) {
          const deleteTM: APIt.DeleteGroupMutation = deleteR.data
          if (deleteTM.deleteGroup) {
            deletedGroup = deleteTM.deleteGroup
            return deletedGroup
          }else console.error("情報の削除に失敗しました")
        }else console.error("情報の削除に失敗しました")
      }catch(e){
        if(e && e.data && e.data.deleteGroup){
          console.error("違反があります", e.errors)
          return e.data.deleteGroup as Group
        }else{
          console.error(e)
        }
      }
      return null
    },
    get: async(query: string, params: APIt.GetGroupQueryVariables): Promise<Group | null> => {
      try{
        const getQV: APIt.GetGroupQueryVariables = params
        const getGQL: GraphQLResult<APIt.GetGroupQuery> = 
          await API.graphql(graphqlOperation(query, getQV)) as GraphQLResult<APIt.GetGroupQuery>;
        if (getGQL.data) {
          const getQ: APIt.GetGroupQuery = getGQL.data
          if (getQ.getGroup) {
            const gotGroup: Group = getQ.getGroup
            return gotGroup
          }else console.error("情報の取得に失敗しました")
        }else console.error("情報の取得に失敗しました")
      }catch(e){
        if(e && e.data && e.data.getGroup){
          console.error("違反があります", e.errors)
          return e.data.getGroup as Group
        }else{
          console.error(e)
        }
      }
      return null
    },

    list: async(query: string, params: APIt.ListGroupsQueryVariables): Promise<Group[] | null> => {
        try{
            const listQV: APIt.ListGroupsQueryVariables = params
            const listGQL: GraphQLResult<APIt.ListGroupsQuery> = 
            await API.graphql(graphqlOperation(query, listQV)) as GraphQLResult<APIt.ListGroupsQuery>;
            if (listGQL.data) {
              const listQ: APIt.ListGroupsQuery = listGQL.data;
              if (listQ.listGroups && listQ.listGroups.items) {
                  const gotGroups = listQ.listGroups.items as Group[]
                  return gotGroups
              }else console.error("情報の取得に失敗しました")
            }else console.error("情報の取得に失敗しました")
        }catch(e){
            if(e && e.data && e.data.listGroups){
                console.error("違反があります", e.errors)
                return e.data.listGroups.items as Group[]
            }else{
                console.error(e)
            }
        }
        return null
    },
}
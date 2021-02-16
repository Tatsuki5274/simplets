import * as APIt from 'API';
import { Objective } from 'API';
import { graphqlMutation, graphqlQuery } from "./common/sdk";

export const ObjectiveDao = {
  create: async (mutation: string, params: APIt.CreateObjectiveInput): Promise<Objective | null> => {
    try {
      const createI: APIt.CreateObjectiveInput = params
      const createMV: APIt.CreateObjectiveMutationVariables = {
        input: createI,
      };
      const createR = await graphqlMutation
        <APIt.CreateObjectiveMutationVariables, APIt.CreateObjectiveMutation>
        (mutation, createMV)
      if (createR.data) {
        const createTM: APIt.CreateObjectiveMutation = createR.data
        if (createTM.createObjective) {
          const objective: Objective = createTM.createObjective
          return objective
        } else console.error("情報の作成に失敗しました")
      } else console.error("情報の作成に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.createObjective) {
        console.error("違反があります", e.errors)
        return e.data.createObjective as Objective
      } else {
        console.error(e)
      }
    }
    return null
  },
  update: async (mutation: string, params: APIt.UpdateObjectiveInput): Promise<Objective | null> => {
    try {
      const updateI: APIt.UpdateObjectiveInput = params
      const updateMV: APIt.UpdateObjectiveMutationVariables = {
        input: updateI,
      };
      const updateR = await graphqlMutation
        <APIt.UpdateObjectiveMutationVariables, APIt.UpdateObjectiveMutation>
        (mutation, updateMV)
      if (updateR.data) {
        const updateTM: APIt.UpdateObjectiveMutation = updateR.data
        if (updateTM.updateObjective) {
          const objective: Objective = updateTM.updateObjective
          return objective
        } else console.error("情報の更新に失敗しました")
      } else console.error("情報の更新に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.updateObjective) {
        console.error("違反があります", e.errors)
        return e.data.updateObjective as Objective
      } else {
        console.error(e)
      }
    }
    return null
  },
  delete: async (mutation: string, params: APIt.DeleteObjectiveInput): Promise<Objective | null> => {
    try {
      let deletedObjective: Objective | null = null
      const deleteI: APIt.DeleteObjectiveInput = params
      const deleteMV: APIt.DeleteObjectiveMutationVariables = {
        input: deleteI,
      };
      const deleteR = await graphqlMutation
        <APIt.DeleteObjectiveMutationVariables, APIt.DeleteObjectiveMutation>
        (mutation, deleteMV)
      if (deleteR.data) {
        const deleteTM: APIt.DeleteObjectiveMutation = deleteR.data
        if (deleteTM.deleteObjective) {
          deletedObjective = deleteTM.deleteObjective
          return deletedObjective
        } else console.error("情報の削除に失敗しました")
      } else console.error("情報の削除に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.deleteObjective) {
        console.error("違反があります", e.errors)
        return e.data.deleteObjective as Objective
      } else {
        console.error(e)
      }
    }
    return null
  },
  get: async (query: string, params: APIt.GetObjectiveQueryVariables): Promise<Objective | null> => {
    try {
      const getQV: APIt.GetObjectiveQueryVariables = params
      const getGQL = await await graphqlQuery
        <APIt.GetObjectiveQueryVariables, APIt.GetObjectiveQuery>
        (query, getQV)
      if (getGQL.data) {
        const getQ: APIt.GetObjectiveQuery = getGQL.data
        if (getQ.getObjective) {
          const gotObjective: Objective = getQ.getObjective
          return gotObjective
        } else console.error("情報の取得に失敗しました")
      } else console.error("情報の取得に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.getObjective) {
        console.error("違反があります", e.errors)
        return e.data.getObjective as Objective
      } else {
        console.error(e)
      }
    }
    return null
  },

  list: async (query: string, params: APIt.ListObjectivesQueryVariables): Promise<Objective[] | null> => {
    try {
      const listQV: APIt.ListObjectivesQueryVariables = params
      const listGQL = await graphqlQuery
        <APIt.ListObjectivesQueryVariables, APIt.ListObjectivesQuery>
        (query, listQV)
      if (listGQL.data) {
        const listQ: APIt.ListObjectivesQuery = listGQL.data;
        if (listQ.listObjectives && listQ.listObjectives.items) {
          const gotObjectives = listQ.listObjectives.items as Objective[]
          return gotObjectives
        } else console.error("情報の取得に失敗しました")
      } else console.error("情報の取得に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.listObjectives) {
        console.error("違反があります", e.errors)
        return e.data.listObjectives.items as Objective[]
      } else {
        console.error(e)
      }
    }
    return null
  },
}
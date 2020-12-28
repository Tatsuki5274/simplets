import { Employee } from "App";
import * as APIt from 'API';
import gql from 'graphql-tag';
import { ApolloQueryResult } from "@apollo/client";
import { client } from "./common";

export const EmployeeDao = {
  create: async (mutation: string, params: APIt.CreateEmployeeInput): Promise<Employee | null> => {
    try {
      const createI: APIt.CreateEmployeeInput = params
      const createMV: APIt.CreateEmployeeMutationVariables = {
        input: createI,
      };
      const createR = await client.mutate({
        mutation: gql(mutation),
        variables: createMV,
        fetchPolicy: 'no-cache',
      }) as ApolloQueryResult<APIt.CreateEmployeeMutation>;
      if (createR.data) {
        const createTM: APIt.CreateEmployeeMutation = createR.data
        if (createTM.createEmployee) {
          const employee: Employee = createTM.createEmployee
          return employee
        } else console.error("情報の作成に失敗しました")
      } else console.error("情報の作成に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.createEmployee) {
        console.error("違反があります", e.errors)
        return e.data.createEmployee as Employee
      } else {
        console.error(e)
      }
    }
    return null
  },
  update: async (mutation: string, params: APIt.UpdateEmployeeInput): Promise<Employee | null> => {
    try {
      const updateI: APIt.UpdateEmployeeInput = params
      const updateMV: APIt.UpdateEmployeeMutationVariables = {
        input: updateI,
      };
      const updateR = await client.mutate({
        mutation: gql(mutation),
        variables: updateMV,
        fetchPolicy: 'no-cache',
      }) as ApolloQueryResult<APIt.UpdateEmployeeMutation>;
      if (updateR.data) {
        const updateTM: APIt.UpdateEmployeeMutation = updateR.data
        if (updateTM.updateEmployee) {
          const employee: Employee = updateTM.updateEmployee
          return employee
        } else console.error("情報の更新に失敗しました")
      } else console.error("情報の更新に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.updateEmployee) {
        console.error("違反があります", e.errors)
        return e.data.updateEmployee as Employee
      } else {
        console.error(e)
      }
    }
    return null
  },
  delete: async (mutation: string, params: APIt.DeleteEmployeeInput): Promise<Employee | null> => {
    try {
      let deletedEmployee: Employee | null = null
      const deleteI: APIt.DeleteEmployeeInput = params
      const deleteMV: APIt.DeleteEmployeeMutationVariables = {
        input: deleteI,
      };
      const deleteR = await client.mutate({
        mutation: gql(mutation),
        variables: deleteMV,
        fetchPolicy: 'no-cache',
      }) as ApolloQueryResult<APIt.DeleteEmployeeMutation>;
      if (deleteR.data) {
        const deleteTM: APIt.DeleteEmployeeMutation = deleteR.data
        if (deleteTM.deleteEmployee) {
          deletedEmployee = deleteTM.deleteEmployee
          return deletedEmployee
        } else console.error("情報の削除に失敗しました")
      } else console.error("情報の削除に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.deleteEmployee) {
        console.error("違反があります", e.errors)
        return e.data.deleteEmployee as Employee
      } else {
        console.error(e)
      }
    }
    return null
  },
  get: async (query: string, params: APIt.GetEmployeeQueryVariables): Promise<Employee | null> => {
    try {
      const getQV: APIt.GetEmployeeQueryVariables = params
      const getGQL= await client.query({
        query: gql(query),
        variables: getQV,
        fetchPolicy: 'network-only',
      }) as ApolloQueryResult<APIt.GetEmployeeQuery>;
      if (getGQL.data) {
        const getQ: APIt.GetEmployeeQuery = getGQL.data
        if (getQ.getEmployee) {
          const gotEmployee: Employee = getQ.getEmployee
          return gotEmployee
        } else console.error("情報の取得に失敗しました")
      } else console.error("情報の取得に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.getEmployee) {
        console.error("違反があります", e.errors)
        return e.data.getEmployee as Employee
      } else {
        console.error(e)
      }
    }
    return null
  },

  list: async (query: string, params: APIt.ListEmployeesQueryVariables): Promise<Employee[] | null> => {
    try {
      const listQV: APIt.ListEmployeesQueryVariables = params
      const listGQL = await client.query({
        query: gql(query),
        variables: listQV,
        fetchPolicy: 'network-only',
      }) as ApolloQueryResult<APIt.ListEmployeesQuery>;
      if (listGQL.data) {
        const listQ: APIt.ListEmployeesQuery = listGQL.data;
        if (listQ.listEmployees && listQ.listEmployees.items) {
          const gotEmployees = listQ.listEmployees.items as Employee[]
          return gotEmployees
        } else console.error("情報の取得に失敗しました")
      } else console.error("情報の取得に失敗しました")
    } catch (e) {
      if (e && e.data && e.data.listEmployees) {
        console.error("違反があります", e.errors)
        return e.data.listEmployees.items as Employee[]
      } else {
        console.error(e)
      }
    }
    return null
  },
}
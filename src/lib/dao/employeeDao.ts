/* eslint-disable no-console */ //暫定措置
import * as APIt from "API";
import { Employee } from "API";
import { BaseDao } from "./common/baseDao";

export const EmployeeDao = {
  create: async (
    mutation: string,
    params: APIt.CreateEmployeeInput
  ): Promise<Employee | null> => {
    const result = (await BaseDao.create(
      mutation,
      params
    )) as APIt.CreateEmployeeMutation;
    return (result.createEmployee as Employee) || null;
  },
  update: async (
    mutation: string,
    params: APIt.UpdateEmployeeInput
  ): Promise<Employee | null> => {
    const result = (await BaseDao.update(
      mutation,
      params
    )) as APIt.UpdateEmployeeMutation;
    return (result.updateEmployee as Employee) || null;
  },
  delete: async (
    mutation: string,
    params: APIt.DeleteEmployeeInput
  ): Promise<Employee | null> => {
    const result = (await BaseDao.delete(
      mutation,
      params
    )) as APIt.DeleteEmployeeMutation;
    return (result.deleteEmployee as Employee) || null;
  },
  get: async (
    query: string,
    params: APIt.GetEmployeeQueryVariables
  ): Promise<Employee | null> => {
    const result = (await BaseDao.get(query, params)) as APIt.GetEmployeeQuery;
    return (result.getEmployee as Employee) || null;
  },

  /**
   * @deprecated 検証用のみ
   */
  list: async (
    query: string,
    params: APIt.ListEmployeesQueryVariables
  ): Promise<(Employee | null)[] | null> => {
    const result = (await BaseDao.list(
      query,
      params
    )) as APIt.ListEmployeesQuery;
    return (result.listEmployees?.items as (Employee | null)[]) || null;
  },

  listCompany: async (
    query: string,
    params: APIt.ListEmployeesCompanyQueryVariables
  ): Promise<(Employee | null)[] | null> => {
    const result = (await BaseDao.list(
      query,
      params
    )) as APIt.ListEmployeesCompanyQuery;
    return (result.listEmployeesCompany?.items as (Employee | null)[]) || null;
  },

  listManager: async (
    query: string,
    params: APIt.ListEmployeesManagerQueryVariables
  ): Promise<(Employee | null)[] | null> => {
    const result = (await BaseDao.list(
      query,
      params
    )) as APIt.ListEmployeesManagerQuery;
    return (result.listEmployeesManager?.items as (Employee | null)[]) || null;
  },
};

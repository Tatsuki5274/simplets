import { Company } from "App";
import * as APIt from 'API';
import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";

export const CompanyDao = {
    create: async(mutation: string ,params: APIt.CreateCompanyInput): Promise<Company | null> => {
      try{
        const createI: APIt.CreateCompanyInput = params
        const createMV: APIt.CreateCompanyMutationVariables = {
          input: createI,
        };
        const createR: GraphQLResult<APIt.CreateCompanyMutation> = 
          await API.graphql(graphqlOperation(mutation, createMV)) as GraphQLResult<APIt.CreateCompanyMutation>;
        if (createR.data) {
          const createTM: APIt.CreateCompanyMutation = createR.data
          if (createTM.createCompany) {
            const company: Company = createTM.createCompany
            return company
          }else console.error("情報の作成に失敗しました")
        }else console.error("情報の作成に失敗しました")
      }catch(e){
        if(e && e.data && e.data.createCompany){
          console.error("違反があります", e.errors)
          return e.data.createCompany as Company
        }else{
          console.error(e)
        }      }
      return null
    },
    update: async(mutation: string, params: APIt.UpdateCompanyInput): Promise<Company | null> => {
      try{
        const updateI: APIt.UpdateCompanyInput = params
        const updateMV: APIt.UpdateCompanyMutationVariables = {
            input: updateI,
        };
        const updateR: GraphQLResult<APIt.UpdateCompanyMutation> = 
          await API.graphql(graphqlOperation(mutation, updateMV)) as GraphQLResult<APIt.UpdateCompanyMutation>;
        if (updateR.data) {
          const updateTM: APIt.UpdateCompanyMutation = updateR.data
          if (updateTM.updateCompany) {
            const company: Company = updateTM.updateCompany
            return company
          }else console.error("情報の更新に失敗しました")
        }else console.error("情報の更新に失敗しました")
      }catch(e){
        if(e && e.data && e.data.updateCompany){
          console.error("違反があります", e.errors)
          return e.data.updateCompany as Company
        }else{
          console.error(e)
        }
      }
      return null
    },
    delete: async(mutation: string, params: APIt.UpdateCompanyInput): Promise<Company | null> => {
      try{
        let deletedCompany: Company | null = null
        const deleteI: APIt.DeleteCompanyInput = params
        const deleteMV: APIt.DeleteCompanyMutationVariables = {
          input: deleteI,
        };
        const deleteR: GraphQLResult<APIt.DeleteCompanyMutation> = 
          await API.graphql(graphqlOperation(mutation, deleteMV)) as GraphQLResult<APIt.DeleteCompanyMutation>;
        if (deleteR.data) {
          const deleteTM: APIt.DeleteCompanyMutation = deleteR.data
          if (deleteTM.deleteCompany) {
            deletedCompany = deleteTM.deleteCompany
            return deletedCompany
          }else console.error("情報の削除に失敗しました")
        }else console.error("情報の削除に失敗しました")
      }catch(e){
        if(e && e.data && e.data.deleteCompany){
          console.error("違反があります", e.errors)
          return e.data.deleteCompany as Company
        }else{
          console.error(e)
        }
      }
      return null
    },
    get: async(query: string, params: APIt.GetCompanyQueryVariables): Promise<Company | null> => {
      try{
        const getQV: APIt.GetCompanyQueryVariables = params
        const getGQL: GraphQLResult<APIt.GetCompanyQuery> = 
          await API.graphql(graphqlOperation(query, getQV)) as GraphQLResult<APIt.GetCompanyQuery>;
        if (getGQL.data) {
          const getQ: APIt.GetCompanyQuery = getGQL.data
          if (getQ.getCompany) {
            const gotCompany: Company = getQ.getCompany
            return gotCompany
          }else console.error("情報の取得に失敗しました")
        }else console.error("情報の取得に失敗しました")
      }catch(e){
        if(e && e.data && e.data.getCompany){
          console.error("違反があります", e.errors)
          return e.data.getCompany as Company
        }else{
          console.error(e)
        }
      }
      return null
    },

    list: async(query: string, params: APIt.ListCompanysQueryVariables): Promise<Company[] | null> => {
        try{
            const listQV: APIt.ListCompanysQueryVariables = params
            const listGQL: GraphQLResult<APIt.ListCompanysQuery> = 
            await API.graphql(graphqlOperation(query, listQV)) as GraphQLResult<APIt.ListCompanysQuery>;
            if (listGQL.data) {
              const listQ: APIt.ListCompanysQuery = listGQL.data;
              if (listQ.listCompanys && listQ.listCompanys.items) {
                  const gotCompanys = listQ.listCompanys.items as Company[]
                  return gotCompanys
              }else console.error("情報の取得に失敗しました")
            }else console.error("情報の取得に失敗しました")
        }catch(e){
            if(e && e.data && e.data.listCompanys){
                console.error("違反があります", e.errors)
                return e.data.listCompanys.items as Company[]
            }else{
                console.error(e)
            }
        }
        return null
    },
}
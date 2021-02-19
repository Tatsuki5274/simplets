import * as APIt from 'API';
import { Report } from 'API';
import { graphqlMutation, graphqlQuery } from './common/sdk';

export const ReportDao = {
    create: async (mutation: string, params: APIt.CreateReportInput): Promise<Report | null> => {
        try {
            const createI: APIt.CreateReportInput = params
            const createMV: APIt.CreateReportMutationVariables = {
                input: createI,
            };
            const createR = await graphqlMutation
                <APIt.CreateReportMutationVariables, APIt.CreateReportMutation>
                (mutation, createMV)
            if (createR.data) {
                const createTM: APIt.CreateReportMutation = createR.data
                if (createTM.createReport) {
                    const report: Report = createTM.createReport as Report
                    return report
                } else console.error("情報の作成に失敗しました")
            } else console.error("情報の作成に失敗しました")
        } catch (e) {
            if (e && e.data && e.data.createReport) {
                console.error("違反があります", e.errors)
                return e.data.createReport as Report // unsafe
            } else {
                console.error(e)
            }
        }
        return null
    },
    update: async (mutation: string, params: APIt.UpdateReportInput): Promise<Report | null> => {
        try {
            const updateI: APIt.UpdateReportInput = params
            const updateMV: APIt.UpdateReportMutationVariables = {
                input: updateI,
            };
            const updateR = await graphqlMutation
                <APIt.UpdateReportMutationVariables, APIt.UpdateReportMutation>
                (mutation, updateMV)
            if (updateR.data) {
                const updateTM: APIt.UpdateReportMutation = updateR.data
                if (updateTM.updateReport) {
                    const report: Report = updateTM.updateReport as Report // unsafe
                    return report
                } else console.error("情報の更新に失敗しました")
            } else console.error("情報の更新に失敗しました")
        } catch (e) {
            if (e && e.data && e.data.updateReport) {
                console.error("違反があります", e.errors)
                return e.data.updateReport as Report
            } else {
                console.error(e)
            }
        }
        return null
    },
    delete: async (mutation: string, params: APIt.DeleteReportInput): Promise<Report | null> => {
        try {
            let deletedReport: Report | null = null
            const deleteI: APIt.DeleteReportInput = params
            const deleteMV: APIt.DeleteReportMutationVariables = {
                input: deleteI,
            };
            const deleteR = await graphqlMutation
                <APIt.DeleteReportMutationVariables, APIt.DeleteReportMutation>
                (mutation, deleteMV)
            if (deleteR.data) {
                const deleteTM: APIt.DeleteReportMutation = deleteR.data
                if (deleteTM.deleteReport) {
                    deletedReport = deleteTM.deleteReport as Report // unsafe
                    return deletedReport
                } else console.error("情報の削除に失敗しました")
            } else console.error("情報の削除に失敗しました")
        } catch (e) {
            if (e && e.data && e.data.deleteReport) {
                console.error("違反があります", e.errors)
                return e.data.deleteReport as Report
            } else {
                console.error(e)
            }
        }
        return null
    },
    get: async (query: string, params: APIt.GetReportQueryVariables): Promise<Report | null> => {
        try {
            const getQV: APIt.GetReportQueryVariables = params
            const getGQL = await await graphqlQuery
                <APIt.GetReportQueryVariables, APIt.GetReportQuery>
                (query, getQV)
            if (getGQL.data) {
                const getQ: APIt.GetReportQuery = getGQL.data
                if (getQ.getReport) {
                    const gotReport: Report = getQ.getReport as Report // unsafe
                    return gotReport
                } else console.error("情報の取得に失敗しました")
            } else console.error("情報の取得に失敗しました")
        } catch (e) {
            if (e && e.data && e.data.getReport) {
                console.error("違反があります", e.errors)
                return e.data.getReport as Report
            } else {
                console.error(e)
            }
        }
        return null
    },

    list: async (query: string, params: APIt.ListReportsQueryVariables): Promise<Report[] | null> => {
        try {
            const listQV: APIt.ListReportsQueryVariables = params
            const listGQL = await graphqlQuery
                <APIt.ListReportsQueryVariables, APIt.ListReportsQuery>
                (query, listQV)
            if (listGQL.data) {
                const listQ: APIt.ListReportsQuery = listGQL.data;
                if (listQ.listReports && listQ.listReports.items) {
                    const gotReports = listQ.listReports.items as Report[]
                    return gotReports
                } else console.error("情報の取得に失敗しました")
            } else console.error("情報の取得に失敗しました")
        } catch (e) {
            if (e && e.data && e.data.listReports) {
                console.error("違反があります", e.errors)
                return e.data.listReports.items as Report[]
            } else {
                console.error(e)
            }
        }
        return null
    },
    listCompanyDate: async (query: string, params: APIt.ListReportsCompanyDateQueryVariables): Promise<Report[] | null> => {
        try {
            const listQV: APIt.ListReportsCompanyDateQueryVariables = params
            const listGQL = await graphqlQuery
                <APIt.ListReportsCompanyDateQueryVariables, APIt.ListReportsCompanyDateQuery>
                (query, listQV)
            if (listGQL.data) {
                const listQ: APIt.ListReportsCompanyDateQuery = listGQL.data;
                if (listQ.listReportsCompanyDate && listQ.listReportsCompanyDate.items) {
                    const gotReportsCompanyDate = listQ.listReportsCompanyDate.items as Report[]
                    return gotReportsCompanyDate
                } else console.error("情報の取得に失敗しました")
            } else console.error("情報の取得に失敗しました")
        } catch (e) {
            if (e && e.data && e.data.listReportsCompanyDate) {
                console.error("違反があります", e.errors)
                return e.data.listReportsCompanyDate.items as Report[]
            } else {
                console.error(e)
            }
        }
        return null
    },
}
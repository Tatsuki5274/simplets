import { GraphQLClient } from "../../libs/client";
import { Objective, Report, Section, Sheet, UpdateObjectiveInput, UpdateObjectiveMutationVariables, UpdateReportInput, UpdateReportMutationVariables, UpdateSectionInput, UpdateSectionMutationVariables, UpdateSheetInput, UpdateSheetMutation, UpdateSheetMutationVariables } from "../../API";
import { updateObjective, updateReport, updateSection, updateSheet } from "../../graphql/mutations";

// sheetKeysを取得
function getSheetKeys(sheet: Sheet): string {
    return `${sheet.companyID}.${sheet.reviewee}.${sheet.year}`
}

// sectionKeysを取得
function getSectionKeys(section: Section): string {
    return `${section.sheetKeys}.${section.sectionCategoryLocalId}`
}

// objectiveKeysを取得
function getObjectiveKeys(objective: Objective): string {
    return `${objective.sectionKeys}.${objective.createdAt}`
}

// reportKeysを取得
function getReportKeys(report: Report): string {
    return `${report.sub}.${report.date}`
}

export default async function (sheets: Sheet[], sections: Section[], objectives: Objective[], reports: Report[]) {
    // Todo 引数の入力をDBへ反映する処理を実装する
    const client = new GraphQLClient();

    // シートの更新処理を実施
    const funcs = [
        Promise.all(sheets.map(async (sheet) => {
            if (sheet.sub && sheet.year) {
                const params: UpdateSheetInput = {
                    sub: sheet.sub,
                    year: sheet.year,
                    secondReviewers: sheet.secondReviewers,
                    topReviewers: sheet.topReviewers,
                    referencer: sheet.referencer,
                }
                const updateI: UpdateSheetMutationVariables = {
                    input: params
                }
                const updatedSheet = await client.mutate(updateSheet, updateI)
                if (!updatedSheet) {
                    throw new Error(`updateError: ${getSheetKeys(sheet)}`)
                } else {
                    console.log(`Done updateSheet: ${getSheetKeys(sheet)}`)
                }
            }
        })),
        // セクションの更新処理を実施
        Promise.all(sections.map(async (section) => {
            if (section.sheetKeys && section.sectionCategoryLocalId) {
                const params: UpdateSectionInput = {
                    sheetKeys: section.sheetKeys,
                    sectionCategoryLocalId: section.sectionCategoryLocalId,
                    secondReviewers: section.secondReviewers,
                    topReviewers: section.topReviewers,
                    referencer: section.referencer,
                }
                const updateI: UpdateSectionMutationVariables = {
                    input: params
                }
                const updatedSection = await client.mutate(updateSection, updateI)
                if (!updatedSection) {
                    throw new Error(`updateError: ${getSectionKeys(section)}`)
                }
                console.log(`Done updateSection: ${getSectionKeys(section)}`)
            }
        })),

        // 目標の更新処理を実施
        Promise.all(objectives.map(async (objective) => {
            if (objective.createdAt && objective.sectionKeys) {
                const params: UpdateObjectiveInput = {
                    createdAt: objective.createdAt,
                    sectionKeys: objective.sectionKeys,
                    secondReviewers: objective.secondReviewers,
                    topReviewers: objective.topReviewers,
                    referencer: objective.referencer,
                }
                const updateI: UpdateObjectiveMutationVariables = {
                    input: params
                }
                const updatedObjective = await client.mutate(updateObjective, updateI)
                if (!updatedObjective) {
                    throw new Error(`updateError: ${getObjectiveKeys(objective)}`)
                } else {
                    console.log(`Done updateObjective: ${getObjectiveKeys(objective)}`)
                }

            }
        })),

        // 報告書の更新処理を実施
        Promise.all(reports.map(async (report) => {
            if (report.date && report.sub) {
                const params: UpdateReportInput = {
                    date: report.date,
                    sub: report.sub,
                    reviewer: report.reviewer,
                    referencer: report.referencer,
                }
                const updateI: UpdateReportMutationVariables = {
                    input: params
                }
                const updatedReport = await client.mutate(updateReport, updateI)
                if (!updatedReport) {
                    throw new Error(`updateError: ${getReportKeys(report)}`)
                } else {
                    console.log(`Done updateReport: ${getReportKeys(report)}`)
                }
            }
    }))]

    await Promise.all(funcs.map(async (func) => {
        await func;
    }))

    return undefined
}
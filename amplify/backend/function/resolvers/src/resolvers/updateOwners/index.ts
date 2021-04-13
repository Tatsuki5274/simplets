import { EventType } from "index";
import { GraphQLClient } from "../../libs/client";
import { listEmployees, listObjectives, listReports, listSections, listSheetReviewee } from "../../graphql/queries";
import Apply from "./Apply";
import GetPermission from "./GetPermission";
import { Employee, Objective, Report, Section, Sheet } from "../../API";
import { isEmployee, isObjective, isReport, isSection, isSheet } from "../../libs/typeChecker";

// sheetKeysを取得
function getSheetKeys(sheet: Sheet): string {
    return `${sheet.companyID}.${sheet.reviewee}.${sheet.year}`
}

// sectionKeysを取得
function getSectionKeys(section: Section): string {
    return `${section.sheetKeys}.${section.sectionCategoryLocalId}`
}

export default async function UpdateOwners(event: EventType) {
    let companyId: string | null = null
    let isCompanyAdmin: boolean = false

    // 管理者権限のチェック
    const claims = event.identity?.claims
    if (typeof claims === "object") {
        companyId = typeof claims["custom:companyId"] === "string" ? claims["custom:companyId"] : null
        isCompanyAdmin = typeof claims["custom:isCompanyAdmin"] === "boolean" ? claims["custom:isCompanyAdmin"] : false
    }
    if (!isCompanyAdmin) {
        // 社内管理者ではない場合
        // throw new Error("You don't have permission")
    }
    if (!companyId) {
        throw new Error("CompanyID is not set")
    }

    // Todo 変更前の入力
    const client = new GraphQLClient();
    // 社員情報の取得
    const employeesItems = await client.query(listEmployees, { companyID: companyId })
    // 社員情報の型を確認
    if (!isEmployee((employeesItems?.data as any).listEmployees.items)) {
        throw new TypeError('TypeError : employeesItems')
    }
    const employees: Employee[] = (employeesItems?.data as any).listEmployees.items

    // シート情報の取得
    const sheetsItems = await client.query(listSheetReviewee, { companyID: companyId })
    // console.log(JSON.stringify((sheetsItems.data as any).listSheetReviewee.items)) // 実行するとsheetテーブルの内容が出力される

    // シート情報の型を確認
    if (!isSheet((sheetsItems.data as any).listSheetReviewee.items)) {
        throw new TypeError('TypeError : sheetsItems')
    }
    const sheets: Sheet[] = (sheetsItems.data as any).listSheetReviewee.items


    // セクションの取得
    const sectionsItems = await client.query(listSections, { filter: { companyID: { eq: companyId } } })
    // console.log(JSON.stringify((sectionsItems.data as any).listSections.items)) // 実行するとsheetテーブルの内容が出力される

    // セクション情報の型を確認
    if (!isSection(((sectionsItems.data as any).listSections.items))) {
        throw new TypeError('TypeError : sectionsItems')
    }
    const sections: Section[] = (sectionsItems.data as any).listSections.items
    // console.log(sections);

    // 目標の取得
    const objectivesItems = await client.query(listObjectives, { filter: { companyID: { eq: companyId } } })
    // console.log(JSON.stringify((objectivesItems.data as any).listObjectives.items))
    // 目標情報の型を確認
    if (!isObjective((objectivesItems.data as any).listObjectives.items)) {
        throw new TypeError('TypeError : objectivesItems')
    }
    const objectives: Objective[] = (objectivesItems.data as any).listObjectives.items
    // console.log(JSON.stringify(objectives))


    // 報告書の取得
    const reportsItems = await client.query(listReports, {})
    // console.log(JSON.stringify((reportsItems.data as any).listReports.items)) 

    if (!isReport((reportsItems.data as any).listReports.items)) {
        throw new TypeError('TypeError : reportsItems')
    }
    const reports: Report[] = (reportsItems.data as any).listReports.items
    // console.log(JSON.stringify(reports))

    if (employees && sheets) {
        // Todo 権限の置き換え処理
        for (const employee of employees) {
            // console.log("employee:", employee)
            // 権限取得
            const reviewers = GetPermission(employee, employees)
            // console.log("reviewers:", reviewers)
            const secondReviewers = reviewers[0]
            const topReviewers = reviewers[1]
            const referencer = reviewers[2]
            if (reviewers) {
                // 選択シートを取得
                const selectedSheets = sheets.filter(sheet => sheet.sub === employee.sub)
                // console.log("employeeSheets",employeeSheets)
                for (const sheet of selectedSheets) {
                    // 選択シートの権限を上書き
                    sheet.secondReviewers = secondReviewers;
                    sheet.topReviewers = topReviewers;
                    sheet.referencer = referencer;

                    // セクションを選択
                    const selectedSections = sections.filter(section => section.sheetKeys === getSheetKeys(sheet))
                    for (const section of selectedSections) {
                        // 選択セクションの権限を上書き
                        section.secondReviewers = secondReviewers;
                        section.topReviewers = topReviewers;
                        section.referencer = referencer;

                        // 目標を選択
                        const selectedObjectives = objectives.filter(objective => objective.sectionKeys === getSectionKeys(section));
                        for (const objective of selectedObjectives) {
                            // 選択目標の権限を上書き
                            objective.secondReviewers = secondReviewers;
                            objective.topReviewers = topReviewers;
                            objective.referencer = referencer;
                        }
                    }
                }
                // 報告書を選択
                const selectedReports = reports.filter(report => report.sub === employee.sub)
                const referencerReport = employees.map(employee => {
                    return employee.username || null
                })
                // console.log("referencerReport:",referencerReport)
                for (const report of selectedReports) {
                    // 選択報告書の権限を上書き
                    report.reviewer = secondReviewers;
                    report.referencer = referencerReport;
                }
            }
        }
        // Todo DBへの反映処理
        await Apply(sheets, sections, objectives, reports)

        return {
            message: "hello"
        }
    }
}
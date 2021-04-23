import { convertJson } from "./converters/json";
import { CreateCategoryInput, CreateEmployeeInput, CreateGroupInput, CreateObjectiveInput, CreateReportInput, CreateSectionInput, CreateSheetInput, ListSheetsCompanyQueryVariables, Sheet } from "./libs/API";
import { SheetDao } from "./libs/dao/sheetDao";
import { createCategory, createEmployee, createGroup, createObjective, createReport, createSection, createSheet, updateSheet } from "./libs/graphql/mutations";
import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';
import * as configJson from "./config.json";
import AWS from "aws-sdk";
import AWSAppSyncClient from 'aws-appsync'
import { ApolloQueryResult, gql } from "@apollo/client";
import generateSheet from "./converters/sheet";
import { generateSection } from "./converters/section";
import { SectionDao } from "./libs/dao/sectionDao";
import { generateObjective } from "./converters/objective";
import { listSheetsCompany } from "./libs/graphql/queries";
import { v4 as uuidv4 } from 'uuid';
import { generateReport } from "./converters/report";
import { generateEmployee } from "./converters/employee";
import { generateGroup } from "./converters/group";
import { generateCategory } from "./converters/category";
import { GroupDao } from "./libs/dao/groupDao";
import { ObjectiveDao } from "./libs/dao/objectiveDao";
import { EmployeeDao } from "./libs/dao/employeeDao";
import { CategoryDao } from "./libs/dao/categoryDao";
import { ReportDao } from "./libs/dao/reportDao";


// const config = configJson.refactor;  // エンドポイントの切り替え
// const credentialProfile = "SCC"; //credentialのプロファイル名
// var credentials = new AWS.SharedIniFileCredentials({profile: credentialProfile});

//
// scripts/importFromOldDB/libs/dao/common/client.ts でプロファイルとエンドポイントの設定を行う(仮)
//

async function main2() {
    const dataDir = "data";

    try {
        // Reportテーブルの復元
        const reportDir = "report"
        const path = `./${dataDir}/${reportDir}`;
        const convertResult = await convertJson(path);
        const resultReport: CreateReportInput[] = convertResult.map((cv) => {
            return generateReport(cv)
        })
        console.log()
        for(const report of resultReport) {
            const result = await ReportDao.create(createReport, report);
            console.log(result);
        }
    } catch (e) {
        console.error("error", e.message);
        console.error("stack", e.stack);
    }

    try {
        // Groupテーブルの復元
        const groupDir = "group"
        const path = `./${dataDir}/${groupDir}`;
        const convertResult = await convertJson(path);
        const resultGroup: CreateGroupInput[] = convertResult.map((cv) => {
            return generateGroup(cv)
        })
        for (const group of resultGroup) {
            const result = await GroupDao.create(createGroup, group);
            console.log(result);
        }
        // console.log()
        if (resultGroup) {
            try {
                // Sheetテーブルの復元
                const sheetDir = "sheet"
                const path = `./${dataDir}/${sheetDir}`;
                const convertResult = await convertJson(path);
                const resultSheet: CreateSheetInput[] = convertResult.map((cv) => {
                    const groupId = resultGroup.find(gr => {
                        return gr.no === cv.sheetGroupLocalId.S
                    })?.id
                    return generateSheet(cv, groupId || "")
                })
                // Promise.all(resultSheet.map(async (sh) => {
                //     const result = await SheetDao.create(createSheet, sh);
                //     console.log(result);
                // }))
                for (const sheet of resultSheet) {
                    const result = await SheetDao.create(createSheet, sheet);
                    console.log(result);
                }

                // console.log()
                if (resultSheet) {
                    resultSheet.forEach(async sheet => {
                        const sheetKey = `${sheet.companyID}.${sheet.reviewee}.${sheet.year}`

                        try {
                            // Sectionテーブルの復元
                            const sectionDir = "section"
                            const path = `./${dataDir}/${sectionDir}`;
                            const convertResult = await convertJson(path);
                            const filteredConvertResult = convertResult.filter(result => result.sheetKeys.S === sheetKey)
                            const resultSection: CreateSectionInput[] = filteredConvertResult.map((cv) => {
                                return generateSection(cv, sheet.id || "")
                            })
                            for (const section of resultSection) {
                                const result = await SectionDao.create(createSection, section);
                                console.log(result);
                            }
                            // console.log()
                            if (resultSection) {
                                resultSection.forEach(async section => {
                                    const sectionKey = `${sheetKey}.${section.no}`
                                    try {
                                        // Objectiveテーブルの復元
                                        const objectiveDir = "objective"
                                        const path = `./${dataDir}/${objectiveDir}`;
                                        const convertResult = await convertJson(path);
                                        const filteredConvertResult = convertResult.filter(result => result.sectionKeys.S === sectionKey)
                                        const resultObjective: CreateObjectiveInput[] = filteredConvertResult.map((cv) => {
                                            return generateObjective(cv, section.id || "")
                                        })
                                        // console.log()
                                        for (const objective of resultObjective) {
                                            const result = await ObjectiveDao.create(createObjective, objective);
                                            console.log(result);
                                        }
                                    } catch (e) {
                                        console.error("error", e.message);
                                        console.error("stack", e.stack);
                                    }
                                })
                            }
                        } catch (e) {
                            console.error("error", e.message);
                            console.error("stack", e.stack);
                        }
                    })
                }
            } catch (e) {
                console.error("error", e.message);
                console.error("stack", e.stack);
            }

            try {
                // Employeeテーブルの復元
                const employeeDir = "employee"
                const path = `./${dataDir}/${employeeDir}`;
                const convertResult = await convertJson(path);
                const resultEmployee: CreateEmployeeInput[] = convertResult.map((cv) => {
                    const groupId = resultGroup.find(gr => {
                        return gr.no === cv.employeeGroupLocalId.S
                    })?.id
                    return generateEmployee(cv, groupId || "")
                })
                console.log()
                for (const employee of resultEmployee) {
                    const result = await EmployeeDao.create(createEmployee, employee);
                    console.log(result);
                }
            } catch (e) {
                console.error("error", e.message);
                console.error("stack", e.stack);
            }
        }
    } catch (e) {
        console.error("error", e.message);
        console.error("stack", e.stack);
    }

    try {
        // Categoryテーブルの復元
        const categoryDir = "category"
        const path = `./${dataDir}/${categoryDir}`;
        const convertResult = await convertJson(path);
        const resultCategory: CreateCategoryInput[] = convertResult.map((cv) => {
            return generateCategory(cv)
        })
        // console.log()
        for (const category of resultCategory) {
            const result = await CategoryDao.create(createCategory, category);
            console.log(result);
        }
    } catch (e) {
        console.error("error", e.message);
        console.error("stack", e.stack);
    }

    return true;
}

async function test() {
    const id = uuidv4();
    const params: CreateSheetInput = {
        id: id,
        sub: "subsub",
        groupID: "test",
        year: 2020,
        companyID: "SCC",
        grade: "L1",
        revieweeUsername: "reviewee",
        secondUsername: "second",
        reviewee: "reviewee",
    };
    const result = await SheetDao.create(createSheet, params);
    // const result = await client.mutate({
    //     mutation: gql(createSheet),
    //     variables: params,
    //     fetchPolicy: 'no-cache',
    //     errorPolicy: "all",
    // }) as ApolloQueryResult<any>;
}

main2();
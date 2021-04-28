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

AWS.config.update({ region: 'ap-northeast-1' });
export const credentialProfile = "SCCProd"; //credentialのプロファイル名
var credentials = new AWS.SharedIniFileCredentials({profile: credentialProfile});
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({region: 'ap-northeast-1',credentials:credentials});

async function getUsersFromUserPool() {
    // const userPoolId = "ap-northeast-1_Ix36JPBYl" // dev
    // const userPoolId = "ap-northeast-1_ZjlwviLzZ" // refactor
    const userPoolId = "ap-northeast-1_qkpxOPIy8" // prodb
    // console.log("ユーザープール", userPoolId)

    if (userPoolId) {
        const params = {
            UserPoolId: userPoolId,
            AttributesToGet: [
                'sub',
            ],      
        };
        try{
            const response = await cognitoidentityserviceprovider.listUsers(params).promise();
            console.log("response", JSON.stringify(response, null, 2));
            return response.Users?.map(user => {
                return {
                    username: user.Username || null,
                    sub: user.Attributes?.find(attr => {
                        return attr.Name === "sub"
                    })?.Value || null
                }
            }) || null
        } catch(e){
            console.error(e);
            throw new Error(e);
        }

    } else {
        console.log("ユーザープールが未設定です")
        return null
    }
}

async function main2() {
    const dataDir = "data";
    const users = await getUsersFromUserPool()
    console.log();

    if (users) {
        console.log("userPoolの人数:", users.length);
        try {
            // Reportテーブルの復元
            const reportDir = "report"
            const path = `./${dataDir}/${reportDir}`;
            const convertResult = await convertJson(path);
            const resultReport: CreateReportInput[] = convertResult.map((cv) => {
                const sub = users.find(user => {
                    return user.username === cv.reviewee.S
                })?.sub
                return generateReport(cv, sub || "")
            })

            let countReport = 0;
            for (const report of resultReport) {
                const result = await ReportDao.create(createReport, report);
                // console.log(result);
                if (result) {
                    countReport++;
                }
            }
            console.log("createReport:", countReport); // 作成した報告書のアイテム数を表示
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
            let countGroup = 0;
            for (const group of resultGroup) {
                const result = await GroupDao.create(createGroup, group);
                // console.log(result);
                if (result) {
                    countGroup++;
                }
            }
            console.log("createdGroup:", countGroup); // 作成した部署のアイテム数を表示
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
                        const sub = users.find(user => {
                            return user.username === cv.reviewee.S
                        })?.sub
                        return generateSheet(cv, groupId || "", sub || "")
                    })
                    let countSheet = 0;
                    for (const sheet of resultSheet) {
                        const result = await SheetDao.create(createSheet, sheet);
                        // console.log(result);
                        if (result) {
                            countSheet++;
                        }
                    }
                    console.log("createdSheet:", countSheet); // 作成したシートのアイテム数を表示

                    // console.log()
                    let countSection = 0;
                    let countObjective = 0;

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

                                // let countSection = 0;
                                for (const section of resultSection) {
                                    const result = await SectionDao.create(createSection, section);
                                    // console.log(result);
                                    if (result) {
                                        countSection++;
                                    }
                                }
                                console.log("createSection:", countSection); // 作成したセクションのアイテム数を表示
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
                                            // let countObjective = 0;
                                            for (const objective of resultObjective) {
                                                const result = await ObjectiveDao.create(createObjective, objective);
                                                // console.log(result);
                                                if (result) {
                                                    countObjective++;
                                                }
                                            }
                                            console.log("createObjective:", countObjective); // 作成した目標のアイテム数を表示
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
                    console.log()
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
                        const sub = users.find(user => {
                            return user.username === cv.username.S
                        })?.sub
                        return generateEmployee(cv, groupId || "", sub || "")
                    })
                    let countEmployee = 0;
                    for (const employee of resultEmployee) {
                        const result = await EmployeeDao.create(createEmployee, employee);
                        // console.log(result);
                        if (result) {
                            countEmployee++;
                        }
                    }
                    console.log("createEmployee:", countEmployee); // 作成した社員のアイテム数を表示
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
            let countCategory = 0;
            for (const category of resultCategory) {
                const result = await CategoryDao.create(createCategory, category);
                // console.log(result);
                if (result) {
                    countCategory++;
                }
            }
            console.log("createCategory:", countCategory); // 作成したカテゴリのアイテム数を表示
        } catch (e) {
            console.error("error", e.message);
            console.error("stack", e.stack);
        }
    } else {
        console.error("users is undefined", users)
    }

    return true;
}

// async function test() {
//     const id = uuidv4();
//     const params: CreateSheetInput = {
//         id: id,
//         sub: "subsub",
//         groupID: "test",
//         year: 2020,
//         companyID: "SCC",
//         grade: "L1",
//         revieweeUsername: "reviewee",
//         secondUsername: "second",
//         reviewee: "reviewee",
//     };
//     const result = await SheetDao.create(createSheet, params);
//     // const result = await client.mutate({
//     //     mutation: gql(createSheet),
//     //     variables: params,
//     //     fetchPolicy: 'no-cache',
//     //     errorPolicy: "all",
//     // }) as ApolloQueryResult<any>;
// }

main2();
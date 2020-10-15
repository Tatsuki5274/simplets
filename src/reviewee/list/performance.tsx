import React, { useEffect, useState } from 'react';
import Amplify, { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import { Button, Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GraphQLResult } from "@aws-amplify/api";
import { ListSheetsQuery } from 'API';
import { Link } from 'react-router-dom';
import { Category, Employee, Interview, Section, Sheet } from 'App';
import { ApprovalStatus, getStatusValue } from 'lib/getStatusValue'
import { getEmployee, listCategorys, listSheets } from 'graphql/queries'
import * as APIt from 'API';
import { createInterview, createSection, createSheet, updateSheet } from 'graphql/mutations';
import SidebarComponents from 'common/Sidebar';
import HeaderComponents from 'common/header';


// const listSheets = /* GraphQL */ `
// query ListSheets {
//   listSheets {
//     items {
//       year
//       overAllEvaluation
//       id
//       status {
//         name
//       }
//       secondEmployee {
//         lastName
//         firstName
//       }
//     }
//   }
// }`;

function ListPerformanceEvalution() {
    const [sheets, setSheets] = useState<Sheet[]>();

    useEffect(() => {
        ; (async () => {
            let response
            try {
                response = (await API.graphql(graphqlOperation(listSheets))
                ) as GraphQLResult<ListSheetsQuery>;
            } catch (e) {
                console.error("エラーを無視しています", e)
                response = e
            }
            const listItems = response.data?.listSheets?.items;
            setSheets(listItems as Sheet[]);
            console.log(response);
            console.log(listItems);

        })()
    }, []);

    async function handleClickCreate() {
        //今日の日付を取得
        const today: Date = new Date();

        // 社員情報取得
        const revieweeEmployeeItems: Employee = await getQueryEmployee();
        const revieweeEmployeeID = revieweeEmployeeItems.id; //社員ID取得
        //const revieweeEmployeeSuperior: any = [(await revieweeEmployeeItems).superior?.id, (await revieweeEmployeeItems).superior?.superior?.id];
        const revieweeEmployeeSuperior: Array<string | null> = 
        [revieweeEmployeeItems.superior ? revieweeEmployeeItems.superior.id : "",
        revieweeEmployeeItems.superior?.superior ? revieweeEmployeeItems.superior.superior?.id : ""]; //上司情報取得

        //カテゴリを取得する
        const categorys = await runListCategory();
        if (categorys) {
            console.log("categorys", categorys)

            //シートを作成
            const createdSheet = await runCreateSheet();
            if (createdSheet) {
                console.log('CreateSheet', createdSheet);
                //インタビューを作成
                for (let i = 0; i < 4; i++) {
                    const createdInterview = await runCreateInterview(createdSheet.id)
                    console.log('CreateInterview', createdInterview);
                }
                //取得したカテゴリを元にsectionを作成する
                categorys.forEach(async (category: Category) => {
                    const createdSection = await runCreateSection(category.id, createdSheet.id);
                    console.log("CreatedSection", createdSection);
                })
                //レンダリング要素の追加
                addSheets(createdSheet);
                console.log("Done!", sheets);

            } else {
                console.error("error");
            }
        }

        async function getQueryEmployee() {
            //ログインユーザ情報取得
            const currentUser = await Auth.currentAuthenticatedUser();
            const revieweeEmployeeID: string = currentUser.username;

            //所属長,部門長情報取得
            const input: APIt.GetEmployeeQueryVariables = {
                id: revieweeEmployeeID
            }
            let response;
            try {
                response = (await API.graphql(graphqlOperation(getEmployee, input))
                ) as GraphQLResult<APIt.GetEmployeeQuery>;
            } catch (e) {
                console.error("エラーを無視しています", e)
                response = e;
            }

            const employeeItem: Employee = response.data.getEmployee as Employee;
            
            return employeeItem;
        }

        async function runCreateSheet(): Promise<Sheet | undefined> {
            //シートを作成
            let sheetId: string = '';

            const createI: APIt.CreateSheetInput = {
                grade: 0,
                sheetGroupId: "0",
                year: today.getFullYear(),
                sheetRevieweeEmployeeId: revieweeEmployeeID,
                reviewers: revieweeEmployeeSuperior,
            };
            const createMV: APIt.CreateSheetMutationVariables = {
                input: createI,
            };
            let createR: GraphQLResult<APIt.CreateSheetMutation>
            try {
                createR = await API.graphql(graphqlOperation(createSheet, createMV)) as GraphQLResult<APIt.CreateSheetMutation>;
            } catch (e) {
                console.error("エラーを無視しています", e)
                console.error("データが不完全でないことを確認してください")
                createR = e;
            }
            if (createR.data) {
                const createTM: APIt.CreateSheetMutation = createR.data;
                if (createTM.createSheet) {
                    const sheet: Sheet = createTM.createSheet;
                    sheetId = createTM.createSheet.id;
                    return sheet;
                }
            }
        }

        async function runCreateSection(categoryId: string, sheetId: string): Promise<Section | undefined> {
            const createI: APIt.CreateSectionInput = {
                sectionSheetId: sheetId,
                sectionCategoryId: categoryId
            };
            const createMV: APIt.CreateSectionMutationVariables = {
                input: createI,
            };
            let createR: GraphQLResult<APIt.CreateSectionMutation>
            try {
                createR = await API.graphql(graphqlOperation(createSection, createMV)) as GraphQLResult<APIt.CreateSectionMutation>;
            } catch (e) {
                console.error("エラーを無視しています", e)
                console.error("データが不完全でないことを確認してください")
                createR = e;
            }
            if (createR.data) {
                const createTM: APIt.CreateSectionMutation = createR.data;
                if (createTM.createSection) {
                    const createdSection: Section = createTM.createSection;
                    sheetId = createTM.createSection.id;
                    return createdSection;
                }
            }
        }
        async function runListCategory(): Promise<Category[] | undefined> {
            const listQV: APIt.ListCategorysQueryVariables = {};
            let listGQL: GraphQLResult<APIt.ListCategorysQuery>
            try {
                listGQL = await API.graphql(graphqlOperation(listCategorys, listQV)) as GraphQLResult<APIt.ListCategorysQuery>;
            } catch (e) {
                console.error("エラーを無視しています", e)
                console.error("データが不完全でないことを確認してください")
                listGQL = e;
            }
            if (listGQL.data) {
                const listQ: APIt.ListCategorysQuery = listGQL.data;
                if (listQ.listCategorys && listQ.listCategorys.items) {
                    return listQ.listCategorys.items as Category[];

                    // listQ.listCategorys.items.forEach((item: Todo | null) => {
                    //     if (item) {
                    //         const todo: Todo = item;
                    //         console.log('ListTodo:', todo);
                    //     }
                    // });
                }
            }
        }
        async function runCreateInterview(sheetId: string): Promise<Interview | undefined> {
            let interviewId: string = '';

            const createI: APIt.CreateInterviewInput = {
                sheetId: sheetId,
                reviewers: revieweeEmployeeSuperior
            };
            const createMV: APIt.CreateInterviewMutationVariables = {
                input: createI
            };
            let createR: GraphQLResult<APIt.CreateInterviewMutation>
            try {
                createR = await API.graphql(graphqlOperation(createInterview, createMV)) as GraphQLResult<APIt.CreateInterviewMutation>;
            } catch (e) {
                console.error("エラーを無視しています", e)
                console.error("データが不完全でないことを確認してください")
                createR = e;
            }
            if (createR.data) {
                const createTM: APIt.CreateInterviewMutation = createR.data;
                if (createTM.createInterview) {
                    const interview: Interview = createTM.createInterview;
                    interviewId = createTM.createInterview.id;
                    return interview;
                }
            }
        }

        function addSheets(newSheet: Sheet) {
            //現在のステートへ適用
            const newSheetState = sheets?.concat();
            newSheetState?.push(newSheet)
            setSheets(newSheetState);
        }
    }

    if (sheets === undefined) return <div>Loading</div>
    return (
        <div>
            {/* ヘッダーの表示 */}
            <HeaderComponents />
            {/* サイドバーコンポーネント 表示 */}
            <SidebarComponents />

            <div>
                <Container>
                    <h2>業績評価一覧</h2>
                    <Button variant="primary" onClick={handleClickCreate}>新規作成</Button>
                    <Table bordered>
                        <thead>
                            <tr>
                                <td></td>
                                <td>年度</td>
                                <td>所属長</td>
                                <td>ステータス</td>
                                <td>総合評価</td>
                                <td></td>
                            </tr>
                        </thead>

                        <tbody>
                            {sheets.map((sheet: Sheet) => {
                                let editName = "編集";
                                if (sheet.statusValue === ApprovalStatus.DONE) {
                                    editName = "確認";
                                }
                                return (
                                    <tr key={sheet.id}>
                                        <td><Link to={"/reviewee/sheet/" + sheet.id}>{editName}</Link></td>
                                        <td>{sheet.year}</td>
                                        <td>{sheet.secondEmployee ? sheet.secondEmployee.lastName : ""}{sheet.secondEmployee ? sheet.secondEmployee.firstName : ""}</td>
                                        <td>{getStatusValue(sheet.statusValue || -1)}</td>
                                        <td>{sheet.overAllEvaluation}</td>
                                        <td><a href="">プレビュー</a></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Container>
            </div>
        </div>
    );
}

export default ListPerformanceEvalution;
import React, { useEffect, useState } from 'react';
import Amplify, { Storage, API, graphqlOperation } from 'aws-amplify';
import { Button, Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GraphQLResult } from "@aws-amplify/api";
import { ListSheetsQuery } from 'API';
import { Link } from 'react-router-dom';
import { Interview, Sheet } from 'App';
import {ApprovalStatus, getStatusValue} from 'lib/getStatusValue'
import {listSheets} from 'graphql/queries'
import * as APIt from 'API';
import { createInterview, createSheet } from 'graphql/mutations';


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
        ;(async()=>{
            const response = (await API.graphql(graphqlOperation(listSheets))
            )as GraphQLResult<ListSheetsQuery>;
            const listItems = response.data?.listSheets?.items;
            setSheets(listItems as Sheet[]);
            console.log(response);
            console.log(listItems);
        })()
      },[]);

    async function handleClickCreate(){
        //今日の日付を取得
        const today: Date = new Date();

        //シートを作成
        let sheetId: string = '';
        const createI: APIt.CreateSheetInput = {
            grade: 0,
            sheetGroupId: "0",
            year: today.getFullYear()
        };
        const createMV: APIt.CreateSheetMutationVariables = {
            input: createI,
        };
        const createR: GraphQLResult<APIt.CreateSheetMutation> = 
            await API.graphql(graphqlOperation(createSheet, createMV)) as GraphQLResult<APIt.CreateSheetMutation>;
        if (createR.data) {
            const createTM: APIt.CreateSheetMutation = createR.data;
            if (createTM.createSheet) {
                const sheet : Sheet = createTM.createSheet;
                console.log('CreateSheet', sheet);
                sheetId = createTM.createSheet.id;

                //インタビューを作成
                for(let i=0;i<4;i++){
                    let interviewId: string = '';
                    const createI: APIt.CreateInterviewInput = {
                        sheetId: sheetId
                    };
                    const createMV: APIt.CreateInterviewMutationVariables = {
                        input: createI,
                    };
                    const createR: GraphQLResult<APIt.CreateInterviewMutation> = 
                        await API.graphql(graphqlOperation(createInterview, createMV)) as GraphQLResult<APIt.CreateInterviewMutation>;
                    if (createR.data) {
                        const createTM: APIt.CreateInterviewMutation = createR.data;
                        if (createTM.createInterview) {
                            const interview: Interview = createTM.createInterview;
                            console.log('CreateInterview', interview);
                            interviewId = createTM.createInterview.id;
                        }
                    }
                }

                //現在のステートへ適用
                const newSheetState = sheets?.concat();
                newSheetState?.push(sheet)
                setSheets(newSheetState);
                console.log("Done.", newSheetState)
            }
        }
    }

    if(sheets === undefined) return <div>Loading</div>
    return (
        <div>
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
                            {sheets.map((sheet: Sheet)=>{
                                let editName = "編集";
                                if(sheet.statusValue === ApprovalStatus.DONE){
                                    editName = "確認";
                                }
                                return (
                                    <tr key={sheet.id}>
                                        <td><Link to={"/reviewee/sheet/"+sheet.id}>{editName}</Link></td>
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
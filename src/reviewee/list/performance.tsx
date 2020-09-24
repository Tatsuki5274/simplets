import React, { useEffect, useState } from 'react';
import Amplify, { Storage, API, graphqlOperation } from 'aws-amplify';
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GraphQLResult } from "@aws-amplify/api";
import { ListSheetsQuery } from 'API';
import { Link } from 'react-router-dom';
import { Sheet } from 'App';
import {ApprovalStatus, getStatusValue} from 'lib/getStatusValue'
import {listSheets} from 'graphql/queries'


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

    if(sheets === undefined) return <div>Loading</div>
    return (
        <div>
            <div>
                <Container>
                    <h2>業績評価一覧</h2>
                    
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
                                    <tr>
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
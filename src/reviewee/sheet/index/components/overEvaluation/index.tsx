import { UserContext } from "App";
import React, { useContext, useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { SheetContext } from "../..";
import * as APIt from 'API';
import { SheetDao } from "lib/dao/sheetDao";
import { listSheets } from "graphql/queries";

export const OverEvaluationTable = () => {
    const currentUser = useContext(UserContext);
    const context = useContext(SheetContext);
    const sheet = context.sheet
    const setSheet = context.setSheet
    const [previousPeriod, setPreviousPeriod] = useState<(number | null)[]>([null, null])


    useEffect(() => {
        ; (async () => {
            // 前期と前々期を取得
            if(sheet){
                const thisYear = sheet.year

                const input: APIt.ListSheetsQueryVariables = {
                    filter: {
                        year: {
                            between: [thisYear - 2, thisYear - 1]
                        },
                        reviewee:{
                            eq: currentUser.username
                        }
                    }
                }
                const gotSheets = await SheetDao.list(listSheets, input)

                if(gotSheets){
                    if(gotSheets.length > 2){
                        console.error("業績評価年度に重複があります。前期前々期の記録に想定されない値が格納される場合があります。", gotSheets)
                    }
                    let results: (number | null)[] = [null, null]

                    // 前期の記録を取得
                    results[0] = gotSheets.find((sheet)=>{
                        return sheet?.year === thisYear - 1
                    })?.overAllEvaluation || null
                    // 前々期の記録を取得
                    results[1] = gotSheets.find((sheet)=>{
                        return sheet?.year === thisYear - 2
                    })?.overAllEvaluation || null

                    setPreviousPeriod(results)
                }

            }
        })()
    }, [sheet, currentUser]);
    
    if(sheet && setSheet){
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>前々期</td>
                        <td>前期</td>
                        <td>今期</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{previousPeriod[1]}</td>
                        <td>{previousPeriod[0]}</td>
                        <td>{sheet.overAllEvaluation || "未評価"}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }else{
        return null
    }

}
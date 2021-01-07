import { UserContext } from "App";
import React, { useContext, useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { SheetContext } from "../..";
import * as APIt from 'API';
import { SheetDao } from "lib/dao/sheetDao";
import { tableHeaderStyle } from "common/globalStyle.module.scss";

const listSheetReviewee = /* GraphQL */ `
  query ListSheetReviewee(
    $companyID: ID
    $reviewee: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSheetReviewee(
      companyID: $companyID
      reviewee: $reviewee
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        year
        overAllEvaluation
      }
      nextToken
    }
  }
`;

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

                if(currentUser){
                    const input: APIt.ListSheetRevieweeQueryVariables = {
                        companyID: currentUser.attributes["custom:companyId"],
                        reviewee: {
                            eq: currentUser.username
                        },
                        filter: {
                            year: {
                                between: [thisYear - 2, thisYear - 1]
                            }
                        }
                    }
                    console.log("input",input);
                    const gotSheets = await SheetDao.listReviewee(listSheetReviewee, input)
                    console.log("gotSheets",gotSheets);

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

            }
        })()
    }, [sheet, currentUser]);
    
    if(sheet && setSheet){
        return (
            <Table bordered hover>
                <thead className={tableHeaderStyle}>
                    <tr>
                        <td>前々期</td>
                        <td>前期</td>
                        <td>今期</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{previousPeriod[1] || "-"}</td>
                        <td>{previousPeriod[0] || "-"}</td>
                        <td>{sheet.overAllEvaluation || "未評価"}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }else{
        return null
    }

}
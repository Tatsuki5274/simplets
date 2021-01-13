import { Section, Sheet } from "App";
import { getSheet, listSheetReviewee } from "graphql/queries";
import { SheetDao } from "lib/dao/sheetDao";
import React, { useEffect, useState } from "react";
import { PDFTemplete } from "./templete";
import * as APIt from 'API';
import { getStatusValue } from "lib/getStatusValue";

type Props = {
    match: {
        params: {
            companyId: string
            reviewee: string
            year: string        
        }
    }
}

const sortObjective = function (a: any, b: any) {
    if (a?.updatedAt > b?.updatedAt) {
        return 1;
    } else {
        return -1;
    }
}
const sortCategory = function (a: Pick<Section, "category"> | null, b: Pick<Section, "category"> | null) {
    if (a?.category?.localID && b?.category?.localID && a.category.localID > b.category.localID) {
        return 1;
    } else {
        return -1;
    }}

export function PDFPage(props:Props) {
    const [sheet, setSheet] = useState<Sheet | null>(null);
    const [lastOverAllEvaluations, setlastOverAllEvaluations] = useState<Array<number | null> | null>();
    useEffect(() => {
        (async () => {
            const res = await SheetDao.get(getSheet, { companyID: props.match.params.companyId, reviewee: props.match.params.reviewee, year: parseInt(props.match.params.year) })

            res?.section?.items?.forEach((section) => {
                section?.objective?.items?.sort(sortObjective)
            })
            res?.section?.items?.sort(sortCategory)
            setSheet(res)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            // 前期と前々期を取得
            if (sheet) {
                const thisYear = sheet.year

                const input: APIt.ListSheetRevieweeQueryVariables = {
                    companyID: sheet.companyID,
                    reviewee: {
                        eq: sheet.reviewee
                    },
                    filter: {
                        year: {
                            between: [thisYear - 2, thisYear - 1]
                        }
                    }
                }
                console.log("input", input);
                const gotSheets = await SheetDao.listReviewee(listSheetReviewee, input)
                console.log("gotSheets", gotSheets);

                if (gotSheets) {
                    if (gotSheets.length > 2) {
                        console.error("業績評価年度に重複があります。前期前々期の記録に想定されない値が格納される場合があります。", gotSheets)
                    }
                    let results: (number | null)[] = [null, null]

                    // 前期の記録を取得
                    results[0] = gotSheets.find((sheet) => {
                        return sheet?.year === thisYear - 1
                    })?.overAllEvaluation || null
                    // 前々期の記録を取得
                    results[1] = gotSheets.find((sheet) => {
                        return sheet?.year === thisYear - 2
                    })?.overAllEvaluation || null

                    setlastOverAllEvaluations(results);

                }
            }
        })()
    }, [sheet])

    if (sheet) {

        return (
            <PDFTemplete
                sheet={sheet}
                approvalStatusString={getStatusValue(sheet.statusValue || -1)}
                gradeString={"社員"}
                isConfirmReviewee={true}
                isConfirmSuperior1={true}
                lastYearsAgoOverAllEvaluation={lastOverAllEvaluations && lastOverAllEvaluations[0] ? lastOverAllEvaluations[0] : null}
                twoYearsAgoOverAllEvaluation={lastOverAllEvaluations && lastOverAllEvaluations[1] ? lastOverAllEvaluations[1] : null}
                isConfirmSuperior2={true}
            />

        )
    } else {
        return null;
    }
}
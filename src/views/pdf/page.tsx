import { ErrorContext, UserContext } from "App";
import { getEmployee, getSheet, listSheetReviewee } from "graphql/queries";
import { SheetDao } from "lib/dao/sheetDao";
import React, { useContext, useEffect, useState } from "react";
import { PDFTemplete } from "./templete";
import * as APIt from 'API';
import { getStatusValue } from "lib/getStatusValue";
import { Section, Sheet } from "API";
import { EmployeeDao } from "lib/dao/employeeDao";

type Props = {
    match: {
        params: {
            sub: string
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
const sortCategory = function (a: Section | null, b: Section | null) {
    if (a?.sectionCategoryLocalId && b?.sectionCategoryLocalId && a.sectionCategoryLocalId > b.sectionCategoryLocalId) {
        return 1;
    } else {
        return -1;
    }
}

export function PDFPage(props:Props) {
    const currentUser = useContext(UserContext)
    const setError = useContext(ErrorContext)
    const [sheet, setSheet] = useState<Sheet | null>(null);
    const [lastOverAllEvaluations, setlastOverAllEvaluations] = useState<Array<number | null> | null>();
    const [secondReviewerName, setSecondReviewerName] = useState<string | null>(null);
    // const [topReviewerName, setTopReviewerName] = useState<string | null>(null);
    useEffect(() => {
        (async () => {
            const res = await SheetDao.get(getSheet, {
                sub: props.match.params.sub,
                year: parseInt(props.match.params.year)
            })
            
            if (res && currentUser && res.statusValue === 10 && res.revieweeUsername === currentUser.username) {
                res.overAllEvaluation = null;
            }

            res?.section?.items?.forEach((section) => {
                section?.objective?.items?.sort(sortObjective)
            })
            res?.section?.items?.sort(sortCategory)
            setSheet(res)
        })()
    }, [currentUser,props.match.params.sub, props.match.params.year])

    useEffect(() => {
        (async () => {
            // 前期と前々期を取得
            if (sheet) {
                if (sheet.year) {
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
                            setError("業績評価年度に重複があります。前期前々期の記録に想定されない値が格納される場合があります。")
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
                }else{
                    console.error("評価シートの年度情報を取得できませんでした", sheet)
                    setError("評価シートの年度情報を取得できませんでした")
                }
            }
        })()
    }, [sheet, setError])

    useEffect(() => {
        (async () => {
            // 所属長の氏名を取得
            if (sheet) {
                if (sheet.secondUsername) {
                    const getI: APIt.GetEmployeeQueryVariables = {
                        companyID: sheet.companyID,
                        username: sheet.secondUsername,
                    }
                    const getSecondReviewer = await EmployeeDao.get(getEmployee, getI);
                    if (getSecondReviewer) {
                        const secondReviewerName = `${getSecondReviewer.lastName} ${getSecondReviewer.firstName}`
                        setSecondReviewerName(secondReviewerName);
                    } else {
                        console.error("上司情報の取得に失敗しました", getSecondReviewer)
                        setError("上司情報の取得に失敗しました")
                    }
                }
            }

        })()
    }, [sheet, setError])

    if (sheet) {
        return (
            <PDFTemplete
                sheet={sheet}
                approvalStatusString={getStatusValue(sheet.statusValue || -1)}
                gradeString={`${sheet.grade}`}
                lastYearsAgoOverAllEvaluation={lastOverAllEvaluations && lastOverAllEvaluations[0] ? lastOverAllEvaluations[0] : null}
                twoYearsAgoOverAllEvaluation={lastOverAllEvaluations && lastOverAllEvaluations[1] ? lastOverAllEvaluations[1] : null}
                secondReviewerName={secondReviewerName}
            />
        )
    } else {
        return null;
    }
}
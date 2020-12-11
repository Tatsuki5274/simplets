import { Category, Section, Sheet } from "App";
import { getSheet } from "graphql/queries";
import { SheetDao } from "lib/dao/sheetDao";
import React, { useEffect, useState } from "react";
import { PDFTemplete } from "./templete";

type Props = {
    match: {
        params: {
            sheetId: string
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
    if (a?.category?.no && b?.category?.no && (a.category.no > b.category.no)) {
        return 1;
    } else {
        return -1;
    }}

export function PDFPage(props:Props) {
    const [sheet, setSheet] = useState<Sheet | null>(null);
    useEffect(() => {
        (async () => {
            const res = await SheetDao.get(getSheet, { id: props.match.params.sheetId})

            res?.section?.items?.forEach((section) => {
                section?.objective?.items?.sort(sortObjective)
            })
            res?.section?.items?.sort(sortCategory)
            setSheet(res)
        })()
    }, [])

    if (sheet) {

        return (
            <PDFTemplete
                sheet={sheet}
                approvalStatusString={"完了"}
                gradeString={"社員"}
                isConfirmReviewee={true}
                isConfirmSuperior1={true}
                lastYearsAgoOverAllEvaluation={5}
                twoYearsAgoOverAllEvaluation={2}
                isConfirmSuperior2={true}
            />

        )
    } else {
        return null;
    }
}
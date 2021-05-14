import React from "react"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import TableBodyCell from "views/components/atoms/TableBodyCell"
import TableHeaderCell from "views/components/atoms/TableHeaderCell"
import Text from "views/components/atoms/Text"

export type TableEvaluationListType = {
    // フィルターデータ
    data: {
        year: number
        groupId: string,    // 検索時の選択用
        groupNo: string,    // 順番制御用
        empNo: string,      // 順番制御用
        statusValue: number,
        // localId: string,
    }

    // 表示データ
    groupName: string
    name: string
    status: string
    overAllEvaluation: number | null
    lastYearsAgoOverAllEvaluation: number | null
    twoYearsAgoOverAllEvaluation: number | null
    preview: {
        label: string
        dest: string
    }
}

type Props = {
    data: (TableEvaluationListType | null)[] | null
    selectedYear: number | null
}


export default function (props:Props) {
    if(props.data && props.selectedYear){
        return (
            <Table bordered>
                <thead>
                    <tr>
                        <TableHeaderCell>部門</TableHeaderCell>
                        <TableHeaderCell>氏名</TableHeaderCell>
                        <TableHeaderCell>ステータス</TableHeaderCell>
                        <TableHeaderCell>{`今期評価(${props.selectedYear}年度)`}</TableHeaderCell>
                        <TableHeaderCell>{`前期評価(${props.selectedYear - 1}年度)`}</TableHeaderCell>
                        <TableHeaderCell>{`前々期評価(${props.selectedYear - 2}年度)`}</TableHeaderCell>
                        <TableHeaderCell>プレビュー</TableHeaderCell>
                    </tr>
                </thead>
                <tbody>
                        {props.data.map(evaluationList =>{
                            return (
                                <tr>
                                    <TableBodyCell>{evaluationList?.groupName || ""}</TableBodyCell>
                                    <TableBodyCell>{evaluationList?.name || ""}</TableBodyCell>
                                    <TableBodyCell>{evaluationList?.status || ""}</TableBodyCell>
                                    <TableBodyCell>{evaluationList?.overAllEvaluation ? String(evaluationList.overAllEvaluation) : "未評価"}</TableBodyCell>
                                    <TableBodyCell>{evaluationList?.lastYearsAgoOverAllEvaluation ? String(evaluationList.lastYearsAgoOverAllEvaluation) : "未評価"}</TableBodyCell>
                                    <TableBodyCell>{evaluationList?.twoYearsAgoOverAllEvaluation ? String(evaluationList.twoYearsAgoOverAllEvaluation) : "未評価"}</TableBodyCell>
                                    <TableBodyCell>
                                        {evaluationList?.preview.label === "プレビュー" ?
                                            <Link
                                                to={evaluationList?.preview.dest || ""}
                                                target="_blank"
                                            >
                                                {evaluationList?.preview.label || ""}
                                            </Link>
                                            : <Text>シートなし</Text>
                                        }
                                    </TableBodyCell>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
        )
    }
    return null
}
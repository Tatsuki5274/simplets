import React from "react"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import TableBodyCell from "views/components/molecules/TableBodyCell"
import TableHeaderCell from "views/components/molecules/TableHeaderCell"

export type TableEvaluationListType = {
    // フィルターデータ
    data: {
        year: number
        groupLocalId: string,
        statusValue: number,
        localId: string,
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
}


export default function (props:Props) {
    if(props.data){
        return (
            <Table bordered>
                <thead>
                    <tr>
                        <TableHeaderCell>部門</TableHeaderCell>
                        <TableHeaderCell>氏名</TableHeaderCell>
                        <TableHeaderCell>ステータス</TableHeaderCell>
                        <TableHeaderCell>今期評価</TableHeaderCell>
                        <TableHeaderCell>前期評価</TableHeaderCell>
                        <TableHeaderCell>前々期評価</TableHeaderCell>
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
                                        <Link to={evaluationList?.preview.dest || ""}>
                                            {evaluationList?.preview.label || ""}
                                        </Link>
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
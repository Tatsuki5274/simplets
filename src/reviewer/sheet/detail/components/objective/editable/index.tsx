import { Objective, Section } from "App";
import { tableHeaderStyle } from "common/globalStyle.module.scss";
import dateFormat from "dateformat";
import React from "react"
import { Table } from "react-bootstrap";
import style from '../common/style.module.scss';


type Props = {
    sections: Section[],
    handleChange: (e: React.ChangeEvent<any>)=> void,
}

export const ReviewerSheetDetailObjectiveEditable = (props: Props) => {
    return <div>
        {props.sections.map((section: Section) => {

        //項目明細情報の作成日を元に昇順へソート
        const objectiveItems = section?.objective?.items as Objective[];
        objectiveItems?.sort(function (a, b) {
            if (a.createdAt > b.createdAt) {
                return 1;
            } else {
                return -1;
            }
        });

        return (
            <div key={section.id}>
                <h4>{section.category?.name}</h4>
                <Table bordered className={style.ReviewerObjectiveTableView}>
                    <thead className={tableHeaderStyle}>
                        <tr>
                            <td>目標</td>
                            <td>実績</td>
                            <td>進捗率</td>
                            <td>優先順位</td>
                            <td>開始予定日</td>
                            <td>完了予定日</td>
                            <td>自己評価</td>
                            <td>最終評価</td>
                            <td>更新日時</td>
                        </tr>
                    </thead>
                    <tbody>
                        {objectiveItems.map((objective: Objective) => {
                            const date = new Date(objective.updatedAt);
                            var styleObjective: string;
                            if (objective.progress === 100) {
                                styleObjective = style.detailObjectiveProgressHigh;
                            } else if (objective.progress! >= 10 && objective.progress! < 100) {
                                styleObjective = style.detailObjectiveProgressMiddle;
                            } else {
                                styleObjective = "";
                            }
                            return (
                                <tr key={objective.id} className={styleObjective}>

                                    {/* 目標本文 */}
                                    <td>{objective.content}</td>

                                    {/* 実績 */}
                                    <td>{objective.result}</td>

                                    {/* 進捗率 */}
                                    <td>{objective.progress}</td>

                                    {/* 優先順位 */}
                                    <td>{objective.priority}</td>

                                    {/* 開始予定日 */}
                                    <td>{objective.expStartDate?.replace(/-/g, '/') || ""}</td>

                                    {/* 完了予定日 */}
                                    <td>{objective.expDoneDate?.replace(/-/g, '/') || ""}</td>

                                    {/* 自己評価 */}
                                    <td>{objective.selfEvaluation}</td>

                                    {/* 最終評価 */}
                                    <td className={style.detailSelect}>
                                        <select name="lastEvaluation" data-objective-id={objective.id} onChange={props.handleChange}>
                                            <option value=""></option>
                                            {[5, 4, 3, 2, 1].map((number: number) => {
                                                if (number === objective.lastEvaluation) {
                                                    return (
                                                        <option selected value={number}>{number}</option>
                                                    );

                                                } else {
                                                    return (
                                                        <option value={number}>{number}</option>
                                                    );
                                                }
                                            })}

                                        </select>
                                    </td>

                                    {/* 更新日時 */}
                                    <td>{dateFormat(date, "yyyy/mm/dd HH:MM")}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
        })}
    </div>
}
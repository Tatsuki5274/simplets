import { Objective } from "App";
import { inputFieldStyle } from "common/globalStyle.module.scss";
import dateFormat from "dateformat";
import React, { useContext } from "react"
import { Button } from "react-bootstrap";
import { SheetContext } from "reviewee/sheet/index";
import Style from '../../../indexStyle.module.scss';


type Props = {
    objective: Objective
}

export const RevieweeSheetObjectiveReadonly = (props: Props) => {

    const date = new Date(props.objective.updatedAt);
    var expDoneDateStyle: string; //完了予定日のクラス名
    var currentDate = new Date().getTime();
    var doneDate = new Date(props.objective.expDoneDate!).getTime();

    //完了予定日のスタイルの分岐
    if(doneDate < currentDate && doneDate !== 0) {
        expDoneDateStyle = Style.indexExpDoneDateExpired;
    } else if(doneDate >= currentDate) {
        expDoneDateStyle = Style.indexExpDoneDateInProgress;
    } else {
        expDoneDateStyle = "";
    }

    return (
        <tr>
            <td></td>
            <td>{props.objective.content}</td>
            <td>{props.objective.result}</td>
            <td>{props.objective.progress || "-"}</td>
            <td>{props.objective.priority}</td>
            <td>{props.objective.expStartDate?.replace(/-/g,'/')}</td>
            <td className={expDoneDateStyle}>{props.objective.expDoneDate?.replace(/-/g,'/')}</td>
            <td>{props.objective.selfEvaluation}</td>
            <td>{props.objective.lastEvaluation}</td>
            <td>{dateFormat(date, "yyyy/mm/dd HH:MM")}</td>
        </tr>
    )

}
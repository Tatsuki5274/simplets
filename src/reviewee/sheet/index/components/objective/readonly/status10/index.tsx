import { Objective } from "API";
import dateFormat from "dateformat";
import React from "react";
import Style from "../../../../indexStyle.module.scss";

type Props = {
  objective: Objective;
};

export const RevieweeSheetObjectiveReadonlyStatus10 = (
  props: Props
): JSX.Element => {
  const date = new Date(props.objective.updatedAt || ""); // unsafe
  let expDoneDateStyle: string; //完了予定日のクラス名
  const currentDate = new Date().getTime();
  const doneDate = props.objective.expDoneDate
    ? new Date(props.objective.expDoneDate).getTime()
    : null;

  //完了予定日のスタイルの分岐
  if (doneDate && doneDate < currentDate && doneDate !== 0) {
    expDoneDateStyle = Style.indexExpDoneDateExpired;
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
      <td>{props.objective.expStartDate?.replace(/-/g, "/")}</td>
      <td className={expDoneDateStyle}>
        {props.objective.expDoneDate?.replace(/-/g, "/")}
      </td>
      <td>{props.objective.selfEvaluation}</td>
      <td></td>
      <td>{dateFormat(date, "yyyy/mm/dd HH:MM")}</td>
    </tr>
  );
};

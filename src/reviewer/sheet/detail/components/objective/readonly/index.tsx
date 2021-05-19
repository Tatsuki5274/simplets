import { Section, Objective } from "API";
import { tableHeaderStyle } from "common/globalStyle.module.scss";
import dateFormat from "dateformat";
import React from "react";
import ScrollTable from "views/components/molecules/ScrollTable";
import style from "../common/style.module.scss";

type Props = {
  sections: Section[];
};

export const ReviewerSheetDetailObjectiveReadonly = (props: Props) => {
  return (
    <div>
      {props.sections.map((section: Section) => {
        //項目明細情報の作成日を元に昇順へソート
        const objectiveItems = section?.objective?.items as Objective[];
        objectiveItems?.sort(function (a, b) {
          if (a.createdAt && b.createdAt && a.createdAt > b.createdAt) {
            return 1;
          } else {
            return -1;
          }
        });

        return (
          <div key={section.id}>
            <h4>{section.sectionCategoryName}</h4>
            <ScrollTable>
              <thead className={`${tableHeaderStyle}`}>
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
                  const date = new Date(objective.updatedAt || ""); // unsafe
                  let styleObjective: string;
                  if (objective.progress === 100) {
                    styleObjective = style.detailObjectiveProgressHigh;
                  } else if (
                    typeof objective.progress === "number" &&
                    objective.progress >= 10 &&
                    objective.progress < 100
                  ) {
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
                      <td>
                        {objective.progress || objective.progress === 0
                          ? objective.progress
                          : "-"}
                        %
                      </td>

                      {/* 優先順位 */}
                      <td>{objective.priority}</td>

                      {/* 開始予定日 */}
                      <td>
                        {objective.expStartDate?.replace(/-/g, "/") || ""}
                      </td>

                      {/* 完了予定日 */}
                      <td>{objective.expDoneDate?.replace(/-/g, "/") || ""}</td>

                      {/* 自己評価 */}
                      <td>{objective.selfEvaluation}</td>

                      {/* 最終評価 */}
                      <td>{objective.lastEvaluation}</td>

                      {/* 更新日時 */}
                      <td>{dateFormat(date, "yyyy/mm/dd HH:MM")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </ScrollTable>
          </div>
        );
      })}
    </div>
  );
};

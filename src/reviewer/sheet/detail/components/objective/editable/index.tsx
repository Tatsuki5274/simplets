import { tableHeaderStyle } from "common/globalStyle.module.scss";
import dateFormat from "dateformat";
import React, { useContext } from "react";
import style from "../common/style.module.scss";
import * as APIt from "API";
import { ObjectiveDao } from "lib/dao/objectiveDao";
import { updateObjective } from "graphql/mutations";
import { Objective, Section } from "API";
import { ErrorContext } from "App";
import ScrollTable from "views/components/common/molecules/ScrollTable";

type Props = {
  sections: Section[];
  onChange: (e: React.ChangeEvent<HTMLElement>) => void;
};

export const ReviewerSheetDetailObjectiveEditable = (
  props: Props
): JSX.Element => {
  const setError = useContext(ErrorContext);

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
                      <td>{objective.progress}</td>

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
                      <td className={style.detailSelect}>
                        <select
                          name={`lastEvaluation[${objective.id}]`}
                          onChange={async (
                            event: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            props.onChange(event);
                            if (objective.createdAt && objective.id) {
                              const objectiveLastEvaluation = parseInt(
                                event.currentTarget.value
                              );
                              const updateI: APIt.UpdateObjectiveInput = {
                                // id: objectiveId,
                                createdAt: objective.createdAt,
                                id: objective.id,
                                lastEvaluation: objectiveLastEvaluation,
                              };
                              // const updatedObjective =
                              await ObjectiveDao.update(
                                updateObjective,
                                updateI
                              );
                            } else {
                              setError("変更対象の特定に失敗しました");
                            }
                          }}
                        >
                          <option value=""></option>
                          {[5, 4, 3, 2, 1].map((number: number) => {
                            if (number === objective.lastEvaluation) {
                              return (
                                <option selected value={number}>
                                  {number}
                                </option>
                              );
                            } else {
                              return <option value={number}>{number}</option>;
                            }
                          })}
                        </select>
                      </td>

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

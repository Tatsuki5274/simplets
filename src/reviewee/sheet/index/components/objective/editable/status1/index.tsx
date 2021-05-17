import { ErrorContext } from "App";
import { inputFieldStyle } from "common/globalStyle.module.scss";
import dateFormat from "dateformat";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import * as APIt from "API";
import { ObjectiveDao } from "lib/dao/objectiveDao";
import { deleteObjective, updateObjective } from "graphql/mutations";
import Style from "../../../../indexStyle.module.scss";
import { Objective } from "API";

type Props = {
  objective: Objective;
  handleOpenModal: () => void;
  setModalObjective: (objective: Objective) => void;
};

export const RevieweeSheetObjectiveEditableStatus1 = (props: Props) => {
  const setError = useContext(ErrorContext);
  const progress: string | undefined = props.objective.progress
    ? props.objective.progress.toString()
    : undefined;

  const date: Date | null = props.objective.updatedAt
    ? new Date(props.objective.updatedAt)
    : null;
  let expDoneDateStyle: string; //完了予定日のクラス名
  const currentDate = new Date().getTime();
  const doneDate = new Date(props.objective.expDoneDate!).getTime();

  const [objective, setObjective] = useState<Objective | null>(props.objective);

  //完了予定日のスタイルの分岐
  if (doneDate < currentDate && doneDate !== 0) {
    expDoneDateStyle = Style.indexExpDoneDateExpired;
  } else {
    expDoneDateStyle = "";
  }

  function HandleChange(event: any) {
    if (objective) {
      props.setModalObjective(objective);
    }

    props.handleOpenModal();
  }

  // Progress 更新
  async function handleChangeProgress(event: any) {
    const objectiveProgress = parseInt(event.currentTarget.value);

    if (objective && objectiveProgress >= 0 && objectiveProgress <= 100) {
      if (objective.id && objective.createdAt) {
        const updateI: APIt.UpdateObjectiveInput = {
          id: objective.id,
          createdAt: objective.createdAt,
          progress: objectiveProgress,
        };
        const updatedObjective = await ObjectiveDao.update(
          updateObjective,
          updateI
        );
        if (!updatedObjective) {
          console.error("更新に失敗しました");
          setError("更新に失敗しました");
        }
      } else {
        console.error("必要なデータの取得に失敗しました", objective);
        setError("必要なデータの取得に失敗しました");
      }
    }
  }

  //objectiveの削除
  async function handleDeleteObjective(event: any) {
    if (objective) {
      if (window.confirm("目標を削除しますか？")) {
        if (objective.id) {
          const deleteI: APIt.DeleteObjectiveInput = {
            id: objective.id,
          };
          const deletedObjective = await ObjectiveDao.delete(
            deleteObjective,
            deleteI
          );
          if (deletedObjective) {
            setObjective(null);
          }
          console.log("delete", deletedObjective);
        } else {
          console.error("必要なデータの取得に失敗しました", objective);
          setError("必要なデータの取得に失敗しました");
        }
      }
    }
  }

  if (objective) {
    return (
      <tr>
        <td>
          <Button variant="primary" onClick={HandleChange}>
            変更
          </Button>
        </td>
        <td>{objective.content}</td>
        <td>{objective.result}</td>
        <input
          name="progress"
          onChange={handleChangeProgress}
          defaultValue={progress}
          type="number"
          min="0"
          max="100"
          step="10"
          className={inputFieldStyle}
        />
        <td>{objective.priority}</td>
        <td>{objective.expStartDate?.replace(/-/g, "/")}</td>
        <td className={expDoneDateStyle}>
          {objective.expDoneDate?.replace(/-/g, "/")}
        </td>
        <td>{objective.selfEvaluation}</td>
        <td>{objective.lastEvaluation}</td>
        <td>{date ? dateFormat(date, "yyyy/mm/dd HH:MM") : ""}</td>
        <td>
          <Button
            variant="danger"
            onClick={handleDeleteObjective}
            data-objective-id={""}
          >
            削除
          </Button>
        </td>
      </tr>
    );
  } else {
    return null;
  }
};

import { Objective } from "App";
import { inputFieldStyle } from "common/globalStyle.module.scss";
import dateFormat from "dateformat";
import React, { useState } from "react"
import { Button } from "react-bootstrap";
import * as APIt from 'API';
import { ObjectiveDao } from "lib/dao/objectiveDao";
import { deleteObjective, updateObjective } from "graphql/mutations";
import Style from '../../../indexStyle.module.scss';

type Props = {
    objective: Objective,
    handleOpenModal: () => void,
    setModalObjective: (objective: Objective) => void
}

export const RevieweeSheetObjectiveEditable = (props: Props) => {
    const progress: string | undefined
        = props.objective.progress ?
        props.objective.progress.toString()
        : undefined
    
    const date = new Date(props.objective.updatedAt);
    var expDoneDateStyle: string; //完了予定日のクラス名
    var currentDate = new Date().getTime();
    var doneDate = new Date(props.objective.expDoneDate!).getTime();

    const [objective, setObjective] = useState<Objective | null>(props.objective)

    //完了予定日のスタイルの分岐
    if(doneDate < currentDate && doneDate !== 0) {
        expDoneDateStyle = Style.indexExpDoneDateExpired;
    } else {
        expDoneDateStyle = "";
    }

    function HandleChange(event: any) {
        if(objective){
            props.setModalObjective(objective)
        }

        props.handleOpenModal();

    }

    // Progress 更新
    async function handleChangeProgress(event: any) {
        const objectiveId = event.target.getAttribute('data-objective-id');
        const objectiveProgress = parseInt(event.currentTarget.value);

        if (objective && objectiveProgress >= 0 && objectiveProgress <= 100) {
            const updateI: APIt.UpdateObjectiveInput = {
                sectionKeys: objective.sectionKeys,
                createdAt: objective.createdAt,
                progress: objectiveProgress,
            };
            const updatedObjective = await ObjectiveDao.update(updateObjective, updateI)
            if(!updatedObjective){
                console.error("更新に失敗しました")
            }
        }
    }

    //objectiveの削除
    async function handleDeleteObjective(event: any) {
        if(objective){
            if(window.confirm("目標を削除しますか？")){    
                const deleteI: APIt.DeleteObjectiveInput = {
                    createdAt: objective.createdAt,
                    sectionKeys: objective.sectionKeys
                };
                const deletedObjective = await ObjectiveDao.delete(deleteObjective, deleteI)
                if(deletedObjective){
                    setObjective(null)
                }
    
        
                console.log("delete", deletedObjective)
            }

        }

    }

    if(objective){
        return (
            <tr>
                <td><Button variant="primary" data-objectiveId={""} onClick={HandleChange}>変更</Button></td>
                <td>{objective.content}</td>
                <td>{objective.result}</td>
                <input
                    name="progress"
                    onChange={handleChangeProgress}
                    data-objective-id={""}
                    placeholder={progress}
                    type="number"
                    min="0"
                    max="100"
                    step="10"
                    className={inputFieldStyle}
                />
                <td>{objective.priority}</td>
                <td>{objective.expStartDate?.replace(/-/g,'/')}</td>
                <td className={expDoneDateStyle}>{objective.expDoneDate?.replace(/-/g,'/')}</td>
                <td>{objective.selfEvaluation}</td>
                <td>{objective.lastEvaluation}</td>
                <td>{dateFormat(date, "yyyy/mm/dd HH:MM")}</td>
                <td>
                    <Button
                        variant="danger"
                        onClick={handleDeleteObjective}
                        data-objective-id={""}
                    >削除</Button>
                </td>
    
            </tr>
        )
    }else{
        return null
    }

}
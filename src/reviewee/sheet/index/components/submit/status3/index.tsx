import { ErrorContext, Sheet } from "App";
import { buttonComponentStyle } from "common/globalStyle.module.scss";
import { updateSheet } from "graphql/mutations";
import { SheetDao } from "lib/dao/sheetDao";
import { sendEmailMutation } from "lib/sendEmail";
import { Command, commandWorkFlow } from "lib/workflow";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { SheetContext } from "reviewee/sheet/index";

// 自己評価と実績が入力されていることを検証する
/**
 * 
 * @param sheet 検証対象のシート
 * @returns 検証成功: true, 検証失敗: false
 */
function validSheet(sheet: Sheet): boolean{
    let result = true
    sheet.section?.items?.forEach(section => {
        section?.objective?.items?.forEach(objective => {
            // 検証条件
            if(objective && (!(objective.selfEvaluation) || !(objective.result))){
                result = false  // 検証失敗判定
            }
        })
    })
    return result
}

export const SubmitButtonStatus3 = () => {
    const context = useContext(SheetContext);
    const setError = useContext(ErrorContext)
    const sheet = context.sheet
    const setSheet = context.setSheet

    if(sheet && setSheet){
        return (
            <div>
            <Button className={buttonComponentStyle}
                onClick={async () => {
                    if(validSheet(sheet)){
                        if (window.confirm("実績と自己評価を提出しますか？")) {
                            const work = commandWorkFlow(Command.REVIEWEE_INPUT_RESULT, sheet)
                            let updatedSheet = await SheetDao.update(updateSheet, {
                                companyID: sheet.companyID,
                                reviewee: sheet.reviewee,
                                year: sheet.year,
                                statusValue: sheet.statusValue
                            });

                            if (updatedSheet) {
                                setSheet({ ...(updatedSheet) })
                                if (work.mailObject) {
                                    sendEmailMutation(work.mailObject)
                                } else {
                                    setError("メールの作成に失敗しました")
                                    console.error("メールの作成に失敗しました")
                                }
                            } else {
                                setError("フォームデータの登録に失敗しました")
                                console.error("フォームデータの登録に失敗しました")
                            }
                        }
                    } else{
                        alert('自己評価と実績を全て入力してください');
                    }
                }}
            >
                評価提出
            </Button>
            <Button className={buttonComponentStyle}
                    onClick={async () => {
                        if (window.confirm("承認内容の引き戻しを行い、目標設定中のステータスに変更しますか？")) {
                            const work = commandWorkFlow(Command.REVIWEE_PULLBACK_APPROVAL, sheet)
                            let updatedSheet = await SheetDao.update(updateSheet, {
                                companyID: work.sheet.companyID,
                                reviewee: work.sheet.reviewee,
                                year: work.sheet.year,
                                statusValue: work.sheet.statusValue
                            });
                            if (updatedSheet) {
                                setSheet({ ...(updatedSheet) })
                                if (work.mailObject) {
                                    sendEmailMutation(work.mailObject)
                                } else {
                                    setError("メールの作成に失敗しました")
                                    console.error("メールの作成に失敗しました")
                                }
                            } else {
                                setError("フォームデータの登録に失敗しました")
                                console.error("フォームデータの登録に失敗しました")
                            }
                        }
                    }}
            >承認引き戻し</Button>
            </div>
        )
    }
    else{
        return null
    }
}
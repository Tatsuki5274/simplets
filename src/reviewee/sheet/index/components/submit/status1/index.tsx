import { ErrorContext } from "App";
import { updateSheet } from "graphql/mutations";
import { SheetDao } from "lib/dao/sheetDao";
import { sendEmailMutation } from "lib/sendEmail";
import { Command, commandWorkFlow } from "lib/workflow";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { SheetContext } from "reviewee/sheet/index";

export const SubmitButtonStatus1 = () => {
    const setError = useContext(ErrorContext)
    const context = useContext(SheetContext);
    const sheet = context.sheet
    const setSheet = context.setSheet

    if(sheet && setSheet){
        return (
            <Button
                onClick={async () => {
                    if (sheet.sub && sheet.year && sheet.id) {
                        if (window.confirm("目標を提出しますか？")) {
                            const work = commandWorkFlow(Command.REVIEWEE_SUBMIT, sheet)
                            let updatedSheet = await SheetDao.update(updateSheet, {
                                id: sheet.id,
                                sub: sheet.sub,
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
                    }else{
                        console.error("評価シートの特定に失敗しました")
                        setError("評価シートの特定に失敗しました")
                    }
                }}
            >
                所属長提出
            </Button> 
        )
    }
    else{
        return null
    }
}
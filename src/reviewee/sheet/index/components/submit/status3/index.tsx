import { buttonComponentStyle } from "common/globalStyle.module.scss";
import { updateSheet } from "graphql/mutations";
import { SheetDao } from "lib/dao/sheetDao";
import { sendEmailMutation } from "lib/sendEmail";
import { Command, commandWorkFlow } from "lib/workflow";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { SheetContext } from "reviewee/sheet/index";

export const SubmitButtonStatus3 = () => {
    const context = useContext(SheetContext);
    const sheet = context.sheet
    const setSheet = context.setSheet

    if(sheet && setSheet){
        return (
            <div>
            <Button className={buttonComponentStyle}
                onClick={async () => {
                    if (window.confirm("実績と自己評価を提出しますか？")) {
                        const work = commandWorkFlow(Command.REVIEWEE_INPUT_RESULT, sheet)
                        let updatedSheet = await SheetDao.update(updateSheet, {
                            id: sheet.id,
                            statusValue: sheet.statusValue
                        });

                        if (updatedSheet) {
                            setSheet({ ...(updatedSheet) })
                            if (work.mailObject) {
                                sendEmailMutation(work.mailObject)
                            } else {
                                console.error("メールの作成に失敗しました")
                            }
                        } else {
                            console.error("フォームデータの登録に失敗しました")
                        }
                    }
                }}
            >
                評価提出
            </Button>
            <Button className={buttonComponentStyle}
                    onClick={async () => {
                        if (window.confirm("目標内容の差し戻しを行いますか？")) {
                            const work = commandWorkFlow(Command.REVIEWEE_CHANGE_OBJECTIVE, sheet)
                            let updatedSheet = await SheetDao.update(updateSheet, {
                                id: sheet.id,
                                statusValue: sheet.statusValue
                            });
                            if (updatedSheet) {
                                setSheet({ ...(updatedSheet) })

                            } else {
                                console.error("フォームデータの登録に失敗しました")
                            }
                        }
                    }}
            >差し戻し</Button>
            </div>
        )
    }
    else{
        return null
    }
}
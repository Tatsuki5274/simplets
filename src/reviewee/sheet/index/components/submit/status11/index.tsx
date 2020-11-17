import { updateSheet } from "graphql/mutations";
import { SheetDao } from "lib/dao/sheetDao";
import { sendEmailMutation } from "lib/sendEmail";
import { Command, commandWorkFlow } from "lib/workflow";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { SheetContext } from "reviewee/sheet/index";

export const SubmitButtonStatus11 = () => {
    const context = useContext(SheetContext);
    const sheet = context.sheet
    const setSheet = context.setSheet

    if(sheet && setSheet){
        return (
            <Button
                onClick={async ()=>{
                    const work = commandWorkFlow(Command.REVIEWEE_CONFIRM_SCORE, sheet)
                    let updatedSheet = await SheetDao.update(updateSheet, {
                        id: sheet.id,
                        statusValue: sheet.statusValue
                    });
            
                    if(updatedSheet){
                        setSheet({...(updatedSheet)})
                        if(work.mailObject){
                            sendEmailMutation(work.mailObject)
                        }else{
                            console.error("メールの作成に失敗しました")
                        }
                    }else{
                        console.error("フォームデータの登録に失敗しました")
                    }
                }}
            >
                評価依頼
            </Button> 
        )
    }
    else{
        return null
    }
}
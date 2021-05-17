import { ErrorContext } from "App";
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
// function validSheet(sheet: Sheet): boolean{
//     let result = true
//     sheet.section?.items?.forEach(section => {
//         section?.objective?.items?.forEach(objective => {
//             // 検証条件
//             if(objective && (!(objective.selfEvaluation) || !(objective.result))){
//                 result = false  // 検証失敗判定
//             }
//         })
//     })
//     return result
// }

export const SubmitButtonStatus2 = () => {
  const context = useContext(SheetContext);
  const setError = useContext(ErrorContext);
  const sheet = context.sheet;
  const setSheet = context.setSheet;

  if (sheet && setSheet) {
    return (
      <Button
        className={buttonComponentStyle}
        onClick={async () => {
          if (sheet.sub && sheet.year && sheet.id) {
            if (window.confirm("目標提出の引き戻しを行いますか？")) {
              const work = commandWorkFlow(
                Command.REVIWEE_PULLBACK_SUBMIT,
                sheet
              );
              const updatedSheet = await SheetDao.update(updateSheet, {
                id: sheet.id,
                sub: sheet.sub,
                year: sheet.year,
                statusValue: work.sheet.statusValue,
              });
              console.log("workflow", work);
              if (updatedSheet) {
                setSheet({ ...updatedSheet });
                if (work.mailObject) {
                  sendEmailMutation(work.mailObject);
                } else {
                  setError("メールの作成に失敗しました");
                  console.error("メールの作成に失敗しました");
                }
              } else {
                setError("フォームデータの登録に失敗しました");
                console.error("フォームデータの登録に失敗しました");
              }
            }
          } else {
            console.error("評価シートの特定に失敗しました");
            setError("評価シートの特定に失敗しました");
          }
        }}
      >
        提出引き戻し
      </Button>
    );
  } else {
    return null;
  }
};

import { ErrorContext } from "App";
import { updateSheet } from "graphql/mutations";
import { formatAWSDate } from "lib/awsdate";
import { SheetDao } from "lib/dao/sheetDao";
import { sendEmailMutation } from "lib/sendEmail";
import { Command, commandWorkFlow } from "lib/workflow";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { SheetContext } from "reviewee/sheet/index";

export const SubmitButtonStatus11 = () => {
  const context = useContext(SheetContext);
  const setError = useContext(ErrorContext);
  const sheet = context.sheet;
  const setSheet = context.setSheet;

  if (sheet && setSheet) {
    return (
      <Button
        onClick={async () => {
          if (sheet.sub && sheet.year && sheet.id) {
            if (window.confirm("評価確認を完了しますか？")) {
              const work = commandWorkFlow(
                Command.REVIEWEE_CONFIRM_SCORE,
                sheet
              );
              const updatedSheet = await SheetDao.update(updateSheet, {
                id: sheet.id,
                sub: sheet.sub,
                year: sheet.year,
                statusValue: sheet.statusValue,
                selfCheckDate: formatAWSDate(new Date()),
              });

              if (updatedSheet) {
                setSheet({ ...updatedSheet });
                if (work.mailObject) {
                  sendEmailMutation(work.mailObject);
                } else {
                  setError("メールの作成に失敗しました");
                }
              } else {
                setError("フォームデータの登録に失敗しました");
              }
            }
          } else {
            setError("評価シートの特定に失敗しました");
          }
        }}
      >
        評価確認
      </Button>
    );
  } else {
    return null;
  }
};

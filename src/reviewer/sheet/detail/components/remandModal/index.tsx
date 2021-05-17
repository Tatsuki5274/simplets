import { ErrorContext } from "App";
import { Form, Formik } from "formik";
import { Command, commandWorkFlow } from "lib/workflow";
import React, { useContext } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { SheetContext } from "reviewer/sheet";
import * as APIt from "API";
import { updateObjective, updateSheet } from "graphql/mutations";
import { sendEmailMutation } from "lib/sendEmail";
import { Sheet } from "API";
import { SheetDao } from "lib/dao/sheetDao";
import { ObjectiveDao } from "lib/dao/objectiveDao";

/**
 *
 * @param isShow     モーダルウィンドウを開くかどうかを指定する
 * @param handleClose    モーダルウィンドウを閉じるための関数を指定する
 * @returns   void
 */
type Props = {
  isShow: boolean;
  handleClose: () => void;
};

export const RemandModal = (props: Props) => {
  const context = useContext(SheetContext);
  const setError = useContext(ErrorContext);
  const sheet = context.sheet;

  return (
    <div>
      <Modal show={props.isShow} onHide={props.handleClose}>
        <Formik
          initialValues={{ reason: "" }}
          onSubmit={async (values) => {
            if (sheet) {
              //ワークフローの実行
              let work;
              if (sheet.statusValue === 2) {
                work = commandWorkFlow(
                  Command.REMAND_FROM_SUBMIT,
                  sheet,
                  values.reason
                );
              } else if (sheet.statusValue === 10) {
                work = commandWorkFlow(
                  Command.REMAND_FROM_INPUT_RESULT,
                  sheet,
                  values.reason
                );
              } else {
                work = commandWorkFlow(
                  Command.REMAND_FROM_SUR1_CONFIRM,
                  sheet,
                  values.reason
                );
              }
              let updatedSheet: Sheet | null = null;

              //sheet更新処理
              if (work && sheet.id) {
                if (work.sheet.statusValue === 3) {
                  const updateI: APIt.UpdateSheetInput = {
                    id: sheet.id,
                    statusValue: work.sheet.statusValue,
                    overAllEvaluation: null,
                    secondComment: null,
                    secondCheckDate: null,
                  };
                  updatedSheet = await SheetDao.update(updateSheet, updateI);

                  sheet?.section?.items?.map((sec) => {
                    sec?.objective?.items?.map(async (obj) => {
                      if (obj && obj.id && obj.createdAt) {
                        const updateI: APIt.UpdateObjectiveInput = {
                          id: obj.id,
                          createdAt: obj?.createdAt,
                          lastEvaluation: null,
                        };
                        const updatedObjective = await ObjectiveDao.update(
                          updateObjective,
                          updateI
                        );
                        if (!updatedObjective) {
                          // Todo エラー出力の追加
                          // console.log("目標情報の更新に失敗しました");
                        }
                      }
                    });
                  });
                } else {
                  const updateI: APIt.UpdateSheetInput = {
                    id: sheet.id,
                    sub: sheet.sub,
                    year: sheet.year,
                    statusValue: work.sheet.statusValue,
                  };
                  updatedSheet = await SheetDao.update(updateSheet, updateI);
                }
              }

              //メール送信処理
              if (updatedSheet) {
                if (work.mailObject) {
                  sendEmailMutation(work.mailObject);
                } else {
                  setError("メールの作成に失敗しました");
                }
                // updatedSheet = await statusManager.exec(updatedSheet, "proceed");
                // setSheet({...updatedSheet});
              } else {
                setError("更新に失敗しました");
              }

              props.handleClose();
            } else {
              setError("SheetContexの参照がありませんでした");
            }
          }}
        >
          {(formik) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>目標差し戻し</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>差し戻しを行う場合はコメントを入力してください</div>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>理由</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    as="textarea"
                    name="reason"
                    onChange={formik.handleChange}
                  />
                </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                {/* <Button variant="primary" onClick={handleClose}> */}
                <Button variant="primary" type="submit">
                  差し戻し
                </Button>
                <Button variant="secondary" onClick={props.handleClose}>
                  キャンセル
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

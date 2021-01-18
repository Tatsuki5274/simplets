import { Sheet } from "App"
import { Form, Formik } from "formik"
import { Command, commandWorkFlow } from "lib/workflow"
import React, { useContext } from "react"
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap"
import { SheetContext } from "reviewer/sheet"
import * as APIt from 'API';
import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { updateSheet } from "graphql/mutations"
import { sendEmailMutation } from "lib/sendEmail"

/**
 * 
 * @param isShow     モーダルウィンドウを開くかどうかを指定する
 * @param handleClose    モーダルウィンドウを閉じるための関数を指定する
 * @returns   void
 */
type Props = {
    isShow: boolean,
    handleClose: () => void
}

export const RemandModal = (props: Props)=>{
    const context = useContext(SheetContext);
    const sheet = context.sheet

    return <div>
        <Modal show={props.isShow} onHide={props.handleClose}>
            <Formik
                initialValues={{ reason: "" }}
                onSubmit={async (values, actions) => {
                    if(sheet){
                        //ワークフローの実行
                        let work
                        if(sheet.statusValue === 2) {
                            work = commandWorkFlow(Command.REMAND_FROM_SUBMIT, sheet, values.reason)
                        } else {
                            work = commandWorkFlow(Command.REMAND_FROM_SUR1_CONFIRM, sheet, values.reason)
                        }
                        let updatedSheet: Sheet | null = null;

                        //sheet更新処理
                        const updateI: APIt.UpdateSheetInput = {
                            companyID: sheet.companyID,
                            reviewee: sheet.reviewee,
                            year: sheet.year,
                            statusValue: sheet.statusValue
                        };
                        const updateMV: APIt.UpdateSheetMutationVariables = {
                            input: updateI,
                        };
                        let updateR: GraphQLResult<APIt.UpdateSheetMutation> | null = null
                        try{
                          updateR = 
                            await API.graphql(graphqlOperation(updateSheet, updateMV)) as GraphQLResult<APIt.UpdateSheetMutation>;
                        }catch(e){
                          updateR = e
                          console.log("無視しているエラー", e)
                        }
                        if (updateR && updateR.data) {
                            const updateTM: APIt.UpdateSheetMutation = updateR.data;
                            if (updateTM.updateSheet) {
                            updatedSheet = updateTM.updateSheet;
                            }
                        }

                        //メール送信処理
                        if(updatedSheet){
                            if(work.mailObject){
                                sendEmailMutation(work.mailObject)
                            }else{
                                console.error("メールの作成に失敗しました")
                            }
                            // updatedSheet = await statusManager.exec(updatedSheet, "proceed");
                            // setSheet({...updatedSheet});
                        }else{
                            console.error("更新に失敗しました")
                        }

                        props.handleClose();
                    }else{
                        console.error("SheetContexの参照がありませんでした")
                    }
                }}
            >
                {formik => (
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
}
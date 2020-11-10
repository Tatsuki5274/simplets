import { Section, Sheet } from "App";
import ApprovalStatusBox from "common/approvalStatusBox";
import { Formik } from "formik";
import { SheetDao } from "lib/dao/sheet";
import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReviewerSheetDetailCareerEditable } from "../../components/career/editable";
import { ReviewerSheetDetailInterviewEditable } from "../../components/interview/editable";
import { ReviewerSheetDetailObjectiveEditable } from "../../components/objective/editable";
import { RemandModal } from "../../components/remandModal";
import { ReviewerSheetDetailYearlyEditableSecond } from "../../components/yearly/editable/second";
import * as statusManager from 'lib/statusManager'
import { updateSheet } from "graphql/mutations";
import { Command, commandWorkFlow } from "lib/workflow";
import { sendEmailMutation } from "lib/sendEmail";
import { UpdateSheetInput } from "API";
import { ReviewerSheetDetailCareerReadonly } from "../../components/career/readonly";
import { ReviewerSheetDetailInterviewReadonly } from "../../components/interview/readonly";
import { ReviewerSheetDetailObjectiveReadonly } from "../../components/objective/readonly";
import { ReviewerSheetDetailYearlyReadonly } from "../../components/yearly/readonly";
import { SheetContext } from "reviewer/sheet";

type Props = {
    sheet: Sheet,
    sections: Section[]

    handleUpdateObjective: (e: React.ChangeEvent<any>)=> void
}

export const ReviewerSheetPagesStatus2 = ()=>{
    const sheet = useContext(SheetContext);

    const [isRemandModal, setIsRemandModal] = useState<boolean>(false);
    const handleClose = () => setIsRemandModal(false);
    const handleShow = () => setIsRemandModal(true);


    if(sheet){
        return (
            <div>
                {/* モーダルウィンドウ 差し戻しコメント */}
                <RemandModal isShow={isRemandModal} handleClose={handleClose} />

                {/* 評価画面 */}
                <div>
                    <Container>
                        <Link to={`/reviewer/list`} >
                            <Button >戻る</Button>
                        </Link>
                        <ApprovalStatusBox statusValue={sheet && sheet.statusValue || -1}/>
                        <h3>今後のキャリア計画</h3><br />

                        <Formik
                            initialValues={{
                                // 入力項目空
                            }}
                            onSubmit={ async () => {
                                if(sheet){
                                    const work = commandWorkFlow(Command.SUP1_APPLOVAL, sheet)
                                    const data: UpdateSheetInput = {
                                        id: sheet.id,
                                        statusValue: work.sheet.statusValue
                                    }
                                    let updatedSheet = await SheetDao.update(updateSheet, data);
                                    
                        
                                    if(updatedSheet){
                                        if(work.mailObject){
                                            sendEmailMutation(work.mailObject)
                                            alert('承認が完了しました');
                                        }else{
                                            console.error("メールの作成に失敗しました")
                                        }
                                        // updatedSheet = await statusManager.exec(updatedSheet, "proceed");
                                        // setSheet({...updatedSheet});
                                    }else{
                                        console.error("フォームデータの登録に失敗しました")
                                    }
                                }else{
                                    console.error("sheetの読み込みに失敗しています")
                                }
                            }}
                        >
                        {formik => (
                                <form onSubmit={formik.handleSubmit}>
                                    <ReviewerSheetDetailCareerReadonly sheet={sheet}/>


                                    {/* インタビュー実施記録 */}
                                    <h4>インタビュー実施記録</h4>
                                    <ReviewerSheetDetailInterviewReadonly sheet={sheet} />

                                    {/* 年度評価 */}
                                    <h4>年度評価</h4>
                                    <ReviewerSheetDetailYearlyReadonly sheet={sheet}/>
                                    <Form>

                                        {/* ステータスによってボタンの出し分け */}
                                        <Form.Group>
                                            <Button type="submit">保存して承認</Button>
                                            <Button onClick={handleShow}>差し戻し</Button>
                            
                                        </Form.Group>
                                    </Form><br />

                                    {/* 目標コンポーネント */}
                                    {sheet && sheet.section && sheet.section.items ?
                                        <ReviewerSheetDetailObjectiveReadonly  sections={sheet.section.items as Section[]} /> 
                                    : null}
                                    

                                </form>
                            )}
                        </Formik>

                    </Container>
                </div>

            </div>
        );
    }else{
        console.error("シートが存在しません")
        return null
    }
}
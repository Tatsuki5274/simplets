import { Section, Sheet } from "App";
import ApprovalStatusBox from "common/approvalStatusBox";
import { Formik } from "formik";
import { SheetDao } from "lib/dao/sheet";
import React, { useState } from "react";
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

type Props = {
    sheet: Sheet,
    sections: Section[]

    handleUpdateObjective: (e: React.ChangeEvent<any>)=> void
}

export const ReviewerSheetPagesStatus2 = (props: Props)=>{
    const [isRemandModal, setIsRemandModal] = useState<boolean>(false);
    const handleClose = () => setIsRemandModal(false);
    const handleShow = () => setIsRemandModal(true);

    const onSubmit = async (values: Sheet) => {
        console.log("onSubmit", values)
        if(props.sheet){
            const work = commandWorkFlow(Command.SUP1_APPLOVAL, props.sheet)
            let updatedSheet = await SheetDao.update(updateSheet, values);

            if(updatedSheet){
                if(work.mailObject){
                    sendEmailMutation(work.mailObject)
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
    }
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
                    <ApprovalStatusBox statusValue={props.sheet.statusValue || -1}/>
                    <h3>今後のキャリア計画</h3><br />

                    <Formik
                        initialValues={{
                            id: props.sheet.id,
                            careerPlanComment: props.sheet.careerPlanComment,
                            firstComment: props.sheet.firstComment,
                            secondComment: props.sheet.secondComment,
                            overAllEvaluation: props.sheet.overAllEvaluation,
                            interviewPlanComment: props.sheet.interviewPlanComment,
                            interviewPlanDate: props.sheet.interviewPlanDate,
                            InterviewMid1Comment: props.sheet.InterviewMid1Comment,
                            InterviewMid1Date: props.sheet.InterviewMid1Date,
                            InterviewMid2Comment: props.sheet.InterviewMid2Comment,
                            InterviewMid2Date: props.sheet.InterviewMid2Date,
                            InterviewMid3Comment: props.sheet.InterviewMid3Comment,
                            InterviewMid3Date: props.sheet.InterviewMid3Date,
                        } as Sheet}
                        onSubmit={onSubmit}
                    >
                       {formik => (
                            <form onSubmit={formik.handleSubmit}>
                                <ReviewerSheetDetailCareerEditable sheet={props.sheet} handleChange={formik.handleChange}/>


                                {/* インタビュー実施記録 */}
                                <h4>インタビュー実施記録</h4>
                                <ReviewerSheetDetailInterviewEditable sheet={props.sheet} handleChange={formik.handleChange} />

                                {/* 年度評価 */}
                                <h4>年度評価</h4>
                                <ReviewerSheetDetailYearlyEditableSecond sheet={props.sheet} handleChange={formik.handleChange} />
                                <Form>

                                    {/* ステータスによってボタンの出し分け */}
                                    <Form.Group>
                                        <Button onClick={async ()=>{
                                            const updatedSheet = await SheetDao.update(updateSheet ,formik.values)

                                            // const updatedSheet = runUpdateSheet(props.values);
                                            if(updatedSheet){
                                                console.log("保存成功")
                                            }else{
                                                console.error("保存失敗", updatedSheet)
                                            }
                                        }}>保存</Button>

                                        <Button type="submit">保存して承認</Button>
                                        <Button onClick={handleShow}>差し戻し</Button>
                        
                                    </Form.Group>
                                </Form><br />

                                {/* 目標コンポーネント */}
                                <ReviewerSheetDetailObjectiveEditable handleChange={props.handleUpdateObjective} sections={props.sections} />

                            </form>
                        )}
                    </Formik>

                </Container>
            </div>

        </div>
    );
}
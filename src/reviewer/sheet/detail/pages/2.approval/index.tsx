import { Section } from "App";
import ApprovalStatusBox from "common/approvalStatusBox";
import { Formik } from "formik";
import { SheetDao } from "lib/dao/sheetDao";
import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RemandModal } from "../../components/remandModal";
import { updateSheet } from "graphql/mutations";
import { Command, commandWorkFlow } from "lib/workflow";
import { sendEmailMutation } from "lib/sendEmail";
import { UpdateSheetInput } from "API";
import { ReviewerSheetDetailObjectiveReadonly } from "../../components/objective/readonly";
import { ReviewerSheetDetailYearlyReadonly } from "../../components/yearly/readonly";
import { SheetContext } from "reviewer/sheet";
import { ReviewerSheetDetailCareerEditable } from "../../components/career/editable";
import { ReviewerSheetDetailInterviewEditable } from "../../components/interview/editable";
import { buttonComponentStyle } from "common/globalStyle.module.scss";

// type Props = {
//     sheet: Sheet,
//     sections: Section[]

//     handleUpdateObjective: (e: React.ChangeEvent<any>)=> void
// }

export const ReviewerSheetPagesStatus2 = ()=>{
    const context = useContext(SheetContext);
    const sheet = context.sheet
    const setSheet = context.setSheet

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
                        <ApprovalStatusBox statusValue={sheet && (sheet.statusValue || -1)}/>

                        <Formik
                            initialValues={{
                                careerPlanComment: sheet.careerPlanComment,
                                interviewPlanComment: sheet.interviewPlanComment,
                                interviewPlanDate: sheet.interviewPlanDate,
                                InterviewMid1Comment: sheet.InterviewMid1Comment,
                                InterviewMid1Date: sheet.InterviewMid1Date,
                                InterviewMid2Comment: sheet.InterviewMid2Comment,
                                InterviewMid2Date: sheet.InterviewMid2Date,
                                InterviewMid3Comment: sheet.InterviewMid3Comment,
                                InterviewMid3Date: sheet.InterviewMid3Date,
                            }}
                            onSubmit={ async (values) => {
                                if(sheet){
                                    if(window.confirm("総合評価が社員に通知されます。よろしいでしょうか")){
                                        const work = commandWorkFlow(Command.SUP1_APPLOVAL, sheet)
                                        const data: UpdateSheetInput = {
                                            companyID: sheet.companyID,
                                            reviewee: sheet.reviewee,
                                            year: sheet.year,
                                            statusValue: work.sheet.statusValue,
                                            careerPlanComment: values.careerPlanComment,
                                        }
                                        let updatedSheet = await SheetDao.update(updateSheet, data);
                                        
                            
                                        if(updatedSheet){
                                            if(work.mailObject){
                                                sendEmailMutation(work.mailObject)
                                            }else{
                                                console.error("メールの作成に失敗しました")
                                            }
                                            if(setSheet){
                                                setSheet({...updatedSheet})
                                            }
                                            // updatedSheet = await statusManager.exec(updatedSheet, "proceed");
                                            // setSheet({...updatedSheet});
                                        }else{
                                            console.error("フォームデータの登録に失敗しました")
                                        }
                                    }

                                }else{
                                    console.error("sheetの読み込みに失敗しています")
                                }
                            }}
                        >
                        {formik => (
                                <form onSubmit={formik.handleSubmit}>
                                    {/* 目標コンポーネント */}
                                    {sheet && sheet.section && sheet.section.items ?
                                        <ReviewerSheetDetailObjectiveReadonly  sections={sheet.section.items as Section[]} /> 
                                    : null}

                                    <h3>今後のキャリア計画</h3><br />
                                    <ReviewerSheetDetailCareerEditable sheet={sheet} handleChange={formik.handleChange} />


                                    {/* インタビュー実施記録 */}
                                    <h4>インタビュー実施記録</h4>
                                    <ReviewerSheetDetailInterviewEditable sheet={sheet} handleChange={formik.handleChange}/>

                                    {/* 年度評価 */}
                                    <h4>年度評価</h4>
                                    <ReviewerSheetDetailYearlyReadonly sheet={sheet}/>
                                    <Form>

                                        {/* ステータスによってボタンの出し分け */}
                                        <Form.Group>
                                            <Button className={buttonComponentStyle} onClick={async () => {
                                                const data: UpdateSheetInput = {
                                                    companyID: sheet.companyID,
                                                    reviewee: sheet.reviewee,
                                                    year: sheet.year,
                                                    careerPlanComment: formik.values.careerPlanComment,
                                                    interviewPlanComment: formik.values.interviewPlanComment,
                                                    interviewPlanDate: formik.values.interviewPlanDate,
                                                    InterviewMid1Comment: formik.values.InterviewMid1Comment,
                                                    InterviewMid1Date: formik.values.InterviewMid1Date,
                                                    InterviewMid2Comment: formik.values.InterviewMid2Comment,
                                                    InterviewMid2Date: formik.values.InterviewMid2Date,
                                                    InterviewMid3Comment: formik.values.InterviewMid3Comment,
                                                    InterviewMid3Date: formik.values.InterviewMid3Date,
                                                }
                                                const updatedSheet = await SheetDao.update(updateSheet, data);

                                                // const updatedSheet = runUpdateSheet(props.values);
                                                if (updatedSheet) {
                                                    console.log("保存成功", updatedSheet)
                                                } else {
                                                    console.error("保存失敗", updatedSheet)
                                                }
                                            }}>保存</Button>
                                            
                                            <Button type="submit" className={buttonComponentStyle}>総合評価確定</Button>
                                            <Button onClick={handleShow} className={buttonComponentStyle}>差し戻し</Button>
                            
                                        </Form.Group>
                                    </Form><br />                                    

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
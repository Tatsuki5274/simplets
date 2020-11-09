import { Section, Sheet } from "App";
import ApprovalStatusBox from "common/approvalStatusBox";
import { Formik } from "formik";
import { updateSheet } from "graphql/mutations";
import { SheetDao } from "lib/dao/sheet";
import React, { useState } from "react"
import { Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReviewerSheetDetailCareerReadonly } from "../../components/career/readonly";
import { ReviewerSheetDetailInterviewEditable } from "../../components/interview/editable";
import { ReviewerSheetDetailObjectiveReadonly } from "../../components/objective/readonly";
import { RemandModal } from "../../components/remandModal";
import { ReviewerSheetDetailYearlyReadonly } from "../../components/yearly/readonly";

type Props = {
    sheet: Sheet,
    sections: Section[]

    handleUpdateObjective: (e: React.ChangeEvent<any>) => void
}

export const ReviewerSheetPagesStatus3 = (props: Props) => {
    const [isRemandModal, setIsRemandModal] = useState<boolean>(false);
    const handleClose = () => setIsRemandModal(false);
    const handleShow = () => setIsRemandModal(true);

    const onSubmit = async (values: Sheet) => {
        const updatedSheet = await SheetDao.update(updateSheet, values)

        // const updatedSheet = runUpdateSheet(props.values);
        if (updatedSheet) {
            console.log("保存成功")
        } else {
            console.error("保存失敗", updatedSheet)
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
                    <ApprovalStatusBox statusValue={props.sheet.statusValue || -1} />
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
                        onSubmit={async (values, actions) => {
                        onSubmit(values)
                        }}
                    >
                        {formik => (
                            <form onSubmit={formik.handleSubmit}>
                                <ReviewerSheetDetailCareerReadonly sheet={props.sheet} />


                                {/* インタビュー実施記録 */}
                                <h4>インタビュー実施記録</h4>
                                <ReviewerSheetDetailInterviewEditable sheet={props.sheet} handleChange={formik.handleChange} />

                                {/* 年度評価 */}
                                <h4>年度評価</h4>
                                <ReviewerSheetDetailYearlyReadonly sheet={props.sheet} />
                                <Form>

                                    {/* ステータスによってボタンの出し分け */}
                                    <Form.Group>
                                        <Button type="submit">保存</Button>

                                        <Button onClick={handleShow}>差し戻し</Button>

                                    </Form.Group>
                                </Form><br />

                                {/* 目標コンポーネント */}
                                <ReviewerSheetDetailObjectiveReadonly sections={props.sections} />

                            </form>
                        )}
                    </Formik>

                </Container>
            </div>

        </div>
    );
}
import { Section, Sheet, UpdateSheetInput } from "API";
import { ErrorContext } from "App";
import ApprovalStatusBox from "common/approvalStatusBox";
import { buttonComponentStyle } from "common/globalStyle.module.scss";
import { Formik } from "formik";
import { updateSheet } from "graphql/mutations";
import { SheetDao } from "lib/dao/sheetDao";
import React, { useContext, useState } from "react"
import { Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReviewerSheetDetailCareerEditable } from "../../components/career/editable";
import { ReviewerSheetDetailInterviewEditable } from "../../components/interview/editable";
import { ReviewerSheetDetailObjectiveReadonly } from "../../components/objective/readonly";
import { RemandModal } from "../../components/remandModal";
import { ReviewerSheetDetailYearlyReadonly } from "../../components/yearly/readonly";

type Props = {
    sheet: Sheet,
    sections: Section[]
}

export const ReviewerSheetPagesStatus3 = (props: Props) => {
    const setError = useContext(ErrorContext)
    const [isRemandModal, setIsRemandModal] = useState<boolean>(false);
    const handleClose = () => setIsRemandModal(false);
    const handleShow = () => setIsRemandModal(true);

    const onSubmit = async (values: Sheet) => {
        const data: UpdateSheetInput = {
            companyID: props.sheet.companyID || "", // unsafe
            reviewee: props.sheet.reviewee || "",   // unsafe
            year: props.sheet.year || 0,    // unsafe
            careerPlanComment: values.careerPlanComment,
            interviewPlanComment: values.interviewPlanComment,
            interviewPlanDate: values.interviewPlanDate,
            InterviewMid1Comment: values.InterviewMid1Comment,
            InterviewMid1Date: values.InterviewMid1Date,
            InterviewMid2Comment: values.InterviewMid2Comment,
            InterviewMid2Date: values.InterviewMid2Date,
            InterviewMid3Comment: values.InterviewMid3Comment,
            InterviewMid3Date: values.InterviewMid3Date,
        }
        const updatedSheet = await SheetDao.update(updateSheet, data)

        // const updatedSheet = runUpdateSheet(props.values);
        if (updatedSheet) {
            console.log("保存成功")
        } else {
            setError("保存失敗")
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

                    <Formik
                        initialValues={{
                            careerPlanComment: props.sheet.careerPlanComment,
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
                                {/* 目標コンポーネント */}
                                <ReviewerSheetDetailObjectiveReadonly sections={props.sections} />

                                <h3>今後のキャリア計画</h3><br />
                                <ReviewerSheetDetailCareerEditable sheet={props.sheet} handleChange={formik.handleChange}/>


                                {/* インタビュー実施記録 */}
                                <h4>インタビュー実施記録</h4>
                                <ReviewerSheetDetailInterviewEditable sheet={props.sheet} handleChange={formik.handleChange} />

                                {/* 年度評価 */}
                                <h4>年度評価</h4>
                                <ReviewerSheetDetailYearlyReadonly sheet={props.sheet} />
                                <Form>

                                    {/* ステータスによってボタンの出し分け */}
                                    <Form.Group>
                                        <Button type="submit" className={buttonComponentStyle}>保存</Button>

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
}
import { UpdateSheetInput } from "API";
import { Section, Sheet } from "App";
import ApprovalStatusBox from "common/approvalStatusBox";
import { Formik } from "formik";
import { updateSheet } from "graphql/mutations";
import { formatAWSDate } from "lib/awsdate";
import { SheetDao } from "lib/dao/sheetDao";
import { sendEmailMutation } from "lib/sendEmail";
import { commandWorkFlow, Command } from "lib/workflow";
import React, { useContext, useState } from "react"
import { Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SheetContext } from "reviewer/sheet";
import { ReviewerSheetDetailCareerReadonly } from "../../components/career/readonly";
import { ReviewerSheetDetailInterviewReadonly } from "../../components/interview/readonly";
import { ReviewerSheetDetailObjectiveEditable } from "../../components/objective/editable";
import { RemandModal } from "../../components/remandModal";
import { ReviewerSheetDetailYearlyEditableSecond } from "../../components/yearly/editable/second";

type Props = {
    //sheet: Sheet,
    sections: Section[]

    handleUpdateObjective: (e: React.ChangeEvent<any>) => void
}

export const ReviewerSheetPagesStatus10 = (props: Props) => {
    const context = useContext(SheetContext);
    const sheet = context.sheet
    const setSheet = context.setSheet

    const [isRemandModal, setIsRemandModal] = useState<boolean>(false);
    const handleClose = () => setIsRemandModal(false);
    const handleShow = () => setIsRemandModal(true);


    if (sheet) {
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
                        <ApprovalStatusBox statusValue={sheet && (sheet.statusValue || -1)} />
                        <h3>今後のキャリア計画</h3><br />

                        <Formik
                            initialValues={{
                                secondComment: sheet.secondComment,
                                overAllEvaluation: sheet.overAllEvaluation
                            }}
                            onSubmit={async (values) => {
                                if (sheet) {
                                    if (window.confirm("承認しますか？")) {

                                        let isInputAllObjectiveEvaluation = true
                                        sheet.section?.items?.forEach(section => {
                                            section?.objective?.items?.forEach(objective => {
                                                if (!objective?.lastEvaluation) {
                                                    isInputAllObjectiveEvaluation = false
                                                }
                                            })
                                        })
                                        if (isInputAllObjectiveEvaluation) {
                                            //評価が入力済み

                                            const work = commandWorkFlow(Command.SUP1_INPUT_SCORE, sheet)
                                            const data: UpdateSheetInput = {
                                                id: sheet.id,
                                                secondComment: values.secondComment,
                                                secondCheckDate: formatAWSDate(new Date()),
                                                statusValue: work.sheet.statusValue,
                                                overAllEvaluation: work.sheet.overAllEvaluation
                                            }
                                            let updatedSheet = await SheetDao.update(updateSheet, data);
                                            console.log("10updated", updatedSheet)


                                            if (updatedSheet) {
                                                if (work.mailObject) {
                                                    sendEmailMutation(work.mailObject)
                                                    alert('承認が完了しました');
                                                } else {
                                                    console.error("メールの作成に失敗しました")
                                                }
                                                if (setSheet) {
                                                    setSheet({ ...updatedSheet })
                                                }
                                            } else {
                                                console.error("フォームデータの登録に失敗しました")
                                            }
                                        } else {
                                            alert("評価をすべて入力してください")
                                        }
                                    } else {
                                        console.error("sheetの読み込みに失敗しています")
                                    }
                                }
                            }}
                        >
                            {formik => (
                                <form onSubmit={formik.handleSubmit}>
                                    <ReviewerSheetDetailCareerReadonly sheet={sheet} />


                                    {/* インタビュー実施記録 */}
                                    <h4>インタビュー実施記録</h4>
                                    <ReviewerSheetDetailInterviewReadonly sheet={sheet} />

                                    {/* 年度評価 */}
                                    <h4>年度評価</h4>
                                    <ReviewerSheetDetailYearlyEditableSecond sheet={sheet} handleChange={formik.handleChange} />
                                    <Form>

                                        {/* ステータスによってボタンの出し分け */}
                                        <Form.Group>
                                            <Button onClick={async () => {
                                                const data: UpdateSheetInput = {
                                                    id: sheet.id,
                                                    secondComment: formik.values.secondComment,
                                                    secondCheckDate: formatAWSDate(new Date()),
                                                    overAllEvaluation: formik.values.overAllEvaluation
                                                }
                                                const updatedSheet = await SheetDao.update(updateSheet, data);

                                                // const updatedSheet = runUpdateSheet(props.values);
                                                if (updatedSheet) {
                                                    console.log("保存成功", updatedSheet)
                                                } else {
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
    } else {
        console.error("シートが存在しません")
        return null
    }
}
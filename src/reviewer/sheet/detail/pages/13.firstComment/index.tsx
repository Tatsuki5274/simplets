import { UpdateSheetInput } from "API";
import { Section } from "App";
import ApprovalStatusBox from "common/approvalStatusBox";
import { Formik } from "formik";
import { updateSheet } from "graphql/mutations";
import { formatAWSDate } from "lib/awsdate";
import { SheetDao } from "lib/dao/sheetDao";
import { sendEmailMutation } from "lib/sendEmail";
import { commandWorkFlow, Command } from "lib/workflow";
import React, { useContext } from "react"
import { Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SheetContext } from "reviewer/sheet";
import { ReviewerSheetDetailCareerReadonly } from "../../components/career/readonly";
import { ReviewerSheetDetailInterviewReadonly } from "../../components/interview/readonly";
import { ReviewerSheetDetailObjectiveReadonly } from "../../components/objective/readonly";
import { ReviewerSheetDetailYearlyEditableTop } from "../../components/yearly/editable/top";


export const ReviewerSheetPagesStatus13 = () => {
    const sheet = useContext(SheetContext);

    if (sheet) {
        return (
            <div>

                {/* 評価画面 */}
                <div>
                    <Container>
                        <Link to={`/reviewer/list`} >
                            <Button >戻る</Button>
                        </Link>
                        <ApprovalStatusBox statusValue={sheet && sheet.statusValue || -1} />
                        <h3>今後のキャリア計画</h3><br />

                        <Formik
                            initialValues={{
                                firstComment: sheet.firstComment,
                            }}
                            onSubmit={async (values) => {
                                if (sheet) {
                                    const work = commandWorkFlow(Command.SUP2_DONE, sheet)
                                    const data: UpdateSheetInput = {
                                        id: sheet.id,
                                        statusValue: work.sheet.statusValue,
                                        firstComment: values.firstComment,
                                        firstCheckDate: formatAWSDate(new Date()),
                                    }
                                    let updatedSheet = await SheetDao.update(updateSheet, data);


                                    if (updatedSheet) {
                                        if (work.mailObject) {
                                            sendEmailMutation(work.mailObject)
                                            alert('承認が完了しました');
                                        } else {
                                            console.error("メールの作成に失敗しました")
                                        }
                                        // updatedSheet = await statusManager.exec(updatedSheet, "proceed");
                                        // setSheet({...updatedSheet});
                                    } else {
                                        console.error("フォームデータの登録に失敗しました")
                                    }
                                } else {
                                    console.error("sheetの読み込みに失敗しています")
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
                                    <ReviewerSheetDetailYearlyEditableTop sheet={sheet} handleChange={formik.handleChange} />
                                    <Form>

                                        {/* ステータスによってボタンの出し分け */}
                                        <Form.Group>
                                            <Button onClick={async () => {
                                                const formikData: UpdateSheetInput = {
                                                    id: sheet.id,
                                                    firstComment: formik.values.firstComment,
                                                    firstCheckDate: formatAWSDate(new Date()),
                                                }
                                                const updatedSheet = await SheetDao.update(updateSheet, formikData)

                                                // const updatedSheet = runUpdateSheet(props.values);
                                                if (updatedSheet) {
                                                    console.log("保存成功")
                                                } else {
                                                    console.error("保存失敗", updatedSheet)
                                                }
                                            }}>保存</Button>

                                            <Button type="submit">最終承認</Button>

                                        </Form.Group>
                                    </Form><br />

                                    {/* 目標コンポーネント */}
                                    {sheet && sheet.section && sheet.section.items ?
                                        <ReviewerSheetDetailObjectiveReadonly sections={sheet.section.items as Section[]} />
                                        : null}

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
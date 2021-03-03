import { Section, UpdateSheetInput } from "API";
import { ErrorContext } from "App";
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
import * as Yup from 'yup';
import { buttonComponentStyle } from "common/globalStyle.module.scss";
import { routeBuilder } from "router";


export const ReviewerSheetPagesStatus13 = () => {
    const setError = useContext(ErrorContext)
    const context = useContext(SheetContext);
    const sheet = context.sheet
    const setSheet = context.setSheet

    if (sheet) {
        return (
            <div>

                {/* 評価画面 */}
                <div>
                    <Container>
                        <Link to={routeBuilder.reviewerListPath()} >
                            <Button >戻る</Button>
                        </Link>
                        <ApprovalStatusBox statusValue={sheet && (sheet.statusValue || -1)} />

                        <Formik
                            initialValues={{
                                firstComment: sheet.firstComment,
                            }}
                            validationSchema={Yup.object({
                                firstComment: Yup.string().typeError('コメントを入力してください').required('コメントを入力してください'),
                            })}
                            onSubmit={async (values) => {
                                if (sheet && sheet.sub && sheet.year) {
                                    if (window.confirm("最終承認を行いますか？")) {
                                        const work = commandWorkFlow(Command.SUP2_DONE, sheet)
                                        const data: UpdateSheetInput = {
                                            sub: sheet.sub,
                                            year: sheet.year,
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
                                                setError("メールの作成に失敗しました")
                                                console.error("メールの作成に失敗しました")
                                            }
                                            if (setSheet) {
                                                setSheet({ ...updatedSheet })
                                            }
                                        } else {
                                            setError("フォームデータの登録に失敗しました")
                                            console.error("フォームデータの登録に失敗しました")
                                        }
                                    }
                                } else {
                                    setError("sheetの読み込みに失敗しています")
                                    console.error("sheetの読み込みに失敗しています")
                                }
                            }}
                        >
                            {formik => (
                                <form onSubmit={formik.handleSubmit}>
                                    {/* 目標コンポーネント */}
                                    {sheet && sheet.section && sheet.section.items ?
                                        <ReviewerSheetDetailObjectiveReadonly sections={sheet.section.items as Section[]} />
                                        : null}
                                        
                                    <h3>今後のキャリア計画</h3><br />
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
                                            <Button className={buttonComponentStyle} onClick={async () => {
                                                if(sheet.year && sheet.sub){
                                                    const formikData: UpdateSheetInput = {
                                                        sub: sheet.sub,
                                                        year: sheet.year,
                                                        firstComment: formik.values.firstComment,
                                                        firstCheckDate: formatAWSDate(new Date()),
                                                    }
                                                    const updatedSheet = await SheetDao.update(updateSheet, formikData)
    
                                                    // const updatedSheet = runUpdateSheet(props.values);
                                                    if (updatedSheet) {
                                                        console.log("保存成功")
                                                    } else {
                                                        setError("保存失敗")
                                                        console.error("保存失敗", updatedSheet)
                                                    }
                                                }
                                 
                                            }}>保存</Button>

                                            <Button type="submit" className={buttonComponentStyle}>最終承認</Button>

                                        </Form.Group>
                                    </Form><br />

                                </form>
                            )}
                        </Formik>

                    </Container>
                </div>

            </div>
        );
    } else {
        setError("シートが存在しません")
        console.error("シートが存在しません")
        return null
    }
}
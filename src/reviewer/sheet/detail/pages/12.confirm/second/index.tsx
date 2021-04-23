import { Section, UpdateSheetInput } from "API";
import { ErrorContext } from "App";
import ApprovalStatusBox from "common/approvalStatusBox";
import { buttonComponentStyle } from "common/globalStyle.module.scss";
import { Formik } from "formik";
import { updateSheet } from "graphql/mutations";
import { SheetDao } from "lib/dao/sheetDao";
import { sendEmailMutation } from "lib/sendEmail";
import { commandWorkFlow, Command } from "lib/workflow";
import React, { useContext } from "react"
import { Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SheetContext } from "reviewer/sheet";
import { routeBuilder } from "router";
import { ReviewerSheetDetailCareerReadonly } from "../../../components/career/readonly";
import { ReviewerSheetDetailInterviewReadonly } from "../../../components/interview/readonly";
import { ReviewerSheetDetailObjectiveReadonly } from "../../../components/objective/readonly";
import { ReviewerSheetDetailYearlyReadonly } from "../../../components/yearly/readonly";

// type Props = {
//     sheet: Sheet,
//     sections: Section[]
// }

export const ReviewerSheetPagesStatus12Second = () => {
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

                            }}
                            onSubmit={async () => {
                                if (sheet && sheet.sub && sheet.year) {
                                    if(window.confirm("部門長に確認依頼を送信しますか？")){
                                        const work = commandWorkFlow(Command.SUP1_CONFIRM, sheet)
                                        const data: UpdateSheetInput = {
                                            id: sheet.id || "", // unsafe
                                            sub: sheet.sub,
                                            year: sheet.year,
                                            statusValue: work.sheet.statusValue
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
                                            if(setSheet){
                                                setSheet({...updatedSheet})
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
                                    <ReviewerSheetDetailYearlyReadonly sheet={sheet} />
                                    <Form>

                                        {/* ステータスによってボタンの出し分け */}
                                        <Form.Group>
                                            <Button type="submit" className={buttonComponentStyle}>部門長確認依頼</Button>

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
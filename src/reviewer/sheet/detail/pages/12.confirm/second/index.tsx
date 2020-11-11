import { UpdateSheetInput } from "API";
import { Sheet, Section } from "App";
import ApprovalStatusBox from "common/approvalStatusBox";
import { Formik } from "formik";
import { updateSheet } from "graphql/mutations";
import { SheetDao } from "lib/dao/sheetDao";
import { sendEmailMutation } from "lib/sendEmail";
import { commandWorkFlow, Command } from "lib/workflow";
import React, { useContext, useState } from "react"
import { Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SheetContext } from "reviewer/sheet";
import { ReviewerSheetDetailCareerReadonly } from "../../../components/career/readonly";
import { ReviewerSheetDetailInterviewReadonly } from "../../../components/interview/readonly";
import { ReviewerSheetDetailObjectiveReadonly } from "../../../components/objective/readonly";
import { RemandModal } from "../../../components/remandModal";
import { ReviewerSheetDetailYearlyReadonly } from "../../../components/yearly/readonly";

type Props = {
    sheet: Sheet,
    sections: Section[]
}

export const ReviewerSheetPagesStatus12Second = () => {
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

                            }}
                            onSubmit={async () => {
                                if (sheet) {
                                    const work = commandWorkFlow(Command.SUP1_CONFIRM, sheet)
                                    const data: UpdateSheetInput = {
                                        id: sheet.id,
                                        statusValue: work.sheet.statusValue
                                    }
                                    let updatedSheet = await SheetDao.update(updateSheet, data);


                                    if (updatedSheet) {
                                        if (work.mailObject) {
                                            sendEmailMutation(work.mailObject)
                                            alert('承認が完了しました');
                                        } else {
                                            console.error("メールの作成に失敗しました")
                                        }
                                        if(setSheet){
                                            setSheet({...updatedSheet})
                                        }
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
                                    <ReviewerSheetDetailYearlyReadonly sheet={sheet} />
                                    <Form>

                                        {/* ステータスによってボタンの出し分け */}
                                        <Form.Group>
                                            <Button type="submit">部門長承認依頼</Button>
                                            <Button onClick={handleShow}>差し戻し</Button>

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
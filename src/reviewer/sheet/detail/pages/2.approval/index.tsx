import { ErrorContext } from "App";
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
import { Section, UpdateSheetInput } from "API";
import { ReviewerSheetDetailObjectiveReadonly } from "../../components/objective/readonly";
import { ReviewerSheetDetailYearlyReadonly } from "../../components/yearly/readonly";
import { SheetContext } from "reviewer/sheet";
import { ReviewerSheetDetailCareerEditable } from "../../components/career/editable";
import { ReviewerSheetDetailInterviewEditable } from "../../components/interview/editable";
import { buttonComponentStyle } from "common/globalStyle.module.scss";
import { routeBuilder } from "router";
import { IOError, UserError } from "lib/exception";
import { validateInterviewDate } from "lib/util";

// type Props = {
//     sheet: Sheet,
//     sections: Section[]

//     handleUpdateObjective: (e: React.ChangeEvent<any>)=> void
// }

export const ReviewerSheetPagesStatus2 = () => {
  const setError = useContext(ErrorContext);
  const context = useContext(SheetContext);
  const sheet = context.sheet;
  const setSheet = context.setSheet;

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
            <Link to={routeBuilder.reviewerListPath()}>
              <Button>戻る</Button>
            </Link>
            <ApprovalStatusBox
              statusValue={sheet && (sheet.statusValue || -1)}
            />

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
              onSubmit={async (values) => {
                try {
                  if (sheet && sheet.sub && sheet.year) {
                    if (
                      window.confirm(
                        "目標承認が社員に通知されます。よろしいでしょうか。"
                      )
                    ) {
                      // インタビュー実施記録の目標設定の実施日時の形式を確認
                      if (
                        values.interviewPlanDate &&
                        validateInterviewDate(values.interviewPlanDate)
                      ) {
                        throw new UserError(
                          "インタビュー実施記録の目標設定の実施日時がyyyy-mm-dd形式で入力されていません。"
                        );
                      }
                      // インタビュー実施記録の中間#1の実施日時の形式を確認
                      if (
                        values.InterviewMid1Date &&
                        validateInterviewDate(values.InterviewMid1Date)
                      ) {
                        throw new UserError(
                          "インタビュー実施記録の中間#1の実施日時がyyyy-mm-dd形式で入力されていません。"
                        );
                      }
                      // インタビュー実施記録の中間#2の実施日時の形式を確認
                      if (
                        values.InterviewMid2Date &&
                        validateInterviewDate(values.InterviewMid2Date)
                      ) {
                        throw new UserError(
                          "インタビュー実施記録の中間#2の実施日時がyyyy-mm-dd形式で入力されていません。"
                        );
                      }
                      // インタビュー実施記録の中間#3の実施日時の形式を確認
                      if (
                        values.InterviewMid3Date &&
                        validateInterviewDate(values.InterviewMid3Date)
                      ) {
                        throw new UserError(
                          "インタビュー実施記録の中間#3の実施日時がyyyy-mm-dd形式で入力されていません。"
                        );
                      }

                      const work = commandWorkFlow(
                        Command.SUP1_APPLOVAL,
                        sheet
                      );
                      const data: UpdateSheetInput = {
                        id: sheet.id || "", // unsafe
                        sub: sheet.sub,
                        year: sheet.year,
                        statusValue: work.sheet.statusValue,
                        careerPlanComment: values.careerPlanComment,
                        interviewPlanComment: values.interviewPlanComment,
                        interviewPlanDate:
                          values.interviewPlanDate !== ""
                            ? values.interviewPlanDate
                            : null,
                        InterviewMid1Comment: values.InterviewMid1Comment,
                        InterviewMid1Date:
                          values.InterviewMid1Date !== ""
                            ? values.InterviewMid1Date
                            : null,
                        InterviewMid2Comment: values.InterviewMid2Comment,
                        InterviewMid2Date:
                          values.InterviewMid2Date !== ""
                            ? values.InterviewMid2Date
                            : null,
                        InterviewMid3Comment: values.InterviewMid3Comment,
                        InterviewMid3Date:
                          values.InterviewMid3Date !== ""
                            ? values.InterviewMid3Date
                            : null,
                      };
                      const updatedSheet = await SheetDao.update(
                        updateSheet,
                        data
                      );

                      if (updatedSheet) {
                        if (work.mailObject) {
                          sendEmailMutation(work.mailObject);
                        } else {
                          setError("メールの作成に失敗しました");
                        }
                        if (setSheet) {
                          setSheet({ ...updatedSheet });
                        }
                        // updatedSheet = await statusManager.exec(updatedSheet, "proceed");
                        // setSheet({...updatedSheet});
                      } else {
                        setError("フォームデータの登録に失敗しました");
                        throw new IOError("フォームデータの登録に失敗しました");
                      }
                    }
                  } else {
                    setError("評価シートの特定に失敗しました");
                  }
                } catch (e) {
                  setError(e.message);
                }
              }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  {/* 目標コンポーネント */}
                  {sheet && sheet.section && sheet.section.items ? (
                    <ReviewerSheetDetailObjectiveReadonly
                      sections={sheet.section.items as Section[]}
                    />
                  ) : null}

                  <h3>今後のキャリア計画</h3>
                  <br />
                  <ReviewerSheetDetailCareerEditable
                    sheet={sheet}
                    handleChange={formik.handleChange}
                  />

                  {/* インタビュー実施記録 */}
                  <h4>インタビュー実施記録</h4>
                  <ReviewerSheetDetailInterviewEditable
                    sheet={sheet}
                    handleChange={formik.handleChange}
                  />

                  {/* 年度評価 */}
                  <h4>年度評価</h4>
                  <ReviewerSheetDetailYearlyReadonly sheet={sheet} />
                  <Form>
                    {/* ステータスによってボタンの出し分け */}
                    <Form.Group>
                      <Button
                        className={buttonComponentStyle}
                        onClick={async () => {
                          if (sheet.sub && sheet.year) {
                            const data: UpdateSheetInput = {
                              id: sheet.id || "", // unsafe
                              sub: sheet.sub,
                              year: sheet.year,
                              careerPlanComment:
                                formik.values.careerPlanComment,
                              interviewPlanComment:
                                formik.values.interviewPlanComment,
                              interviewPlanDate:
                                formik.values.interviewPlanDate !== ""
                                  ? formik.values.interviewPlanDate
                                  : null,
                              InterviewMid1Comment:
                                formik.values.InterviewMid1Comment,
                              InterviewMid1Date:
                                formik.values.InterviewMid1Date !== ""
                                  ? formik.values.InterviewMid1Date
                                  : null,
                              InterviewMid2Comment:
                                formik.values.InterviewMid2Comment,
                              InterviewMid2Date:
                                formik.values.InterviewMid2Date !== ""
                                  ? formik.values.InterviewMid2Date
                                  : null,
                              InterviewMid3Comment:
                                formik.values.InterviewMid3Comment,
                              InterviewMid3Date:
                                formik.values.InterviewMid3Date !== ""
                                  ? formik.values.InterviewMid3Date
                                  : null,
                            };
                            const updatedSheet = await SheetDao.update(
                              updateSheet,
                              data
                            );

                            // const updatedSheet = runUpdateSheet(props.values);
                            if (updatedSheet) {
                              window.alert("保存が完了しました");
                            } else {
                              setError("保存失敗");
                            }
                          } else {
                            setError("評価シートの特定に失敗しました");
                          }
                        }}
                      >
                        一時保存
                      </Button>

                      <Button type="submit" className={buttonComponentStyle}>
                        目標内容承認
                      </Button>
                      <Button
                        onClick={handleShow}
                        className={buttonComponentStyle}
                      >
                        差し戻し
                      </Button>
                    </Form.Group>
                  </Form>
                  <br />
                </form>
              )}
            </Formik>
          </Container>
        </div>
      </div>
    );
  } else {
    setError("シートが存在しません");
    return null;
  }
};

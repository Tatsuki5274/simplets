import { Section, UpdateSheetInput } from "API";
import { ErrorContext } from "App";
import ApprovalStatusBox from "common/approvalStatusBox";
import { Formik } from "formik";
import { updateSheet } from "graphql/mutations";
import { formatAWSDate } from "lib/awsdate";
import { SheetDao } from "lib/dao/sheetDao";
import { sendEmailMutation } from "lib/sendEmail";
import { commandWorkFlow, Command } from "lib/workflow";
import React, { useContext, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SheetContext } from "reviewer/sheet";
import { ReviewerSheetDetailCareerReadonly } from "../../components/career/readonly";
import { ReviewerSheetDetailInterviewReadonly } from "../../components/interview/readonly";
import { ReviewerSheetDetailObjectiveEditable } from "../../components/objective/editable";
import { RemandModal } from "../../components/remandModal";
import { ReviewerSheetDetailYearlyEditableSecond } from "../../components/yearly/editable/second";
import * as Yup from "yup";
import { buttonComponentStyle } from "common/globalStyle.module.scss";
import { routeBuilder } from "router";

type Props = {
  //sheet: Sheet,
  sections: Section[];
};

export const ReviewerSheetPagesStatus10 = (props: Props) => {
  const setError = useContext(ErrorContext);
  const context = useContext(SheetContext);
  const sheet = context.sheet;
  const setSheet = context.setSheet;

  const [isRemandModal, setIsRemandModal] = useState<boolean>(false);
  const handleClose = () => setIsRemandModal(false);
  const handleShow = () => setIsRemandModal(true);

  if (sheet) {
    const evaluation: { [index: string]: { lastEvaluation: string | null } } =
      {};
    sheet.section?.items?.forEach((section) => {
      section?.objective?.items?.forEach((objective) => {
        if (objective && objective.id && objective.lastEvaluation) {
          evaluation[`${objective.id}`] = {
            lastEvaluation: objective.lastEvaluation
              ? objective.lastEvaluation.toString()
              : null,
          };
        }
      });
    });

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
                secondComment: sheet.secondComment,
                overAllEvaluation: sheet.overAllEvaluation,
                lastEvaluation: evaluation,
              }}
              validationSchema={Yup.object({
                secondComment: Yup.string()
                  .typeError("コメントを入力してください")
                  .required("コメントを入力してください"),
                overAllEvaluation: Yup.number()
                  .typeError("総合評価を入力してください")
                  .required("総合評価を入力してください"),
              })}
              onSubmit={async (values) => {
                if (sheet) {
                  if (sheet.sub && sheet.year) {
                    let isValid = true;
                    for (const key in values.lastEvaluation) {
                      if (!values.lastEvaluation[key]) isValid = false;
                    }
                    if (
                      isValid &&
                      values.overAllEvaluation &&
                      values.secondComment
                    ) {
                      //評価が入力済み
                      if (window.confirm("総合評価を確定しますか？")) {
                        const work = commandWorkFlow(
                          Command.SUP1_INPUT_SCORE,
                          sheet
                        );
                        const data: UpdateSheetInput = {
                          id: sheet.id || "", // unsafe
                          sub: sheet.sub,
                          year: sheet.year,
                          secondComment: values.secondComment,
                          secondCheckDate: formatAWSDate(new Date()),
                          statusValue: work.sheet.statusValue,
                          overAllEvaluation: values.overAllEvaluation,
                        };
                        const updatedSheet = await SheetDao.update(
                          updateSheet,
                          data
                        );

                        if (updatedSheet) {
                          if (work.mailObject) {
                            sendEmailMutation(work.mailObject);
                            alert("承認が完了しました");
                          } else {
                            setError("メールの作成に失敗しました");
                          }
                          if (setSheet) {
                            setSheet({ ...updatedSheet });
                          }
                        } else {
                          setError("フォームデータの登録に失敗しました");
                        }
                      }
                    } else {
                      alert("評価をすべて入力してください");
                    }
                  } else {
                    setError("評価シートの特定に失敗しました");
                  }
                } else {
                  setError("sheetの読み込みに失敗しています");
                }
              }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  {/* 目標コンポーネント */}
                  <ReviewerSheetDetailObjectiveEditable
                    sections={props.sections}
                    onChange={formik.handleChange}
                  />

                  <h3>今後のキャリア計画</h3>
                  <br />
                  <ReviewerSheetDetailCareerReadonly sheet={sheet} />

                  {/* インタビュー実施記録 */}
                  <h4>インタビュー実施記録</h4>
                  <ReviewerSheetDetailInterviewReadonly sheet={sheet} />

                  {/* 年度評価 */}
                  <h4>年度評価</h4>
                  <ReviewerSheetDetailYearlyEditableSecond
                    sheet={sheet}
                    handleChange={formik.handleChange}
                  />
                  <Form>
                    {/* ステータスによってボタンの出し分け */}
                    <Form.Group>
                      <Button
                        className={buttonComponentStyle}
                        onClick={async () => {
                          if (sheet.id) {
                            const data: UpdateSheetInput = {
                              id: sheet.id,
                              // sub: sheet.sub,
                              // year: sheet.year,
                              secondComment: formik.values.secondComment,
                              secondCheckDate: formatAWSDate(new Date()),
                              overAllEvaluation:
                                formik.values.overAllEvaluation,
                            };
                            const updatedSheet = await SheetDao.update(
                              updateSheet,
                              data
                            );

                            // const updatedSheet = runUpdateSheet(props.values);
                            if (updatedSheet) {
                              window.alert("保存が完了しました");
                            } else {
                              // Todo エラー出力の追加
                              // console.error("保存失敗", updatedSheet);
                            }
                          } else {
                            setError("評価シートの特定に失敗しました");
                          }
                        }}
                      >
                        一時保存
                      </Button>

                      <Button type="submit" className={buttonComponentStyle}>
                        総合評価確定
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
    return null;
  }
};

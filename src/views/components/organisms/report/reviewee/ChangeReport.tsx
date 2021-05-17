import { ErrorMessage, Formik } from "formik";
import { deleteReport, updateReport } from "graphql/mutations";
import { ReportDao } from "lib/dao/reportDao";
import React, { useContext } from "react";
import Text from "views/components/atoms/Text";
import TextArea from "views/components/atoms/TextArea";
import CommandButton from "views/components/molecules/CommandButton";
import RadioButtonSelect from "views/components/molecules/RadioButtonSelect";
import * as APIt from "API";
import { ErrorContext, SendEmail } from "App";
import { sendEmailMutation } from "lib/sendEmail";
import styled from "styled-components";
import { routeBuilder } from "router";
import { CountLine } from "lib/util";
import ErrorText from "views/components/atoms/ErrorText";
import RequiredLabel from "views/components/molecules/RequiredLabel";
import ButtonNegative from "views/components/molecules/ButtonNegative";
import { useHistory } from "react-router";

type Props = {
  workStatusList: {
    value: string;
    label: string;
  }[];

  data: {
    date: string;
    companyID: string;
    superior: {
      email: string | null;
      name: string;
    };
    sub: string;
    reviewee: string;
    revieweeName: string;
    workStatusValue: string;
    reviewerComments: string;
    commentWork: string;
    commentStatus: string;
    commentOther: string;
    id: string;
  };
};

const validate = (values: {
  commentWork: string | null;
  workStatus: string;
  commentStatus: string;
}) => {
  const errors: { commentWork?: string; commentStatus?: string } = {};

  if (values.workStatus !== "OK" && !values.commentStatus) {
    errors.commentStatus =
      "”課題はあるが作業できている” または ”問題が発生している” を選択した場合は入力してください";
  }
  if (!values.commentWork) {
    errors.commentWork = "作業報告を入力してください";
  }
  return errors;
};

export default function (props: Props) {
  const setError = useContext(ErrorContext);
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        commentWork: props.data.commentWork,
        workStatus: props.data.workStatusValue,
        commentStatus: props.data.commentStatus,
        commentOther: props.data.commentOther,
      }}
      // validationSchema={Yup.object({
      //     commentWork: Yup.string().typeError('作業報告を入力してください').required('作業報告を入力してください'),
      //     commentStatus: Yup.string().typeError('作業状況を入力してください').required('作業状況を入力してください'),
      // })}
      validate={validate}
      onSubmit={async (values) => {
        const updateI: APIt.UpdateReportInput = {
          id: props.data.id,
          sub: props.data.sub,
          companyID: props.data.companyID,
          date: props.data.date,
          workStatus: values.workStatus as APIt.ReportWorkingStatus,
          reviewee: props.data.reviewee,
          revieweeComments: {
            work: values.commentWork,
            other: values.commentOther,
            status: values.commentStatus,
          },
        };
        // console.log("updateI", updateI)
        const updatedReport = await ReportDao.update(updateReport, updateI);
        // console.log("updatedReport", updatedReport)
        if (updatedReport) {
          window.alert("保存が完了しました");
        } else {
          console.error("報告書の保存に失敗しました");
          setError("報告書の保存に失敗しました");
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <ReportStyle>
            <Text>{`作業報告 ${props.data.date.replace(/-/g, "/")}`}</Text>
          </ReportStyle>

          <div>
            <Text className="commentWork">【作業内容】</Text>
            <RequiredLabel />
          </div>
          <ReportStyle>
            <TextArea
              name="commentWork"
              onChange={formik.handleChange}
              defaultValue={formik.values.commentWork}
              rows={CountLine(formik.values.commentWork)}
              style={StyledTextarea}
            />
            <ErrorText>
              <ErrorMessage name="commentWork" />
            </ErrorText>
          </ReportStyle>

          <div>
            <Text className="workStatus">【作業状況】</Text>
            <RequiredLabel />
          </div>
          <ReportStyle>
            <RadioButtonSelect
              name="workStatus"
              radioButtons={props.workStatusList}
              onChange={formik.handleChange}
              defaultIndex={props.workStatusList.findIndex(
                (element) => element.value === formik.values.workStatus
              )}
            />
          </ReportStyle>

          <div>
            <Text className="commentStatus">【作業状況詳細】</Text>
            {formik.values.workStatus !== "OK" ? <RequiredLabel /> : null}
          </div>
          <ReportStyle>
            <TextArea
              name="commentStatus"
              onChange={formik.handleChange}
              defaultValue={formik.values.commentStatus}
              rows={CountLine(formik.values.commentStatus)}
              style={StyledTextarea}
            />
            <ErrorText>
              <ErrorMessage name="commentStatus" />
            </ErrorText>
          </ReportStyle>

          <div>
            <Text className="commentOther">【その他】</Text>
          </div>
          <ReportStyle>
            <TextArea
              name="commentOther"
              onChange={formik.handleChange}
              defaultValue={formik.values.commentOther}
              rows={CountLine(formik.values.commentOther)}
              style={StyledTextarea}
            />
          </ReportStyle>

          <div>
            <Text className="reviewerComments">【所属長コメント】</Text>
          </div>
          <ReviewerCommentStyle>
            <Text>{props.data.reviewerComments}</Text>
          </ReviewerCommentStyle>

          <CommandButton type="submit">保存</CommandButton>
          {props.data.superior.email ? (
            <SpaceStyle>
              <CommandButton
                onClick={async () => {
                  if (
                    window.confirm(
                      "入力内容を保存して、所属長へメールを送信しますか？"
                    )
                  ) {
                    if (
                      formik.values.workStatus &&
                      (formik.values.workStatus === "OK" ||
                        formik.values.commentStatus) &&
                      formik.values.commentWork
                    ) {
                      const updateI: APIt.UpdateReportInput = {
                        id: props.data.id,
                        sub: props.data.sub,
                        companyID: props.data.companyID,
                        date: props.data.date,
                        workStatus: formik.values
                          .workStatus as APIt.ReportWorkingStatus,
                        reviewee: props.data.reviewee,
                        revieweeComments: {
                          work: formik.values.commentWork,
                          other: formik.values.commentOther,
                          status: formik.values.commentStatus,
                        },
                      };
                      // console.log("updateI", updateI)
                      const updatedReport = await ReportDao.update(
                        updateReport,
                        updateI
                      );
                      // console.log("updatedReport", updatedReport)
                      if (updatedReport) {
                        const protocol = window.location.protocol;
                        const hostName = window.location.host;
                        const hostUrl = protocol + "//" + hostName;

                        const sendI: SendEmail = {
                          to: [props.data.superior.email],
                          subject: `[Simplet's] 作業報告（${props.data.date.replace(
                            /-/g,
                            "/"
                          )}）${props.data.revieweeName}`,
                          body: `
${props.data.superior.name}様:

作業報告が入力されました。

[作業報告]
${formik.values.commentWork}

[作業状況]
${
  props.workStatusList[
    props.workStatusList.findIndex(
      (element) => element.value === formik.values.workStatus
    )
  ].label
}

[作業状況コメント]
${formik.values.commentStatus || ""}

[その他コメント]
${formik.values.commentOther || ""}

[所属長コメント]
${props.data.reviewerComments}

以下のURLにアクセスし確認をおこなってください。
${routeBuilder.reviewerReportCommentPath(props.data.id, hostUrl)}

# 本メールは${props.data.superior.email}宛にお送りしています。
# 本メールはシステムより自動送信されています。
# 本メールに返信されましても、返答できませんのでご了承ください。
`,
                        };
                        if (sendEmailMutation(sendI)) {
                          window.alert("所属長へのメール送信が完了しました");
                        }
                      } else {
                        console.error("報告書の保存に失敗しました");
                        setError("報告書の保存に失敗しました");
                      }
                    } else {
                      window.alert("必須項目を入力してください");
                    }
                  }
                }}
              >
                所属長へ送信
              </CommandButton>
            </SpaceStyle>
          ) : null}

          <ButtonNegative
            onClick={async () => {
              if (window.confirm("削除してもよろしいですか？")) {
                const deleteI: APIt.DeleteReportInput = {
                  id: props.data.id,
                };

                const deleteItem = await ReportDao.delete(
                  deleteReport,
                  deleteI
                );

                if (deleteItem) {
                  window.alert("削除が完了しました。");
                  history.goBack();
                } else {
                  console.error("報告書の削除に失敗しました");
                  setError("報告書の削除に失敗しました");
                }
              }
            }}
          >
            削除
          </ButtonNegative>
        </form>
      )}
    </Formik>
  );
}

const SpaceStyle = styled.div({
  display: "inline-block",
  margin: "0 10px",
});

const ReviewerCommentStyle = styled.div({
  whiteSpace: "pre-line",
  marginBottom: "20px",
});

const StyledTextarea: React.CSSProperties = {
  width: "50%",
};

const ReportStyle = styled.div({
  marginBottom: "20px",
});

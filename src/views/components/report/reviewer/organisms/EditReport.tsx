import { Formik } from "formik";
import React from "react";
import Text from "views/components/common/atoms/Text";
import * as APIt from "API";
import { ReportDao } from "lib/dao/reportDao";
import { updateReport } from "graphql/mutations";
import { SendEmail } from "App";
import { sendEmailMutation } from "lib/sendEmail";
import styled from "styled-components";
import { routeBuilder } from "router";
import { CountLine } from "lib/util";
import TextArea from "views/components/common/atoms/TextArea";
import CommandButton from "views/components/common/molecules/CommandButton";

type Props = {
  revieweeMailAddress: string | null;
  // date: Date
  sub: string;
  date: string;
  commentWork: string;
  workStatus: string;
  commentStatus: string;
  commentOther: string;
  commentReviewer: string;
  reviewee: string;
  revieweeName: string;
  id: string;
};

export default function (props: Props): JSX.Element {
  return (
    <Formik
      initialValues={{
        commentReviewer: props.commentReviewer,
      }}
      onSubmit={async (values) => {
        const updateI: APIt.UpdateReportInput = {
          id: props.id,
          sub: props.sub,
          date: props.date,
          reviewee: props.reviewee,
          reviewerComments: {
            superior: values.commentReviewer,
          },
        };
        const updatedReport = await ReportDao.update(updateReport, updateI);
        if (updatedReport) {
          window.alert("保存が完了しました");
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Text>作業報告 {props.date.replace(/-/g, "/")}</Text>
          </div>

          <ReportStyle>
            <Text>{`作業報告者 ${props.revieweeName}`}</Text>
          </ReportStyle>

          <div>
            <Text className="commentWork">【作業内容】</Text>
          </div>
          <ReportStyle>
            <Text className="commentWork">{props.commentWork}</Text>
          </ReportStyle>

          <div>
            <Text className="workStatus">【作業状況】</Text>
          </div>
          <ReportStyle>
            <Text className="workStatus">{props.workStatus}</Text>
          </ReportStyle>

          <div>
            <Text className="commentStatus">【作業状況詳細】</Text>
          </div>
          <ReportStyle>
            <Text className="commentStatus">{props.commentStatus}</Text>
          </ReportStyle>

          <div>
            <Text className="commentOther">【その他】</Text>
          </div>
          <ReportStyle>
            <Text className="commentOther">{props.commentOther}</Text>
          </ReportStyle>

          <div>
            <Text className="commentReviewer">【所属長コメント】</Text>
          </div>
          <ReportStyle>
            <TextArea
              name="commentReviewer"
              onChange={formik.handleChange}
              defaultValue={formik.values.commentReviewer}
              style={StyledTextarea}
              rows={CountLine(formik.values.commentReviewer)}
            />
          </ReportStyle>

          <CommandButton type="submit">保存</CommandButton>
          {props.revieweeMailAddress ? (
            <SpaceStyle>
              <CommandButton
                onClick={async () => {
                  if (
                    window.confirm(
                      "入力内容を保存して、社員へメールを送信しますか？"
                    )
                  ) {
                    if (formik.values.commentReviewer) {
                      const updateI: APIt.UpdateReportInput = {
                        id: props.id,
                        sub: props.sub,
                        date: props.date,
                        reviewee: props.reviewee,
                        reviewerComments: {
                          superior: formik.values.commentReviewer,
                        },
                      };
                      const updatedReport = await ReportDao.update(
                        updateReport,
                        updateI
                      );
                      if (updatedReport) {
                        const protocol = window.location.protocol;
                        const hostName = window.location.host;
                        const hostUrl = protocol + "//" + hostName;

                        const sendI: SendEmail = {
                          to: [props.revieweeMailAddress],
                          subject: `[Simplet's] 作業報告（${props.date.replace(
                            /-/g,
                            "/"
                          )}）所属長からのコメント`,
                          body: `

${props.revieweeName}様:

所属長がコメントを入力しました。

[作業報告]
${props.commentWork}

[作業状況]
${props.workStatus}

[作業状況コメント]
${props.commentStatus || ""}

[その他コメント]
${props.commentOther || ""}

[所属長コメント]
${formik.values.commentReviewer}

以下のURLにアクセスし確認をおこなってください。
${routeBuilder.revieweeReportEditPath(props.id, hostUrl)}

# 本メールは${props.revieweeMailAddress}宛にお送りしています。
# 本メールはシステムより自動送信されています。
# 本メールに返信されましても、返答できませんのでご了承ください。
`,
                        };
                        if (await sendEmailMutation(sendI)) {
                          window.alert("社員へのメール送信が完了しました");
                        }
                      }
                    } else {
                      window.alert("所属長コメントを入力してください");
                    }
                  }
                }}
              >
                社員に送信
              </CommandButton>
            </SpaceStyle>
          ) : null}
        </form>
      )}
    </Formik>
  );
}

const SpaceStyle = styled.div({
  display: "inline-block",
  margin: "0 10px",
});

const StyledTextarea: React.CSSProperties = {
  width: "50%",
};

const ReportStyle = styled.div({
  marginBottom: "20px",
  whiteSpace: "pre-line",
});

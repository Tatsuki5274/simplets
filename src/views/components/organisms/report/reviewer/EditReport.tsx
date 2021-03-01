import { Formik } from "formik";
import React from "react";
import Text from "views/components/atoms/Text";
import TextArea from "views/components/atoms/TextArea";
import CommandButton from "views/components/molecules/CommandButton";
import * as APIt from 'API';
import { ReportDao } from "lib/dao/reportDao";
import { updateReport } from "graphql/mutations";
import { SendEmail } from "App";
import { sendEmailMutation } from "lib/sendEmail";
import styled from "styled-components";
import { routeBuilder } from "router";

type Props = {
    revieweeMailAddress: string | null
    // date: Date
    sub: string
    date: string
    commentWork: string
    workStatus: string
    commentStatus: string
    commentOther: string
    commentReviewer: string
    reviewee: string
    revieweeName: string
}

export default function (props: Props) {
    return (
        <Formik
            initialValues={{
                commentReviewer: props.commentReviewer,
            }}
            onSubmit={async (values) => {
                const updateI: APIt.UpdateReportInput = {
                    sub: props.sub,
                    date: props.date,
                    reviewee: props.reviewee,
                    reviewerComments: {
                        superior: values.commentReviewer
                    },
                }
                const updatedReport = await ReportDao.update(updateReport, updateI);
                if (updatedReport) {
                    window.alert("保存が完了しました");
                }
            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>

                    <div>
                        <Text>作業報告 {props.date}</Text>
                    </div>

                    <div>
                        <Text>{`作業報告者 ${props.revieweeName}`}</Text>
                    </div>

                    <div>
                        <Text className="commentWork">【作業報告】</Text>
                    </div>
                    <div>
                        <Text className="commentWork">
                            {props.commentWork}
                        </Text>
                    </div>

                    <div>
                        <Text className="workStatus">【作業状況】</Text>
                    </div>
                    <div>
                        <Text className="workStatus">
                            {props.workStatus}
                        </Text>
                    </div>

                    <div>
                        <Text className="commentStatus">【作業状況】</Text>
                    </div>
                    <div>
                        <Text className="commentStatus">
                            {props.commentStatus}
                        </Text>
                    </div>

                    <div>
                        <Text className="commentOther">【その他】</Text>
                    </div>
                    <div>
                        <Text className="commentOther">
                            {props.commentOther}
                        </Text>
                    </div>

                    <div>
                        <Text className="commentReviewer">【所属長コメント】</Text>
                    </div>
                    <div>
                        <TextArea
                            name="commentReviewer"
                            onChange={formik.handleChange}
                            defaultValue={formik.values.commentReviewer}
                        />
                    </div>


                    <CommandButton type="submit">保存</CommandButton>
                    {props.revieweeMailAddress ?
                        <SpaceStyle>
                            <CommandButton
                                onClick={() => {
                                    if (window.confirm("社員へメールを送信しますか？")) {
                                        const protocol = window.location.protocol;
                                        const hostName = window.location.host;
                                        const hostUrl = protocol + '//' + hostName;

                                        const sendI: SendEmail = {
                                            to: [props.revieweeMailAddress],
                                            subject: `[Simplet's]　作業報告（${props.date}）所属長からのコメント`,
                                            body: `
[作業報告]
${props.commentWork}
[作業状況]
${props.workStatus}
[作業状況コメント]
${props.commentStatus}
[その他コメント]
${props.commentOther}
[所属長コメント]
${formik.values.commentReviewer}

以下のURLにアクセスし確認をおこなってください。
${routeBuilder.revieweeReportEditPath(props.date, hostUrl)}

# 本メールは${props.revieweeMailAddress}宛にお送りしています。
# 本メールはシステムより自動送信されています。
# 本メールに返信されましても、返答できませんのでご了承ください。
`
                                        }
                                        if (sendEmailMutation(sendI)) {
                                            window.alert("社員へのメール送信が完了しました");
                                        }
                                    }
                                }}
                            >社員に送信</CommandButton>
                        </SpaceStyle>
                        : null
                    }
                </form>
            )}
        </Formik>
    )
}

const SpaceStyle = styled.div({
    display: "inline-block",
    margin: "0 10px",
})
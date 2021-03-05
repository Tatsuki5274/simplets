import { ErrorMessage, Formik } from "formik";
import { createReport } from "graphql/mutations";
import { ReportDao } from "lib/dao/reportDao";
import React, { useContext } from "react";
import Text from "views/components/atoms/Text";
import TextArea from "views/components/atoms/TextArea";
import CommandButton from "views/components/molecules/CommandButton";
import RadioButtonSelect from "views/components/molecules/RadioButtonSelect";
import * as APIt from 'API';
import { sendEmailMutation } from "lib/sendEmail";
import { ErrorContext, SendEmail } from "App";
import { Superior } from "views/components/atoms/Types";
import styled from "styled-components";
import { routeBuilder } from "router";
import * as Yup from 'yup';
import ErrorText from "views/components/atoms/ErrorText";
import RequiredLabel from "views/components/molecules/RequiredLabel";

export type RevieweeCreateReportType = {
    date: string
    sub: string
    companyID: string
    superior: Superior | null
    superiorName: string
    referencer: (string | null)[] | null
    reviewer: (string | null)[] | null
    reviewee: string
    revieweeName: string
    workStatus: {
        value: string
        label: string
    }[]
}

type Props = {
    data: RevieweeCreateReportType
}

export default function (props: Props) {
    const setError = useContext(ErrorContext)
    return (
        <Formik
            initialValues={{
                commentWork: null,
                workStatus: props.data.workStatus[0].value,
                commentStatus: null,
                commentOther: null,
            }}
            validationSchema={Yup.object({
                commentWork: Yup.string().typeError('作業報告を入力してください').required('作業報告を入力してください'),
                commentStatus: Yup.string().typeError('作業状況を入力してください').required('作業状況を入力してください'),
                commentOther: Yup.string().typeError('コメントを入力してください').required('コメントを入力してください'),
            })}
            onSubmit={async (values) => {

                const createI: APIt.CreateReportInput = {
                    sub: props.data.sub,
                    companyID: props.data.companyID,
                    date: props.data.date,
                    referencer: props.data.referencer,
                    reviewer: props.data.reviewer,
                    workStatus: values.workStatus as APIt.ReportWorkingStatus,
                    reviewee: props.data.reviewee,
                    revieweeComments: {
                        work: values.commentWork,
                        other: values.commentOther,
                        status: values.commentStatus,
                    },
                }
                const createdReport = await ReportDao.create(createReport, createI);
                if (createdReport) {
                    window.alert("保存が完了しました");
                } else {
                    console.error("報告書の保存に失敗しました");
                    setError("報告書の保存に失敗しました")
                }
            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>

                    <ReportStyle>
                        <Text>{`作業報告 ${props.data.date.replace(/-/g, '/')}`}</Text>
                    </ReportStyle>

                    <div>
                        <Text className="commentWork">【作業報告】</Text>
                        <RequiredLabel />
                    </div>
                    <ReportStyle>
                        <TextArea
                            name="commentWork"
                            onChange={formik.handleChange}
                            rows={5}
                            style={StyledTextarea}
                        />
                        <ErrorText>
                            <ErrorMessage
                                name="commentWork"
                            />
                        </ErrorText>
                    </ReportStyle>

                    <div>
                        <Text className="workStatus">【作業状況】</Text>
                        <RequiredLabel />
                    </div>
                    <ReportStyle>
                        <RadioButtonSelect
                            name="workStatus"
                            radioButtons={props.data.workStatus}
                            onChange={formik.handleChange}
                        />
                    </ReportStyle>

                    <div>
                        <Text className="commentStatus">【作業状況】</Text>
                        <RequiredLabel />
                    </div>
                    <ReportStyle>
                        <TextArea
                            name="commentStatus"
                            onChange={formik.handleChange}
                            rows={5}
                            style={StyledTextarea}
                        />
                        <ErrorText>
                            <ErrorMessage
                                name="commentStatus"
                            />
                        </ErrorText>
                    </ReportStyle>

                    <div>
                        <Text className="commentOther">【その他】</Text>
                        <RequiredLabel />
                    </div>
                    <ReportStyle>
                        <TextArea
                            name="commentOther"
                            onChange={formik.handleChange}
                            rows={5}
                            style={StyledTextarea}
                        />
                        <ErrorText>
                            <ErrorMessage
                                name="commentOther"
                            />
                        </ErrorText>
                    </ReportStyle>

                    <CommandButton type="submit">保存</CommandButton>
                    {props.data.superior && props.data.superior.email ?
                        <SpaceStyle>
                            <CommandButton
                                onClick={async () => {
                                    if (window.confirm("入力内容を保存して、所属長へメールを送信しますか？")) {
                                        if (props.data.superior) {
                                            if (formik.values.workStatus && formik.values.commentWork && formik.values.commentOther && formik.values.commentStatus) {
                                                const createI: APIt.CreateReportInput = {
                                                    sub: props.data.sub,
                                                    companyID: props.data.companyID,
                                                    date: props.data.date,
                                                    referencer: props.data.referencer,
                                                    reviewer: props.data.reviewer,
                                                    workStatus: formik.values.workStatus as APIt.ReportWorkingStatus,
                                                    reviewee: props.data.reviewee,
                                                    revieweeComments: {
                                                        work: formik.values.commentWork,
                                                        other: formik.values.commentOther,
                                                        status: formik.values.commentStatus,
                                                    },
                                                }
                                                const createdReport = await ReportDao.create(createReport, createI);
                                                if (createdReport) {

                                                    const protocol = window.location.protocol;
                                                    const hostName = window.location.host;
                                                    const hostUrl = protocol + '//' + hostName;

                                                    const sendI: SendEmail = {
                                                        to: [props.data.superior.email],
                                                        subject: `[Simplet's]　作業報告（${props.data.date.replace(/-/g,'/')}）${props.data.revieweeName}`,
                                                        body: `
${props.data.superiorName}様:

作業報告が入力されました。

[作業報告]
${formik.values.commentWork}
[作業状況]
${props.data.workStatus[props.data.workStatus.findIndex((element) => element.value === formik.values.workStatus)].label}
[作業状況コメント]
${formik.values.commentStatus}
[その他コメント]
${formik.values.commentOther}

以下のURLにアクセスし確認をおこなってください。
${routeBuilder.reviewerReportCommentPath(props.data.date, props.data.sub, hostUrl)}

# 本メールは${props.data.superior.email}宛にお送りしています。
# 本メールはシステムより自動送信されています。
# 本メールに返信されましても、返答できませんのでご了承ください。
`
                                                    }
                                                    if (sendEmailMutation(sendI)) {
                                                        window.alert("所属長へのメール送信が完了しました");
                                                    }
                                                } else {
                                                    console.error("報告書の保存に失敗しました");
                                                    setError("報告書の保存に失敗しました")
                                                }
                                            } else {
                                                window.alert("必須項目を入力してください。");
                                            }
                                        }
                                    }
                                }}
                            >所属長へ送信</CommandButton>
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

const StyledTextarea: React.CSSProperties = {
    width: "50%",
}

const ReportStyle = styled.div({
    marginBottom: "20px",
})
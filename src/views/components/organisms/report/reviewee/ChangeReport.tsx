import { Formik } from "formik";
import { updateReport } from "graphql/mutations";
import { ReportDao } from "lib/dao/reportDao";
import React from "react";
import Text from "views/components/atoms/Text";
import TextArea from "views/components/atoms/TextArea";
import CommandButton from "views/components/molecules/CommandButton";
import RadioButtonSelect from "views/components/molecules/RadioButtonSelect";
import * as APIt from 'API';
import { SendEmail } from "App";
import { sendEmailMutation } from "lib/sendEmail";
import styled from "styled-components";
import { routeBuilder } from "router";

type Props = {
    workStatusList: {
        value: string
        label: string
    }[]

    data: {
        date: string
        companyID: string
        superior: {
            email: string | null,
        }
        reviewee: string
        revieweeName: string
        workStatusValue: string
        reviewerComments: string
        commentWork: string
        commentStatus: string
        commentOther: string
    }
}

export default function (props: Props) {
    return (
        <Formik
            initialValues={{
                commentWork: props.data.commentWork,
                workStatus: props.data.workStatusValue,
                commentStatus: props.data.commentStatus,
                commentOther: props.data.commentOther,
            }}
            onSubmit={async (values) => {

                const updateI: APIt.UpdateReportInput = {
                    companyID: props.data.companyID,
                    date: props.data.date,
                    workStatus: values.workStatus as APIt.ReportWorkingStatus,
                    reviewee: props.data.reviewee,
                    revieweeComments: {
                        work: values.commentWork,
                        other: values.commentOther,
                        status: values.commentStatus,
                    },
                }
                console.log("updateI", updateI)
                const updatedReport = await ReportDao.update(updateReport, updateI);
                console.log("updatedReport", updatedReport)
                if (updatedReport) {
                    window.alert("保存が完了しました");
                }
                console.log("values", values)

            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>

                    <div>
                        <Text>作業報告 {props.data.date}</Text>
                    </div>

                    <div>
                        <Text className="commentWork">【作業報告】</Text>
                    </div>
                    <div>
                        <TextArea
                            name="commentWork"
                            onChange={formik.handleChange}
                            defaultValue={formik.values.commentWork}
                        />
                    </div>

                    <div>
                        <Text className="workStatus">【作業状況】</Text>
                    </div>
                    <div>
                        <RadioButtonSelect
                            name="workStatus"
                            radioButtons={props.workStatusList}
                            onChange={formik.handleChange}
                            defaultIndex={props.workStatusList.findIndex((element) => element.value === formik.values.workStatus)}
                        />
                    </div>

                    <div>
                        <Text className="commentStatus">【作業状況】</Text>
                    </div>
                    <div>
                        <TextArea
                            name="commentStatus"
                            onChange={formik.handleChange}
                            defaultValue={formik.values.commentStatus}
                        />
                    </div>

                    <div>
                        <Text className="commentOther">【その他】</Text>
                    </div>
                    <div>
                        <TextArea
                            name="commentOther"
                            onChange={formik.handleChange}
                            defaultValue={formik.values.commentOther}
                        />
                    </div>

                    <div>
                        <Text className="reviewerComments">所属長コメント</Text>
                    </div>
                    <div>
                        <Text>{props.data.reviewerComments}</Text>
                    </div>

                    <CommandButton type="submit">保存</CommandButton>
                    {props.data.superior.email ?
                        <SpaceStyle>
                            <CommandButton
                                onClick={() => {
                                    if (window.confirm("所属長へメールを送信しますか？")) {
                                        const protocol = window.location.protocol;
                                        const hostName = window.location.host;
                                        const hostUrl = protocol + '//' + hostName;

                                        const sendI: SendEmail = {
                                            to: [props.data.superior.email],
                                            subject: `[Simplet's]　作業報告（${props.data.date}）${props.data.revieweeName}`,
                                            body: `
[作業報告]
${formik.values.commentWork}
[作業状況]
${props.workStatusList[props.workStatusList.findIndex((element) => element.value === formik.values.workStatus)].label}
[作業状況コメント]
${formik.values.commentStatus}
[その他コメント]
${formik.values.commentOther}
[所属長コメント]
${props.data.reviewerComments}

以下のURLにアクセスし確認をおこなってください。
${routeBuilder.reviewerReportCommentPath(props.data.date, props.data.reviewee, hostUrl)}

# 本メールは${props.data.superior.email}宛にお送りしています。
# 本メールはシステムより自動送信されています。
# 本メールに返信されましても、返答できませんのでご了承ください。
`
                                        }
                                        if (sendEmailMutation(sendI)) {
                                            window.alert("所属長へのメール送信が完了しました");
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
import { Formik } from "formik";
import { createReport } from "graphql/mutations";
import { ReportDao } from "lib/dao/reportDao";
import React from "react";
import Text from "views/components/atoms/Text";
import TextArea from "views/components/atoms/TextArea";
import CommandButton from "views/components/molecules/CommandButton";
import RadioButtonSelect from "views/components/molecules/RadioButtonSelect";
import * as APIt from 'API';
import { sendEmailMutation } from "lib/sendEmail";
import { SendEmail } from "App";
import { Superior } from "views/components/atoms/Types";
import styled from "styled-components";

export type RevieweeCreateReportType = {
    date: string
    companyID: string
    superior: Superior | null
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
    return (
        <Formik
            initialValues={{
                commentWork: "",
                workStatus: props.data.workStatus[0].value,
                commentStatus: "",
                commentOther: "",
            }}
            onSubmit={async (values) => {

                const createI: APIt.CreateReportInput = {
                    companyID: props.data.companyID,
                    date: props.data.date,
                    referencer: props.data.referencer,
                    reviewer: props.data.reviewer,
                    // superior: {
                    //     email: props.superior ? props.superior.email : null,
                    //     username: props.superior ? props.superior.username : null,
                    // },
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
                }
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
                        />
                    </div>

                    <div>
                        <Text className="workStatus">【作業状況】</Text>
                    </div>
                    <div>
                        <RadioButtonSelect
                            name="workStatus"
                            radioButtons={props.data.workStatus}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div>
                        <Text className="commentStatus">【作業状況】</Text>
                    </div>
                    <div>
                        <TextArea
                            name="commentStatus"
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div>
                        <Text className="commentOther">【その他】</Text>
                    </div>
                    <div>
                        <TextArea
                            name="commentOther"
                            onChange={formik.handleChange}
                        />
                    </div>
                        <CommandButton type="submit">保存</CommandButton>
                    {props.data.superior && props.data.superior.email ?
                        <SpaceStyle>
                            <CommandButton
                                onClick={() => {
                                    if (window.confirm("所属長へメールを送信しますか？")) {
                                        if (props.data.superior) {
                                            const sendI: SendEmail = {
                                                to: [props.data.superior.email],
                                                subject: `[Simplet's]　作業報告（${props.data.date}）${props.data.revieweeName}`,
                                                body: `
[作業報告]
${formik.values.commentWork}
[作業状況]
${props.data.workStatus[props.data.workStatus.findIndex((element) => element.value === formik.values.workStatus)].label}
[作業状況コメント]
${formik.values.commentStatus}
[その他コメント]
${formik.values.commentOther}
`
                                            }
                                            if (sendEmailMutation(sendI)) {
                                                window.alert("所属長へのメール送信が完了しました");
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
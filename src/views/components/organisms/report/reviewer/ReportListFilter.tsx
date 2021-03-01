import { ListReportsRevieweeQueryVariables, ReportWorkingStatus } from "API";
import { Formik } from "formik";
import { listReports } from "graphql/queries";
import { ReportDao } from "lib/dao/reportDao";
import React, { useState } from "react";
import Text from "views/components/atoms/Text";
import TextField from "views/components/atoms/TextField";
import { SelectLabel } from "views/components/atoms/Types";
import CommandButton from "views/components/molecules/CommandButton";
import PullDown from "views/components/molecules/PullDown";
import { ReviewerReportListEmployeeType } from "./TableReportList";

export type ReviewerReportFilterEmployeeType = {
    firlstName: string
    lastName: string
    groupName: string
    groupLocalId: string
    username: string
}

type Props = {
    groups: { value: string, label: string }[]
    reviewee: ReviewerReportFilterEmployeeType[]
    setTable: React.Dispatch<React.SetStateAction<ReviewerReportListEmployeeType[] | null>>
}

function generateRevieweeLabel(input: ReviewerReportFilterEmployeeType[]){
    return input.map(datum => {
        return {
            label: `${datum.groupName} ${datum.lastName}${datum.firlstName}`,
            value: datum.username
        }
    })
}

export default function (props:Props) {
    const [reviewees, setReviewees] = useState<SelectLabel[]>(generateRevieweeLabel(props.reviewee))
    function handleChangeGroup(event: React.ChangeEvent<HTMLSelectElement>){
        const value = event.target.value
        if(value === "all"){
            setReviewees(generateRevieweeLabel(props.reviewee))
        }else{
            const filteredReviewees = props.reviewee.filter(reviewee => {
                return reviewee.groupLocalId === value
            })
            const reviewees = generateRevieweeLabel(filteredReviewees)
            setReviewees(reviewees)
        }
    }

    return (
        <Formik
            initialValues={{
                reportStartDate: "",
                reportEndDate: "",
                reviewee: "",
            }}
            onSubmit={async (values) => {
                console.log("values", values)
                const reportItem: ListReportsRevieweeQueryVariables = {
                    reviewee: values.reviewee,
                    date: {
                        between: [values.reportStartDate, values.reportEndDate]
                    }
                }
                console.log("reportItem", reportItem)
                let result :ReviewerReportListEmployeeType[] | null = null
                const reports = await ReportDao.listReviewee(listReports, reportItem)
                if (reports) {
                    console.log("reports", reports)
                    result = reports.map(report =>{
                        return {
                            commentOther : report.revieweeComments?.other || "",
                            commentStatus: report.revieweeComments?.status || "",
                            commentSuperior: report.reviewerComments?.superior || "",
                            commentWork: report.revieweeComments?.work || "",
                            workStatus: report.workStatus || ReportWorkingStatus.OK,
                            date: report.date || ""
                        }
                    })      
                }
                props.setTable(result)
            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <Text>作業報告表示期間</Text>
                    <TextField
                        type="date"
                        name="reportStartDate"
                        onChange={formik.handleChange}
                    />
                    <Text>〜</Text>
                    <TextField
                        type="date"
                        name="reportEndDate"
                        onChange={formik.handleChange}
                    />

                    <Text>部門</Text>
                    <PullDown
                        name="group"
                        handleChange={handleChangeGroup}
                        options={props.groups}
                    ></PullDown>

                    <Text>社員</Text>
                    <PullDown
                        name="reviewee"
                        handleChange={formik.handleChange}
                        options={reviewees}
                    ></PullDown>

                    <CommandButton type="submit">確認</CommandButton>
                </form>
            )}
        </Formik>
    )
}
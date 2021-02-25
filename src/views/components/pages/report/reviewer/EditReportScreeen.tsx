import { HeaderContext, SidebarContext } from "App";
import { GetEmployeeQueryVariables, GetReportQueryVariables, Report } from "API";
import { EmployeeContext } from "App";
import { getEmployee, getReport } from "graphql/queries";
import { EmployeeDao } from "lib/dao/employeeDao";
import { ReportDao } from "lib/dao/reportDao";
import React, { useContext, useEffect, useState } from "react";
import EditReport from "views/components/templates/report/reviewer/EditReport";
import { getReportStatusString } from "lib/util";

type Props = {
    match: {
        params: {
            date: string
            username: string
        }
    }
}

export default function (props: Props) {
    const [report, setReport] = useState<Report | null>();
    const [revieweeMailAddress, setRevieweeMailMailAddress] = useState<string | null>(null);
    const [revieweeName, setRevieweeName] = useState<string | null>(null);

    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext)
    const currentEmployee = useContext(EmployeeContext);

    useEffect(() => {
        (async () => {
            const getI: GetReportQueryVariables = {
                date: props.match.params.date,
                reviewee: props.match.params.username,
            }
            const reportItem = await ReportDao.get(getReport, getI)
            if (reportItem) {
                setReport(reportItem)
            }
        })()
    }, [props])

    useEffect(() => {
        (async () => {
            if (currentEmployee) {
                const getI: GetEmployeeQueryVariables = {
                    companyID: currentEmployee.companyID,
                    username: props.match.params.username
                }
                const revieweeItem = await EmployeeDao.get(getEmployee, getI)
                if (revieweeItem && revieweeItem.email) {
                    setRevieweeMailMailAddress(revieweeItem.email)
                    setRevieweeName(`${revieweeItem.lastName} ${revieweeItem.firstName}`)
                }
            }
        })()
    }, [currentEmployee, props])

    const mockData = {
            header: header,
            sidebar: sidebar,
        workStatusList: [
            {
                value: "OK",
                label: "順調に作業できている"
            },
            {
                value: "InTask",
                label: "課題はあるが作業できている"
            },
            {
                value: "InProblem",
                label: "問題が発生している"
            },
        ],
        data: {
            revieweeMailAddress: "yhamazaki@sisco-consulting.co.jp",
            date: "2021/02/01",
            commentWork: "A社案件作業実施",
            workStatus: "順調に作業できている",
            commentStatus: "作業状況",
            commentOther: "その他コメント",
            commentReviewer: "報告ありがとうございます",
            reviewee: "yhamazaki@sisco-consulting.co.jp",
        },

    }

    return (
        report ?
            <EditReport
                header={mockData.header}
                sidebar={mockData.sidebar}
                data={{
                    revieweeMailAddress: revieweeMailAddress,
                    date: report.date || "",
                    commentWork: report.revieweeComments?.work || "",
                    workStatus: report.workStatus ? getReportStatusString(report.workStatus) : "",
                    commentStatus: report.revieweeComments?.status || "",
                    commentOther: report.revieweeComments?.other || "",
                    commentReviewer: report.reviewerComments?.superior || "",
                    reviewee: report.reviewee || "",
                    revieweeName: revieweeName || "",
                }}
            /> : null
    )
}
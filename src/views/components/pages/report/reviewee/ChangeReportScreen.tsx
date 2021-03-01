import { GetReportQueryVariables, Report } from "API";
import { EmployeeContext, HeaderContext, SidebarContext, UserContext } from "App";
import { getReport } from "graphql/queries";
import { ReportDao } from "lib/dao/reportDao";
import React, { useContext, useEffect, useState } from "react";
import ChangeReport from "views/components/templates/report/reviewee/ChangeReport";

type Props = {
    match: {
        params: {
            date: Date
        }
    }
}

export default function (props: Props) {
    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext)

    const currentEmployee = useContext(EmployeeContext);
    const currentUser = useContext(UserContext);
    const [report, setReport] = useState<Report | null>();

    useEffect(() => {
        (async () => {
            if (currentUser) {
                const getI: GetReportQueryVariables = {
                    sub: currentUser?.attributes.sub,
                    date: String(props.match.params.date),
                }
                const reportItem = await ReportDao.get(getReport, getI)
                setReport(reportItem)
            }
        })()
    }, [props, currentUser])

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
        // data: {
        //     date: "2021-01-01",
        //     companyID: "SCC",
        //     superior: {
        //         email: "yhamazaki+superior1@sisco-consulting.co.jp",
        //         username: "テスト所属長"
        //     },
        //     referencer: ["yhamazaki+superior1@sisco-consulting.co.jp", "yhamazaki+superior2@sisco-consulting.co.jp"],
        //     reviewer: ["yhamazaki+superior1@sisco-consulting.co.jp"],
        //     reviewee: "yhamazaki@sisco-consulting.co.jp",
        //     revieweeName: "テスト テスト",
        //     workStatusValue: "InTask",
        //     reviewerComments: "テスト",
        //     commentWork: "commentWork",
        //     commentStatus: "commentStatus",
        //     commentOther: "commentOther",

        // },
    }
    return (
        report ?
            <ChangeReport
                header={mockData.header}
                sidebar={mockData.sidebar}
                workStatusList={mockData.workStatusList}
                data={{
                    sub: report.sub || "",
                    date: report.date || "",
                    companyID: report.companyID || "",
                    superior: {
                        email: currentEmployee?.superior?.email || null,
                    },
                    reviewee: report.reviewee || "",
                    revieweeName: currentEmployee && currentEmployee.lastName && currentEmployee.firstName ? currentEmployee.lastName + currentEmployee.firstName : "",
                    workStatusValue: String(report.workStatus),
                    reviewerComments: report.reviewerComments?.superior || "",
                    commentWork: report.revieweeComments?.work || "",
                    commentStatus: report.revieweeComments?.status || "",
                    commentOther: report.revieweeComments?.other || "",

                }}
            /> : null
    )
}
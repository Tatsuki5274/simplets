import { GetReportQueryVariables, Report } from "API";
import { EmployeeContext, ErrorContext, HeaderContext, SidebarContext, UserContext } from "App";
import { getReport } from "graphql/queries";
import { ReportDao } from "lib/dao/reportDao";
import React, { useContext, useEffect, useState } from "react";
import ChangeReport from "views/components/templates/report/reviewee/ChangeReport";

type Props = {
    match: {
        params: {
            reportId: string
        }
    }
}

export default function (props: Props) {
    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext);
    const setError = useContext(ErrorContext)

    const currentEmployee = useContext(EmployeeContext);
    const currentUser = useContext(UserContext);
    const [report, setReport] = useState<Report | null>();

    useEffect(() => {
        (async () => {
            if (currentUser) {
                const getI: GetReportQueryVariables = {
                    id: props.match.params.reportId
                }
                const reportItem = await ReportDao.get(getReport, getI)

                if (reportItem) {
                    setReport(reportItem)
                } else {
                    console.error("報告書情報の取得に失敗しました")
                    setError("報告書情報の取得に失敗しました")
                }
            }
        })()
    }, [props.match.params.reportId, currentUser, setError])

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
                        name: `${currentEmployee?.superior?.lastName || ""} ${currentEmployee?.superior?.firstName || ""}`,
                    },
                    reviewee: report.reviewee || "",
                    revieweeName: currentEmployee && currentEmployee.lastName && currentEmployee.firstName ? currentEmployee.lastName + currentEmployee.firstName : "",
                    workStatusValue: String(report.workStatus),
                    reviewerComments: report.reviewerComments?.superior || "",
                    commentWork: report.revieweeComments?.work || "",
                    commentStatus: report.revieweeComments?.status || "",
                    commentOther: report.revieweeComments?.other || "",
                    id: report.id || "", // unsafe

                }}
            />
            : null
    )
}
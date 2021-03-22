import { GetReportQueryVariables, Report } from "API";
import { EmployeeContext, ErrorContext, HeaderContext, SidebarContext, UserContext } from "App";
import { getReport } from "graphql/queries";
import { ReportDao } from "lib/dao/reportDao";
import { getReviewers } from "lib/util";
import React, { useContext, useEffect, useState } from "react";
import { Superior } from "views/components/atoms/Types";
import { RevieweeCreateReportType } from "views/components/organisms/report/reviewee/CreateReport";
import ChangeReport from "views/components/templates/report/reviewee/ChangeReport";
import CreateReport from "views/components/templates/report/reviewee/CreateReport";

type Props = {
    match: {
        params: {
            date: Date
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
    const [reportData, setReportData] = useState<RevieweeCreateReportType>()
    
    useEffect(() => {
        (async () => {
            if (currentUser) {
                const getI: GetReportQueryVariables = {
                    sub: currentUser?.attributes.sub,
                    date: String(props.match.params.date),
                }
                const reportItem = await ReportDao.get(getReport, getI)

                if (reportItem) {
                    setReport(reportItem)
                } else {
                    if (currentEmployee) {
                        const superiorItem: Superior = {
                            email: currentEmployee.superior?.email || "",
                            username: currentEmployee.superiorUsername || null,
                        }

                        const managers = (await getReviewers(currentUser.username, currentUser.attributes["custom:companyId"])).referencer

                        if (currentUser?.attributes.sub) {
                            const reportItem: RevieweeCreateReportType = {
                                sub: currentUser.attributes.sub,
                                date: String(props.match.params.date),
                                companyID: currentEmployee.companyID || "",
                                superior: superiorItem,
                                superiorName: `${currentEmployee.superior?.lastName || ""} ${currentEmployee.superior?.firstName || ""}`,
                                referencer: managers,
                                reviewer: [currentEmployee.superiorUsername || ""],
                                reviewee: currentEmployee.username || "",
                                revieweeName: `${currentEmployee.lastName}${currentEmployee.firstName}`,
                                workStatus: mockData.workStatusList,
                            }
                            setReportData(reportItem)
                        } else {
                            console.error("認証情報が取得できません")
                            setError("認証情報が取得できません")
                        }

                    }
                }
            }
        })()
    }, [currentEmployee, props.match.params.date, currentUser, setError])

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

                }}
            />
            : reportData ?
                <CreateReport
                    header={mockData.header}
                    sidebar={mockData.sidebar}
                    data={reportData}
                />
                : null
    )
}
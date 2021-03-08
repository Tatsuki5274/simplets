import { HeaderContext, SidebarContext, UserContext } from "App";
import { GetReportQueryVariables, Report } from "API";
import { getReport } from "graphql/queries";
import { ReportDao } from "lib/dao/reportDao";
import React, { useContext, useEffect, useState } from "react";
import EditReport from "views/components/templates/report/reviewer/EditReport";
import { getReportStatusString } from "lib/util";
import ReferenceReport from "views/components/organisms/report/reviewer/ReferenceReport";
import TReferenceReport from "views/components/templates/report/reviewer/TReferenceReport";
import Error from "views/components/templates/Error";

type Props = {
    match: {
        params: {
            date: string
            sub: string
        }
    }
}

export default function (props: Props) {
    const [report, setReport] = useState<Report | null | undefined>(undefined);
    const [revieweeMailAddress, setRevieweeMailMailAddress] = useState<string | null>(null);
    const [revieweeName, setRevieweeName] = useState<string | null>(null);
    const currentUser = useContext(UserContext);

    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext)

    useEffect(() => {
        (async () => {
            const getI: GetReportQueryVariables = {
                date: props.match.params.date,
                sub: props.match.params.sub,
            }
            const reportItem = await ReportDao.get(getReport, getI)
            setReport(reportItem)
            if (reportItem) {
                if (reportItem.revieweeEmployee) {
                    setRevieweeMailMailAddress(reportItem.revieweeEmployee.email || null)
                    setRevieweeName(reportItem.revieweeEmployee ? `${reportItem.revieweeEmployee.lastName} ${reportItem.revieweeEmployee.firstName}` : null)
                }
            }
        })()
    }, [props])

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

    if(report){
        if(report.reviewer?.includes(currentUser?.username || "")){
            // 所属長が開いた場合
            return (
                <EditReport
                    header={mockData.header}
                    sidebar={mockData.sidebar}
                    data={{
                        sub: report.sub || "",
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
                />
            )
        }else {
            return (
                <TReferenceReport
                    header={mockData.header}
                    sidebar={mockData.sidebar}
                    data={{
                        sub: report.sub || "",
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
                />
            )
        }

    }else if(report === null){
        return <Error>リソースが見つかりませんでした。該当の報告書は削除されている可能性があります。</Error>
    }

    return null
}
import { HeaderContext, SidebarContext, UserContext } from "App";
import { GetReportQueryVariables, Report } from "API";
import { getReport } from "graphql/queries";
import { ReportDao } from "lib/dao/reportDao";
import React, { useContext, useEffect, useState } from "react";
import { getReportStatusString } from "lib/util";
import Error from "views/components/common/templates/Error";
import EditReport from "../templates/EditReport";
import TReferenceReport from "../templates/TReferenceReport";

type Props = {
  match: {
    params: {
      reportId: string;
    };
  };
};

export default function (props: Props) {
  const [report, setReport] = useState<Report | null>(null);
  const [revieweeMailAddress, setRevieweeMailMailAddress] =
    useState<string | null>(null);
  const [revieweeName, setRevieweeName] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const currentUser = useContext(UserContext);

  const header = useContext(HeaderContext);
  const sidebar = useContext(SidebarContext);

  useEffect(() => {
    (async () => {
      const getI: GetReportQueryVariables = {
        id: props.match.params.reportId,
      };
      const reportItem = await ReportDao.get(getReport, getI);
      setIsLoaded(true); // 読み込み完了
      setReport(reportItem);
      if (reportItem) {
        if (reportItem.revieweeEmployee) {
          setRevieweeMailMailAddress(reportItem.revieweeEmployee.email || null);
          setRevieweeName(
            reportItem.revieweeEmployee
              ? `${reportItem.revieweeEmployee.lastName} ${reportItem.revieweeEmployee.firstName}`
              : null
          );
        }
      }
    })();
  }, [props.match.params.reportId]);

  const mockData = {
    header: header,
    sidebar: sidebar,
    workStatusList: [
      {
        value: "OK",
        label: "順調に作業できている",
      },
      {
        value: "InTask",
        label: "課題はあるが作業できている",
      },
      {
        value: "InProblem",
        label: "問題が発生している",
      },
    ],
  };

  if (isLoaded) {
    if (report) {
      if (report.reviewer?.includes(currentUser?.username || "")) {
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
              workStatus: report.workStatus
                ? getReportStatusString(report.workStatus)
                : "",
              commentStatus: report.revieweeComments?.status || "",
              commentOther: report.revieweeComments?.other || "",
              commentReviewer: report.reviewerComments?.superior || "",
              reviewee: report.reviewee || "",
              revieweeName: revieweeName || "",
              id: report.id || "", // unsafe
            }}
          />
        );
      } else {
        return (
          <TReferenceReport
            header={mockData.header}
            sidebar={mockData.sidebar}
            data={{
              sub: report.sub || "",
              revieweeMailAddress: revieweeMailAddress,
              date: report.date || "",
              commentWork: report.revieweeComments?.work || "",
              workStatus: report.workStatus
                ? getReportStatusString(report.workStatus)
                : "",
              commentStatus: report.revieweeComments?.status || "",
              commentOther: report.revieweeComments?.other || "",
              commentReviewer: report.reviewerComments?.superior || "",
              reviewee: report.reviewee || "",
              revieweeName: revieweeName || "",
            }}
          />
        );
      }
    } else {
      return (
        <Error>
          リソースが見つかりませんでした。該当の報告書は削除されている可能性があります。
        </Error>
      );
    }
  }

  return null;
}

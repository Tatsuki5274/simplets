import { ReportWorkingStatus } from "API";
import React from "react";
import RowHeader from "views/components/molecules/report/RowHeader";
import RowStatusInTask from "views/components/molecules/report/RowStatusInTask";
import RowStatusOK from "views/components/molecules/report/RowStatusOK";
import RowStatusProblem from "views/components/molecules/report/RowStatusProblem";
import ScrollTable from "views/components/molecules/ScrollTable";

export type ReviewerReportListEmployeeType = {
  date: string;
  commentWork: string;
  commentStatus: string;
  commentOther: string;
  commentSuperior: string;
  workStatus: ReportWorkingStatus;
};

type Props = {
  data: ReviewerReportListEmployeeType[] | null;
};

export default function (props: Props) {
  return (
    <ScrollTable>
      <thead>
        <RowHeader />
      </thead>
      <tbody>
        {props.data
          ? props.data.map((report) => {
              return report.workStatus === "OK" ? (
                <RowStatusOK {...report} />
              ) : report.workStatus === "InTask" ? (
                <RowStatusInTask {...report} />
              ) : report.workStatus === "InProblem" ? (
                <RowStatusProblem {...report} />
              ) : null;
            })
          : null}
      </tbody>
    </ScrollTable>
  );
}

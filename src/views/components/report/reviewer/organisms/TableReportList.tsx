import { ReportWorkingStatus } from "API";
import React from "react";
import ScrollTable from "views/components/common/molecules/ScrollTable";
import RowHeader from "../molecules/RowHeader";
import RowStatusInTask from "../molecules/RowStatusInTask";
import RowStatusOK from "../molecules/RowStatusOK";
import RowStatusProblem from "../molecules/RowStatusProblem";

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

export default function (props: Props): JSX.Element {
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

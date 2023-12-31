import { ListReportsSubQueryVariables, ReportWorkingStatus } from "API";
import { Formik } from "formik";
import { listReportsSub } from "graphql/queries";
import { ReportDao } from "lib/dao/reportDao";
import React, { useState } from "react";
import styled from "styled-components";
import Text from "views/components/common/atoms/Text";
import { ReviewerReportListEmployeeType } from "./TableReportList";
import dateFormat from "dateformat";
import TextField from "views/components/common/atoms/TextField";
import { SelectLabel } from "views/components/common/atoms/Types";
import CommandButton from "views/components/common/molecules/CommandButton";
import PullDown from "views/components/common/molecules/PullDown";
import { SettingError } from "lib/exception";
import { catcher } from "views/components/common/templates/ErrorBoundary";

export type ReviewerReportFilterEmployeeType = {
  firlstName: string;
  lastName: string;
  groupId: string;
  groupName: string;
  groupNo: string;
  username: string;
  sub: string;
  empNo: string;
};

type Props = {
  groups: { value: string; label: string }[];
  reviewee: ReviewerReportFilterEmployeeType[];
  setTable: React.Dispatch<
    React.SetStateAction<ReviewerReportListEmployeeType[] | null>
  >;
};

function generateRevieweeLabel(input: ReviewerReportFilterEmployeeType[]) {
  return input.map((datum) => {
    return {
      label: `${datum.groupName} ${datum.lastName}${datum.firlstName}`,
      value: datum.sub,
    };
  });
}

export default function (props: Props): JSX.Element {
  const today = new Date();
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [reviewees, setReviewees] = useState<SelectLabel[]>(
    generateRevieweeLabel(props.reviewee)
  );

  function dateFormater(date: Date) {
    return dateFormat(date, "yyyy-mm-dd");
  }

  function handleChangeGroup(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    if (value === "all") {
      setReviewees(generateRevieweeLabel(props.reviewee));
    } else {
      const filteredReviewees = props.reviewee.filter((reviewee) => {
        return reviewee.groupId === value;
      });
      const reviewees = generateRevieweeLabel(filteredReviewees);
      if (reviewees && reviewees.length === 0) {
        const emptyData: SelectLabel[] = [
          {
            label: "",
            value: "",
          },
        ];
        setReviewees(emptyData);
      } else {
        setReviewees(reviewees);
      }
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        reportStartDate: dateFormater(startOfMonth),
        reportEndDate: dateFormater(endOfMonth),
        reviewee: reviewees[0].value,
      }}
      onSubmit={async (values) => {
        try {
          if (!values.reviewee)
            throw new SettingError(
              "選択したユーザーの識別子が存在しませんでした。"
            );
          const reportItem: ListReportsSubQueryVariables = {
            sub: values.reviewee,
            date: {
              between: [values.reportStartDate, values.reportEndDate],
            },
            limit: 1000,
          };
          let result: ReviewerReportListEmployeeType[] | null = null;
          const reports = await ReportDao.listSub(listReportsSub, reportItem);
          if (!reports || reports.length === 0) {
            window.alert("条件に一致する報告書はありません。");
            return;
          }
          result = reports.map((report) => {
            return {
              commentOther: report?.revieweeComments?.other || "",
              commentStatus: report?.revieweeComments?.status || "",
              commentSuperior: report?.reviewerComments?.superior || "",
              commentWork: report?.revieweeComments?.work || "",
              workStatus: report?.workStatus || ReportWorkingStatus.OK,
              date: report?.date || "",
            };
          });

          props.setTable(result);
        } catch (e) {
          if (e instanceof Error) {
            await catcher(e);
          } else {
            throw new Error("不明なエラーです");
          }
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Text>作業報告表示期間</Text>
          </div>

          <ReportFilterStyle>
            <TextField
              type="date"
              name="reportStartDate"
              onChange={formik.handleChange}
              placeholder="yyyy-mm-dd"
              defaultValue={dateFormater(startOfMonth)}
            />
            <Text>〜</Text>
            <TextField
              type="date"
              name="reportEndDate"
              onChange={formik.handleChange}
              placeholder="yyyy-mm-dd"
              defaultValue={dateFormater(endOfMonth)}
            />
          </ReportFilterStyle>

          <ReportFilterStyle>
            <Text style={TextStyle}>部門</Text>
            <PullDown
              name="group"
              handleChange={handleChangeGroup}
              options={props.groups}
              style={InputStyle}
            ></PullDown>

            <Text style={TextStyle}>社員</Text>
            <PullDown
              name="reviewee"
              handleChange={formik.handleChange}
              options={reviewees}
            ></PullDown>
          </ReportFilterStyle>

          <p>
            ※使用しているブラウザがSafariの場合、作業報告表示期間は yyyy-mm-dd
            形式で入力してください
          </p>
          <p>例：2020年1月1日 → 2020-01-01</p>

          <p>
            報告日：青→順調に作業できている、黄色→課題はあるが作業できている、赤→問題が発生している
          </p>

          <CommandButton type="submit">確認</CommandButton>
        </form>
      )}
    </Formik>
  );
}

const ReportFilterStyle = styled.div({
  paddingBottom: "20px",
});

const TextStyle: React.CSSProperties = {
  marginRight: "10px",
};

const InputStyle: React.CSSProperties = {
  marginRight: "30px",
};

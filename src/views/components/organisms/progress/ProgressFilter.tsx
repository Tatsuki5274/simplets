import React from "react";
import Text from "views/components/atoms/Text";
import PullDown from "views/components/molecules/PullDown";
import { Formik } from "formik";
import CommandButton from "views/components/molecules/CommandButton";
import { ProgressReferenceType } from "./ProgressCard";
import styled from "styled-components";

type Props = {
  groups: { value: string; label: string }[];
  years: { label: string; value: string }[];
  status: { label: string; value: string }[];
  initCardData: (ProgressReferenceType | null)[] | null;
  setCardData: React.Dispatch<
    React.SetStateAction<(ProgressReferenceType | null)[] | null>
  >;
};

export default function (props: Props) {
  return (
    <Formik
      initialValues={{
        group: props.groups[0].value,
        year: props.years[0].value,
        statusValue: props.status[0].value,
      }}
      onSubmit={(values) => {
        // console.log("input", props.initCardData)
        // console.log("values", values);
        if (props.initCardData) {
          let filter: (ProgressReferenceType | null)[] = props.initCardData;
          // 部署フィルター
          if (values.group !== "all") {
            filter = filter.filter((datum) => datum?.groupId === values.group);
          }
          // 年度フィルター
          filter = filter.filter(
            (datum) => datum?.year.toString() === values.year
          );
          // ステータスフィルター
          if (values.statusValue !== "all") {
            // all が選択されていない場合のみフィルター
            filter = filter.filter(
              (datum) => datum?.statusValue.toString() === values.statusValue
            );
          }
          // console.log("filter", filter)

          //ソート
          filter.sort(function (a, b) {
            if (a && b) {
              if (a.groupId > b.groupId) return 1;
              if (a.groupId < b.groupId) return -1;
              if (a.employeeId > b.employeeId) return 1;
              if (a.employeeId < b.employeeId) return -1;
            }
            return 0;
          });
          props.setCardData(filter);
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Space>
            <Text>部署</Text>
            <PullDown
              name="group"
              handleChange={formik.handleChange}
              options={props.groups}
            ></PullDown>
          </Space>

          <Space>
            <Text>年度</Text>
            <PullDown
              name="year"
              handleChange={formik.handleChange}
              options={props.years}
            ></PullDown>
          </Space>

          <Space>
            <Text>ステータス</Text>
            <PullDown
              name="statusValue"
              handleChange={formik.handleChange}
              options={props.status}
            ></PullDown>
          </Space>

          <Space>
            <CommandButton type="submit">確認</CommandButton>
          </Space>
        </form>
      )}
    </Formik>
  );
}

const Space = styled.span({
  display: "inline-block",
  margin: "0 10px",
});

import React from "react";
import { CSVLink } from "react-csv";
import styled from "styled-components";
import { ProgressReferenceType } from "./ProgressCard";
import { Button } from "react-bootstrap";

type PropsType = {
  params: (ProgressReferenceType | null)[];
};

export default function (props: PropsType): JSX.Element {
  // const csvData = [
  //   ["firstname", "lastname", "email"],
  //   ["Ahmed", "Tomi", "ah@smthing.co.com"],
  //   ["Raed", "Labes", "rl@smthing.co.com"],
  //   ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  // ];
  const csvData = props.params.map((param) => [
    param?.groupName,
    param?.empNo,
    param?.employeeName,
    param?.overAllEvaluation,
  ]);
  csvData.unshift(["部署名", "社員番号", "社員名", "総合評価"]);
  return (
    <Button variant="primary">
      <CSVLink data={csvData}>
        <ButtonStyle>Download CSV</ButtonStyle>
      </CSVLink>
    </Button>
  );
}

const ButtonStyle = styled.span({
  color: "white",
});

import React from "react";
import { CSVLink } from "react-csv";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { TableEvaluationListType } from "./TableEvaluationList";
import dateFormat from "dateformat";

type PropsType = {
  params: (TableEvaluationListType | null)[];
};

export default function (props: PropsType): JSX.Element {
  const csvData = props.params.map((param) => [
    param?.groupName,
    param?.data.empNo,
    param?.name,
    param?.overAllEvaluation || "未評価",
  ]);
  csvData.unshift(["部署名", "社員番号", "社員名", "総合評価"]);
  return (
    <Button variant="primary">
      <CSVLink
        data={csvData}
        filename={`Rating_data_${dateFormat(new Date(), "yyyymmdd")}.csv`}
      >
        <ButtonStyle>評価データCSV出力</ButtonStyle>
      </CSVLink>
    </Button>
  );
}

const ButtonStyle = styled.span({
  color: "white",
});

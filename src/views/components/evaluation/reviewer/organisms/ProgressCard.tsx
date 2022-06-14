import { getStatusValue } from "lib/getStatusValue";
import { round } from "lib/util";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled, { CSSProperties } from "styled-components";
import BadgeStatus from "views/components/common/molecules/BadgeStatus";
import GaugeObjective from "views/components/common/molecules/GaugeObjective";
import GaugeSheet from "views/components/common/molecules/GaugeSheet";

export type ProgressReferenceType = {
  groupId: string;
  year: number;
  employeeId: string;
  employeeName: string;
  groupName: string;
  avg: number | null;
  gaugeId: string | null;
  statusValue: number;
  dest: string;
  objective:
    | ({
        categoryId: string;
        categoryName: string;
        avg: number | null;
        gaugeId: string | null;
      } | null)[]
    | null;

  //csv出力用の特別に仕様するパラメータ
  overAllEvaluation: number | null;
  empNo: string | null;
};

type Props = ProgressReferenceType;

export default function (props: Props): JSX.Element {
  return (
    <Card style={cardStyle}>
      <Link to={props.dest} style={cardLinkStyle} />
      <Card.Header>
        <CardTitle>
          {props.employeeName}
          &nbsp;
          {props.groupName}
          &nbsp;
          {typeof props.avg === "number"
            ? `${round(props.avg, 2).toFixed(1)}%`
            : null}
          {typeof props.avg === "number" && props.gaugeId ? (
            <GaugeSheet id={props.gaugeId} value={props.avg / 100} />
          ) : null}
        </CardTitle>

        {props.statusValue ? (
          <StatusBoxStyle>
            <BadgeStatus>{getStatusValue(props.statusValue)}</BadgeStatus>
          </StatusBoxStyle>
        ) : null}
      </Card.Header>
      <Card.Body>
        {props.objective?.map((obj) => {
          return obj &&
            obj.categoryId &&
            typeof obj.avg === "number" &&
            obj.gaugeId ? (
            <div id={obj.categoryId}>
              {obj.categoryName}&nbsp;{round(obj.avg, 2).toFixed(1)}%
              <GaugeObjective id={obj.gaugeId} value={obj.avg / 100} />
            </div>
          ) : obj && obj.categoryId && obj.gaugeId ? (
            <div id={obj.categoryId}>
              {obj.categoryName}
              &nbsp;-
            </div>
          ) : null;
        })}
      </Card.Body>
    </Card>
  );
}

const cardStyle: CSSProperties = {
  position: "relative",
};
const cardLinkStyle: CSSProperties = {
  position: "absolute",
  top: "0",
  left: "0",
  height: "100%",
  width: "100%",
};

const CardTitle = styled.div({
  width: "50%",
  display: "inline-block",
});

const StatusBoxStyle = styled.div({
  fontSize: "2rem",
  display: "inline-block",
  marginLeft: "auto",
  width: "50%",
  textAlign: "right",
});

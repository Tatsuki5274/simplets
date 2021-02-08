import ApprovalStatusBox from "common/approvalStatusBox";
import { round } from "lib/util";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CSSProperties } from "styled-components";
import GaugeObjective from "views/components/molecules/GaugeObjective";
import GaugeSheet from "views/components/molecules/GaugeSheet";

export type ProgressReferenceType = {
    groupId: string,
    year: number,
    employeeId: string,
    employeeName: string
    groupName: string,
    avg: number | null,
    gaugeId: string | null,
    statusValue: number,
    dest: string,
    objective: ({
        categoryId: string,
        categoryName: string,
        avg: number | null,
        gaugeId: string | null,
    } | null)[] | null
}

type Props = ProgressReferenceType

export default function (props: Props) {
    return (
        <Card
            style={cardStyle}
        >
            <Link
                to={props.dest}
                style={cardLinkStyle}
            />
            <Card.Header>
                {props.employeeName}
                &nbsp;
                {props.groupName}
                &nbsp;
                {props.avg ?
                    `${round(props.avg, 2).toFixed(1)}%` : null}
                {props.avg && props.gaugeId ?
                    <GaugeSheet
                        id={props.gaugeId}
                        value={props.avg / 100}
                    />
                    : null}
                {props.statusValue ?
                    <ApprovalStatusBox
                        statusValue={props.statusValue}
                    />

                    : null}
            </Card.Header>
            <Card.Body>
                {props.objective?.map(obj => {
                    return obj && obj.categoryId && obj.avg && obj.gaugeId ?
                        <div id={obj.categoryId}>
                            {obj.categoryName}&nbsp;{round(obj.avg, 2).toFixed(1)}%
                            <GaugeObjective
                                id={obj.gaugeId}
                                value={obj.avg / 100}
                            />
                        </div> : obj && obj.categoryId && obj.gaugeId ?
                            <div id={obj.categoryId}>
                                {obj.categoryName}
                             &nbsp;-
                         </div> :
                            null
                })}
            </Card.Body>
        </Card>
    )
}

const cardStyle: CSSProperties = {
    position: "relative"
}
const cardLinkStyle: CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0",
    height: "100%",
    width: "100%",
}
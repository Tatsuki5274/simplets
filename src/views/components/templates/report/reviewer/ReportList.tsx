import { ReportWorkingStatus } from "API";
import React from "react";
import styled from "styled-components";
import { LinkType, SelectLabel } from "views/components/atoms/Types";
import Title from "views/components/molecules/Title";
import Header, { HeaderProps } from "views/components/organisms/common/Header";
import ReportListFilter, { ReviewerReportFilterEmployeeType } from "views/components/organisms/report/reviewer/ReportListFilter";
import TableReportList, { ReviewerReportListEmployeeType } from "views/components/organisms/report/reviewer/TableReportList";
import Container from "../../Container";
import Content from "../../Content";
import LeftBox from "../../LeftBox";
import RightBox from "../../RightBox";
import Sidebar from "../../Sidebar";

type Props = {
    data: {
        // date: Date,
        date: string,
        commentWork: string
        commentStatus: string
        commentOther: string
        commentSuperior: string
        workStatus: ReportWorkingStatus
    }[] | null,
    setTable: React.Dispatch<React.SetStateAction<ReviewerReportListEmployeeType[] | null>>
    filter: {
        groups: SelectLabel[] | null
        reviewee: ReviewerReportFilterEmployeeType[] | null
    }
    header: HeaderProps | null
    sidebar: LinkType[][] | null
}

export default function (props: Props) {
    return (
        <>
            <Header
                {...props.header}
            />
            <Container>
                <LeftBox>
                    <Sidebar
                        data={props.sidebar}
                    />
                </LeftBox>
                <RightBox>
                    <Content>
                        <>
                            <ReportListStyle>
                                <Title>報告参照　社員</Title>
                            </ReportListStyle>

                            {props.filter && props.filter.groups && props.filter.reviewee ?
                                <ReportListStyle>
                                    <ReportListFilter
                                        groups={props.filter.groups}
                                        reviewee={props.filter.reviewee}
                                        setTable={props.setTable}
                                    />
                                </ReportListStyle> : null}

                            <TableReportList
                                data={props.data}
                            />
                        </>
                    </Content>
                </RightBox>
            </Container>
        </>
    )
}

const ReportListStyle = styled.div({
    paddingBottom: "10px"
})
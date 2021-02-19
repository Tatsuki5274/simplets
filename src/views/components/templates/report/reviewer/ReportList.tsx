import { ReportWorkingStatus } from "API";
import React from "react";
import Text from "views/components/atoms/Text";
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
    revieweeName: string
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
                            <Title>作業報告書表示画面</Title>
                            {props.filter && props.filter.groups && props.filter.reviewee? 
                            <ReportListFilter
                                groups={props.filter.groups}
                                reviewee={props.filter.reviewee}
                                setTable={props.setTable}
                            /> : null}

                            <Text>報告者　{props.revieweeName}</Text>
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
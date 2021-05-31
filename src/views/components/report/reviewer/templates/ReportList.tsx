import { ReportWorkingStatus } from "API";
import React from "react";
import styled from "styled-components";
import { SelectLabel, LinkType } from "views/components/common/atoms/Types";
import Title from "views/components/common/molecules/Title";
import Header, { HeaderProps } from "views/components/common/organisms/Header";
import Container from "views/components/common/templates/Container";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";
import ReportListFilter, {
  ReviewerReportFilterEmployeeType,
} from "../organisms/ReportListFilter";
import TableReportList, {
  ReviewerReportListEmployeeType,
} from "../organisms/TableReportList";

type Props = {
  data:
    | {
        // date: Date,
        date: string;
        commentWork: string;
        commentStatus: string;
        commentOther: string;
        commentSuperior: string;
        workStatus: ReportWorkingStatus;
      }[]
    | null;
  setTable: React.Dispatch<
    React.SetStateAction<ReviewerReportListEmployeeType[] | null>
  >;
  filter: {
    groups: SelectLabel[] | null;
    reviewee: ReviewerReportFilterEmployeeType[] | null;
  };
  header: HeaderProps | null;
  sidebar: LinkType[][] | null;
};

export default function (props: Props) {
  return (
    <>
      <Header {...props.header} />
      <Container>
        <LeftBox>
          <Sidebar data={props.sidebar} />
        </LeftBox>
        <RightBox>
          <Content>
            <>
              <ReportListStyle>
                <Title>報告参照 社員</Title>
              </ReportListStyle>

              {props.filter && props.filter.groups && props.filter.reviewee ? (
                <ReportListStyle>
                  <ReportListFilter
                    groups={props.filter.groups}
                    reviewee={props.filter.reviewee}
                    setTable={props.setTable}
                  />
                </ReportListStyle>
              ) : null}

              <TableReportList data={props.data} />
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}

const ReportListStyle = styled.div({
  paddingBottom: "10px",
});

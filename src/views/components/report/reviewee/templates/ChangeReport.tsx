import React from "react";
import styled from "styled-components";
import { LinkType } from "views/components/common/atoms/Types";
import Title from "views/components/common/molecules/Title";
import Header, { HeaderProps } from "views/components/common/organisms/Header";
import Container from "views/components/common/templates/Container";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";
import ChangeReport from "views/components/report/reviewee/organisms/ChangeReport";

type Props = {
  header: HeaderProps | null;
  sidebar: LinkType[][] | null;
  workStatusList: {
    value: string;
    label: string;
  }[];

  data: {
    sub: string;
    date: string;
    companyID: string;
    superior: {
      email: string | null;
      name: string;
    };
    reviewee: string;
    revieweeName: string;
    workStatusValue: string;
    reviewerComments: string;
    commentWork: string;
    commentStatus: string;
    commentOther: string;
    id: string;
  };
};

export default function (props: Props): JSX.Element {
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
              <Title>作業報告入力</Title>
              <ChangeReportStyle>
                <ChangeReport
                  data={props.data}
                  workStatusList={props.workStatusList}
                />
              </ChangeReportStyle>
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}

const ChangeReportStyle = styled.div({
  paddingTop: "10px",
});

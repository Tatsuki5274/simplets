import React from "react";
import styled from "styled-components";
import { LinkType } from "views/components/atoms/Types";
import Title from "views/components/molecules/Title";
import Header, { HeaderProps } from "views/components/organisms/common/Header";
import ChangeReport from "views/components/organisms/report/reviewee/ChangeReport";
import Container from "../../Container";
import Content from "../../Content";
import LeftBox from "../../LeftBox";
import RightBox from "../../RightBox";
import Sidebar from "../../Sidebar";

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

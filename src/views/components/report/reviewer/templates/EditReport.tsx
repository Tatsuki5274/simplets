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
import EditReport from "views/components/report/reviewer/organisms/EditReport";

type Props = {
  header: HeaderProps | null;
  sidebar: LinkType[][] | null;

  data: {
    sub: string;
    revieweeMailAddress: string | null;
    // date: Date
    date: string;
    commentWork: string;
    workStatus: string;
    commentStatus: string;
    commentOther: string;
    commentReviewer: string;
    reviewee: string;
    revieweeName: string;
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
              <Title>作業報告</Title>
              <StyleEditReport>
                <EditReport {...props.data} />
              </StyleEditReport>
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}
const StyleEditReport = styled.div({
  marginTop: "20px",
});

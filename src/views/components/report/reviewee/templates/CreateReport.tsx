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
import CreateReport, {
  RevieweeCreateReportType,
} from "../organisms/CreateReport";

type Props = {
  header: HeaderProps | null;
  sidebar: LinkType[][] | null;
  data: RevieweeCreateReportType;
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
              <CreateReportStyle>
                <CreateReport data={props.data} />
              </CreateReportStyle>
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}

const CreateReportStyle = styled.div({
  paddingTop: "10px",
});

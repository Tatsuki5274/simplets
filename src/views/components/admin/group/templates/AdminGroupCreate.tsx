import React from "react";
import { LinkType } from "views/components/common/atoms/Types";
import Title from "views/components/common/molecules/Title";
import Header, { HeaderProps } from "views/components/common/organisms/Header";
import Container from "views/components/common/templates/Container";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";
import AdminGroupForm from "../organisms/AdminGroupForm";
import Text from "views/components/common/atoms/Text";

type Props = {
  header: HeaderProps | null;
  sidebar: LinkType[][] | null;
  companyId: string;
};

export default function (props: Props): JSX.Element {
  return (
    <>
      <Header {...props.header} />
      <Container>
        <LeftBox>
          <>{props.sidebar ? <Sidebar data={props.sidebar} /> : null}</>
        </LeftBox>
        <RightBox>
          <Content>
            <>
              <Title>部署登録</Title>
              <AdminGroupForm companyId={props.companyId} />
              <Text>
                <p>
                  部署マスタに部署情報を登録できます。
                  <br />
                  <br />
                  ※部署IDは登録後変更する事ができません。
                </p>
              </Text>
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}

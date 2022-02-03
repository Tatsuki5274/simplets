import React from "react";
import { LinkType } from "views/components/common/atoms/Types";
import Title from "views/components/common/molecules/Title";
import AdminCategoryCreateInput from "views/components/admin/category/organisms/AdminCategoryCreateInput";
import Header, { HeaderProps } from "views/components/common/organisms/Header";
import Container from "../../../common/templates/Container";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";

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
              <Title>カテゴリ登録</Title>
              <AdminCategoryCreateInput companyId={props.companyId} />
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}

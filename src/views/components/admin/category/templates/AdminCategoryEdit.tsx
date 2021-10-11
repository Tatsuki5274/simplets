import React from "react";
import { LinkType } from "views/components/common/atoms/Types";
import Title from "views/components/common/molecules/Title";
import Header, { HeaderProps } from "views/components/common/organisms/Header";
import Container from "views/components/common/templates/Container";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";
import AdminCategoryEditForm, {
  AdminCategoryEditDataType,
} from "../organisms/AdminCategoryEditForm";

type Props = {
  header: HeaderProps | null;
  sidebar: LinkType[][] | null;

  category: AdminCategoryEditDataType;
};

export default function (props: Props) {
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
              <Title>カテゴリ変更・削除</Title>
              <AdminCategoryEditForm {...props.category} />
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}

import React from "react";
import Text from "views/components/common/atoms/Text";
import { AdminListCategoryRowType } from "views/components/admin/category/molecules/RowListCategory";
import Header, { HeaderProps } from "views/components/common/organisms/Header";
import { LinkType } from "views/components/common/atoms/Types";
import Title from "views/components/common/molecules/Title";
import Container from "views/components/common/templates/Container";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";
import AdminCategoryList from "../organisms/AdminCategoryList";
import AdminNewCategory from "../organisms/AdminNewCategory";

type Props = {
  header: HeaderProps | null;
  sidebar: LinkType[][] | null;

  data: AdminListCategoryRowType[] | null;
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
              <Title>カテゴリ一覧</Title>
              <AdminNewCategory />
              <AdminCategoryList data={props.data} />
              <Text>
                <p>
                  カテゴリマスタに登録されているカテゴリ情報が表示されます。
                  <br />
                  カテゴリ番号順にシートが作成されます。
                  <br />
                  <br />
                  新規作成：カテゴリ情報を新規作成することができます。
                  <br />
                  変更：登録されているカテゴリの情報を変更することができます。
                  <br />
                  削除：登録されているカテゴリを削除することができます。
                  <br />
                  <br />
                  ※削除したカテゴリは作成済みの業績評価シートには適用されず、カテゴリ削除実施後に作成したシートにのみ適用されます。
                </p>
              </Text>
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}

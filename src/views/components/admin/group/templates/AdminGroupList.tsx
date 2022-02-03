import React from "react";
import { AdminListGroupRowType } from "views/components/admin/group/molecules/RowListGroup";
import { LinkType } from "views/components/common/atoms/Types";
import Title from "views/components/common/molecules/Title";
import Header, { HeaderProps } from "views/components/common/organisms/Header";
import Container from "views/components/common/templates/Container";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";
import AdminGroupNewLinkButton from "../organisms/AdminGroupNewLinkButton";
import AdminListGroupTable from "../organisms/AdminListGroupTable";
import Text from "views/components/common/atoms/Text";

type Props = {
  header: HeaderProps | null;
  sidebar: LinkType[][] | null;
  data: AdminListGroupRowType[] | null;
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
              <Title>部署管理</Title>
              <AdminGroupNewLinkButton />
              {/* <AdminNewEmployee
                                link={props.link}
                            /> */}
              <AdminListGroupTable data={props.data} />
              <Text>
                <p>
                  部署マスタに登録されている部署情報が表示されます。
                  <br />
                  部署番号順に表示されます。
                  <br />
                  <br />
                  新規作成：部署の新規作成が実施できます。
                  <br />
                  変更：部署名の変更、部署情報の削除が実施できます。
                </p>
              </Text>
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}

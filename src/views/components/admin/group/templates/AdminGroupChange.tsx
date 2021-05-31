import React from "react";

import AdminChangeGroupForm from "views/components/admin/group/organisms/AdminChangeGroupForm";
import { LinkType } from "views/components/common/atoms/Types";
import Title from "views/components/common/molecules/Title";
import Header, { HeaderProps } from "views/components/common/organisms/Header";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";
import Container from "../../../common/templates/Container";
import AdminDeleteGroup from "../organisms/AdminDeleteGroup";

type Props = {
  header: HeaderProps | null;
  sidebar: LinkType[][] | null;

  companyId: string;
  groupLocalId: string;
  groupName: string;
  id: string;
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
              <Title>部署変更・削除</Title>
              <AdminChangeGroupForm {...props} />
              <AdminDeleteGroup {...props} />
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}

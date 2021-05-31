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

type Props = {
  header: HeaderProps | null;
  sidebar: LinkType[][] | null;
  data: AdminListGroupRowType[] | null;
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
              <Title>部署管理</Title>
              <AdminGroupNewLinkButton />
              {/* <AdminNewEmployee
                                link={props.link}
                            /> */}
              <AdminListGroupTable data={props.data} />
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}

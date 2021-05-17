import React from "react";
import { LinkType } from "views/components/atoms/Types";
import { AdminListGroupRowType } from "views/components/molecules/admin/RowListGroup";
import Title from "views/components/molecules/Title";
import AdminListGroupTable from "views/components/organisms/admin/group/list/AdminListGroupTable";
import Header, { HeaderProps } from "views/components/organisms/common/Header";
import AdminGroupNewLinkButton from "views/components/organisms/admin/group/list/AdminGroupNewLinkButton";
import Container from "../../Container";
import Content from "../../Content";
import LeftBox from "../../LeftBox";
import RightBox from "../../RightBox";
import Sidebar from "../../Sidebar";

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

import React from "react";
import AdminEmployeeCreateInput from "views/components/admin/employee/organisms/AdminEmployeeCreateInput";
import { LinkType, SelectLabel } from "views/components/common/atoms/Types";
import Title from "views/components/common/molecules/Title";
import Header, { HeaderProps } from "views/components/common/organisms/Header";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";
import Container from "../../../common/templates/Container";
import AdminEmployeeCreateMessage from "views/components/admin/employee/organisms/AdminEmployeeCreateMessage";

type Props = {
  header: HeaderProps | null;
  sidebar: LinkType[][] | null;

  groups: SelectLabel[] | null;
  superiors: SelectLabel[] | null;
  isAdmin: {
    label: string;
    value: string;
  }[];
  manager: {
    label: string;
    value: string;
  }[];
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
              <Title>社員登録</Title>

              {props.superiors && props.groups ? (
                <AdminEmployeeCreateInput
                  groups={props.groups}
                  isAdmin={props.isAdmin}
                  manager={props.manager}
                  superiors={props.superiors}
                  companyId={props.companyId}
                />
              ) : null}
              <AdminEmployeeCreateMessage />
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}

import React from "react";
import { LinkType, SelectLabel } from "views/components/common/atoms/Types";
import Title from "views/components/common/molecules/Title";
import Header, { HeaderProps } from "views/components/common/organisms/Header";
import Container from "views/components/common/templates/Container";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";
import AdminEmployeeEdit, {
  AdminEditEmployeeDataType,
} from "../organisms/AdminEmployeeEdit";

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

  employee: AdminEditEmployeeDataType;
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
              <Title>社員変更・削除</Title>
              {props.groups && props.superiors ? (
                <AdminEmployeeEdit
                  employee={props.employee}
                  groups={props.groups}
                  isAdmin={props.isAdmin}
                  manager={props.manager}
                  superiors={props.superiors}
                />
              ) : null}
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}

import React from "react";
import { LinkType, SelectLabel } from "views/components/atoms/Types";
import Title from "views/components/molecules/Title";
import AdminEmployeeEdit, {
  AdminEditEmployeeDataType,
} from "views/components/organisms/admin/employee/AdminEmployeeEdit";
import Header, { HeaderProps } from "views/components/organisms/common/Header";
import Container from "../../Container";
import Content from "../../Content";
import LeftBox from "../../LeftBox";
import RightBox from "../../RightBox";
import Sidebar from "../../Sidebar";

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

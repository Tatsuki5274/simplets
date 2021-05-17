import React from "react";
import { LinkType, SelectLabel } from "views/components/atoms/Types";
import Title from "views/components/molecules/Title";
import AdminEmployeeFilter from "views/components/organisms/admin/employee/AdminEmployeeFilter";
import AdminEmployeeListApplyPermissions from "views/components/organisms/admin/employee/AdminEmployeeListApplyPermissions";
import AdminListEmployee, {
  AdminEmployeeDataType,
} from "views/components/organisms/admin/employee/AdminListEmployee";
import AdminNewEmployee from "views/components/organisms/admin/employee/AdminNewEmployee";
import Header, { HeaderProps } from "views/components/organisms/common/Header";
import Container from "../../Container";
import Content from "../../Content";
import LeftBox from "../../LeftBox";
import RightBox from "../../RightBox";
import Sidebar from "../../Sidebar";

type Props = {
  header: HeaderProps | null;
  sidebar: LinkType[][] | null;
  tableData: (AdminEmployeeDataType | null)[] | null;
  setTableData: React.Dispatch<
    React.SetStateAction<(AdminEmployeeDataType | null)[] | null>
  >;
  initTableData: (AdminEmployeeDataType | null)[] | null;

  link: {
    label: string;
    dest: string;
  };
  groups: SelectLabel[] | null;
  // data: AdminEmployeeDataType[] | null
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
              <Title>社員管理</Title>
              <AdminNewEmployee link={props.link} />
              {props.groups ? (
                <AdminEmployeeFilter
                  setTableData={props.setTableData}
                  initTableData={props.initTableData}
                  groups={props.groups}
                />
              ) : null}
              {props.tableData ? (
                <AdminListEmployee data={props.tableData} />
              ) : null}
              <AdminEmployeeListApplyPermissions />
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}

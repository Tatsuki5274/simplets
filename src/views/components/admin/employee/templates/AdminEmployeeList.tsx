import React from "react";
import styled from "styled-components";
import { LinkType, SelectLabel } from "views/components/common/atoms/Types";
import Title from "views/components/common/molecules/Title";
import Header, { HeaderProps } from "views/components/common/organisms/Header";
import Container from "views/components/common/templates/Container";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";
import AdminEmployeeFilter from "../organisms/AdminEmployeeFilter";
import AdminEmployeeListApplyPermissions from "../organisms/AdminEmployeeListApplyPermissions";
import AdminListEmployee, {
  AdminEmployeeDataType,
} from "../organisms/AdminListEmployee";
import AdminNewEmployee from "../organisms/AdminNewEmployee";

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
              <MenuStyle>
                <div>
                  <AdminNewEmployee link={props.link} />
                </div>
                {props.groups ? (
                  <FilterBoxStyle>
                    <AdminEmployeeFilter
                      setTableData={props.setTableData}
                      initTableData={props.initTableData}
                      groups={props.groups}
                    />
                  </FilterBoxStyle>
                ) : null}
                <AdminEmployeeListApplyPermissions />
              </MenuStyle>

              {props.tableData ? (
                <AdminListEmployee data={props.tableData} />
              ) : null}
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}

const MenuStyle = styled.div({
  margin: "15px 0",
});

const FilterBoxStyle = styled.div({
  display: "inline-block",
  margin: "0 15px",
});

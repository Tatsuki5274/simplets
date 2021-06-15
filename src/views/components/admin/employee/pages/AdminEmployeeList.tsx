import { EmployeeType } from "API";
import { ErrorContext, HeaderContext, SidebarContext, UserContext } from "App";
import { listEmployeesCompany, listGroupsCompany } from "graphql/queries";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext, useEffect, useState } from "react";
import * as APIt from "API";
import { EmployeeDao } from "lib/dao/employeeDao";
import { routeBuilder } from "router";
import { SelectLabel } from "views/components/common/atoms/Types";
import { AdminEmployeeDataType } from "../organisms/AdminListEmployee";
import AdminEmployeeList from "../templates/AdminEmployeeList";

export default function () {
  const header = useContext(HeaderContext);
  const sidebar = useContext(SidebarContext);

  const [groups, setGroups] = useState<SelectLabel[] | null>(null);
  const [tableData, setTableData] =
    useState<(AdminEmployeeDataType | null)[] | null>(null);
  const [initTableData, setInitTableData] =
    useState<(AdminEmployeeDataType | null)[] | null>(null);

  const currentUser = useContext(UserContext);
  const setError = useContext(ErrorContext);

  const mockData = {
    link: {
      label: "社員登録",
      dest: routeBuilder.adminEmployeeNewPath(),
    },
  };

  useEffect(() => {
    // 社員情報の取得
    (async () => {
      if (currentUser) {
        const companyID = currentUser.attributes["custom:companyId"];
        const listQV: APIt.ListEmployeesCompanyQueryVariables = {
          companyID: companyID,
        };
        const employees = await EmployeeDao.listCompany(
          listEmployeesCompany,
          listQV
        );
        if (employees) {
          const obj: (AdminEmployeeDataType | null)[] = employees.map(
            (employee) => {
              let ret: AdminEmployeeDataType | null = null;
              let link = {
                label: "",
                dest: "",
              };
              link = {
                label: "変更",
                dest: employee?.no
                  ? routeBuilder.adminEmployeeEditPath(employee.no)
                  : "",
              };

              if (
                employee?.email &&
                employee.no &&
                employee.group &&
                employee.group.name &&
                employee.group.no
              ) {
                ret = {
                  link: link,
                  mailAddress: employee.email,
                  employeeName: `${employee.lastName} ${employee.firstName}`,
                  employeeLocalId: employee.no,
                  groupName: employee.group?.name,
                  groupId: employee.group.no,
                  superior: {
                    employeeLocalId: employee.superior?.no || "",
                    lastName: employee.superior?.lastName || "",
                    firstName: employee.superior?.firstName || "",
                  },
                  isAdmin: employee.isCompanyAdmin
                    ? employee.isCompanyAdmin
                    : false,
                  manager: employee.manager || EmployeeType.NORMAL,
                };
              }
              return ret;
            }
          );

          obj.sort(function (a, b) {
            if (a && b) {
              if (a.employeeLocalId > b.employeeLocalId) return 1;
              if (a.employeeLocalId < b.employeeLocalId) return -1;
            }
            return 0;
          });

          setInitTableData(obj);
          setTableData(obj);
        } else {
          setError("社員情報の取得に失敗しました");
        }
      }
    })();
  }, [currentUser]);

  useEffect(() => {
    // 部署情報の取得
    (async () => {
      if (currentUser) {
        const listI: APIt.ListGroupsCompanyQueryVariables = {
          companyID: currentUser.attributes["custom:companyId"],
        };
        const groups = await GroupDao.listCompany(listGroupsCompany, listI);
        if (groups) {
          const groupAll: SelectLabel[] = [
            {
              label: "全て",
              value: "all",
            },
          ];
          const groupsLabel: SelectLabel[] = groups.map((group) => {
            return {
              label: group?.name || "",
              value: group?.no || "",
            };
          });
          setGroups(groupAll.concat(groupsLabel));
        } else {
          setError("部署情報の取得に失敗しました");
        }
      }
    })();
  }, [currentUser]);

  return (
    <>
      <AdminEmployeeList
        header={header}
        sidebar={sidebar}
        tableData={tableData}
        setTableData={setTableData}
        initTableData={initTableData}
        groups={groups}
        link={mockData.link}
      />
    </>
  );
}

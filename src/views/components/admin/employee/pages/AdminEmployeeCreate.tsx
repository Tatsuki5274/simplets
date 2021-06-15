import {
  ListCategorysCompanyQueryVariables,
  ListEmployeesCompanyQueryVariables,
} from "API";
import { ErrorContext, HeaderContext, SidebarContext, UserContext } from "App";
import { listEmployeesCompany, listGroupsCompany } from "graphql/queries";
import { EmployeeDao } from "lib/dao/employeeDao";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext, useEffect, useState } from "react";
import AdminEmployeeCreate from "views/components/admin/employee/templates/AdminEmployeeCreate";
import { SelectLabel } from "views/components/common/atoms/Types";

const mockData = {
  isAdmin: [
    {
      label: "あり",
      value: "true",
    },
    {
      label: "なし",
      value: "false",
    },
  ],
  manager: [
    {
      label: "一般社員",
      value: "NORMAL",
    },
    {
      label: "所属長",
      value: "MANAGER",
    },
    {
      label: "部門長",
      value: "SUPER_MANAGER",
    },
  ],
};

export default function () {
  const header = useContext(HeaderContext);
  const sidebar = useContext(SidebarContext);
  const currentUser = useContext(UserContext);
  const setError = useContext(ErrorContext);

  const [superiors, setSuperiors] = useState<SelectLabel[] | null>(null);
  const [groups, setGroups] = useState<SelectLabel[] | null>(null);

  useEffect(() => {
    // 上司情報の取得
    (async () => {
      if (currentUser) {
        const listI: ListEmployeesCompanyQueryVariables = {
          companyID: currentUser.attributes["custom:companyId"],
        };
        const superiors = await EmployeeDao.listCompany(
          listEmployeesCompany,
          listI
        );
        if (superiors) {
          const noSuperiorLabel: SelectLabel[] = [
            {
              label: "なし",
              value: "",
            },
          ];
          const superiorsLabel: SelectLabel[] = superiors.map((superior) => {
            return {
              label: `${superior?.no} ${superior?.lastName}${superior?.firstName}`,
              value: superior?.username || "",
            };
          });
          setSuperiors(noSuperiorLabel.concat(superiorsLabel));
        } else {
          setError("上司情報の取得に失敗しました");
        }
      }
    })();
  }, [currentUser, setError]);

  useEffect(() => {
    // 部署情報の取得
    (async () => {
      if (currentUser) {
        const listI: ListCategorysCompanyQueryVariables = {
          companyID: currentUser.attributes["custom:companyId"],
        };
        const groups = await GroupDao.listCompany(listGroupsCompany, listI);
        if (groups) {
          // 部署情報をソート
          groups.sort(function (a, b) {
            if (a && b && a.id && b.id) {
              if (a.id < b.id) return 1;
              if (a.id > b.id) return -1;
            }
            return 0;
          });
          const groupsLabel: SelectLabel[] = groups.map((group) => {
            return {
              label: group?.name || "",
              value: group?.id || "",
            };
          });
          setGroups(groupsLabel);
        } else {
          setError("部署情報の取得に失敗しました");
        }
      }
    })();
  }, [currentUser, setError]);

  return currentUser ? (
    <AdminEmployeeCreate
      header={header}
      sidebar={sidebar}
      superiors={superiors}
      groups={groups}
      isAdmin={mockData.isAdmin}
      manager={mockData.manager}
      companyId={currentUser.attributes["custom:companyId"]}
    />
  ) : null;
}

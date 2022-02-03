import {
  BooleanType,
  EmployeeType,
  ListEmployeesCompanyQueryVariables,
  ListGroupsCompanyQueryVariables,
} from "API";
import { ErrorContext, HeaderContext, SidebarContext, UserContext } from "App";
import {
  listGroupsCompany,
  listEmployeesCompany,
  getEmployee,
} from "graphql/queries";
import { EmployeeDao } from "lib/dao/employeeDao";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext, useEffect, useState } from "react";
import { SelectLabel } from "views/components/common/atoms/Types";
import { AdminEditEmployeeDataType } from "../organisms/AdminEmployeeEdit";
import EmployeeEdit from "../templates/EmployeeEdit";

const MockData = {
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

type Props = {
  match: {
    params: {
      employeeId: string;
    };
  };
};

export default function (props: Props): JSX.Element | null {
  const header = useContext(HeaderContext);
  const sidebar = useContext(SidebarContext);

  const currentUser = useContext(UserContext);
  const setError = useContext(ErrorContext);

  const [groups, setGroups] = useState<SelectLabel[] | null>(null);
  const [superiors, setSuperiors] = useState<SelectLabel[] | null>(null);
  const [employee, setEmployee] = useState<AdminEditEmployeeDataType | null>(
    null
  );

  useEffect(() => {
    // 部署情報の取得
    (async () => {
      if (currentUser) {
        const listI: ListGroupsCompanyQueryVariables = {
          companyID: currentUser.attributes["custom:companyId"],
        };
        const groups = await GroupDao.listCompany(listGroupsCompany, listI);
        if (groups) {
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
  }, [currentUser]);

  useEffect(() => {
    // 上司情報の取得
    (async () => {
      if (currentUser) {
        const listI: ListEmployeesCompanyQueryVariables = {
          companyID: currentUser.attributes["custom:companyId"],
          filter: {
            manager: {
              ne: EmployeeType.NORMAL,
            },
          },
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
  }, [currentUser]);

  useEffect(() => {
    // 社員情報の取得
    (async () => {
      if (currentUser) {
        const emp = await EmployeeDao.get(getEmployee, {
          username: props.match.params.employeeId,
        });
        if (!emp) return;
        const employeeItem: AdminEditEmployeeDataType = {
          sub: emp?.sub || "", // unsafe
          username: emp?.username || "",
          companyId: emp?.companyID || "",
          email: emp?.email || "",
          firstName: emp?.firstName || "",
          grade: emp?.grade || "",
          groupId: emp?.group?.id || "",
          isAdminValue: emp?.isCompanyAdmin === true ? "true" : "false",
          lastName: emp?.lastName || "",
          localId: emp?.no || "",
          managerValue: String(emp?.manager),
          superior: emp?.superiorUsername || "",
          isDeleted: emp?.isDeleted || BooleanType.FALSE,
        };
        setEmployee(employeeItem);
      }
    })();
  }, [currentUser, props.match.params.employeeId]);

  return employee ? (
    <EmployeeEdit
      header={header}
      sidebar={sidebar}
      groups={groups}
      superiors={superiors}
      employee={employee}
      isAdmin={MockData.isAdmin}
      manager={MockData.manager}
    />
  ) : null;
}

import { EmployeeType } from "API";
import React from "react";
import RowListEmployee from "views/components/admin/employee/molecules/RowListEmployee";
import ScrollTable from "views/components/common/molecules/ScrollTable";

export type AdminEmployeeDataType = {
  link: { label: string; dest: string };
  mailAddress: string;
  employeeName: string;
  employeeLocalId: string;
  groupName: string;
  groupId: string;
  superior: {
    firstName: string;
    lastName: string;
    employeeLocalId: string;
  };
  isAdmin: boolean;
  manager: EmployeeType;
};

type Props = {
  data: (AdminEmployeeDataType | null)[];
};

export default function (props: Props): JSX.Element {
  return (
    <ScrollTable>
      <thead>
        <tr>
          <td></td>
          <td>メールアドレス</td>
          <td>社員名</td>
          <td>社員番号</td>
          <td>所属部署</td>
          <td>所属長名</td>
          <td>マスタ管理者</td>
          <td>社員データ参照権限</td>
        </tr>
      </thead>
      <tbody>
        {props.data?.map((employee) => {
          return employee ? (
            <RowListEmployee
              link={employee.link}
              mailAddress={employee.mailAddress}
              employeeName={employee.employeeName}
              employeeLocalId={employee.employeeLocalId}
              groupName={employee.groupName}
              superior={`${employee.superior.employeeLocalId} ${employee.superior.lastName}${employee.superior.firstName}`}
              admin={employee.isAdmin === true ? "True" : "False"}
              manager={
                employee.manager === EmployeeType.SUPER_MANAGER
                  ? "部門長"
                  : employee.manager === EmployeeType.MANAGER
                  ? "所属長"
                  : ""
              }
            />
          ) : null;
        })}
      </tbody>
    </ScrollTable>
  );
}

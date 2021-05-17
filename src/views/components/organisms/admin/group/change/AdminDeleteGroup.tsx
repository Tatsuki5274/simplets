import { DeleteGroupInput, ListEmployeesCompanyQueryVariables } from "API";
import { ErrorContext } from "App";
import { deleteGroup } from "graphql/mutations";
import { listEmployeesCompany } from "graphql/queries";
import { EmployeeDao } from "lib/dao/employeeDao";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext } from "react";
import { routeBuilder } from "router";
import ButtonNegative from "views/components/molecules/ButtonNegative";

type Props = {
  companyId: string;
  groupLocalId: string;
  id: string;
};

export default function (props: Props) {
  const setError = useContext(ErrorContext);
  return (
    <ButtonNegative
      onClick={async () => {
        const listI: ListEmployeesCompanyQueryVariables = {
          companyID: props.companyId,
          filter: {
            groupID: {
              eq: props.groupLocalId,
            },
          },
        };
        const employeeItem = await EmployeeDao.listCompany(
          listEmployeesCompany,
          listI
        );

        if (employeeItem && employeeItem.length === 0) {
          const deleteI: DeleteGroupInput = {
            id: props.id,
          };
          const deleteItem = await GroupDao.delete(deleteGroup, deleteI);

          if (deleteItem) {
            window.alert("部署の削除が完了しました");
            window.location.href = routeBuilder.adminGroupListPath();
          } else {
            setError("部署情報の削除に失敗しました");
          }
        } else {
          window.alert("部署に社員が存在するため部署を削除できません");
        }
      }}
    >
      削除
    </ButtonNegative>
  );
}

import { DeleteGroupInput, ListEmployeesCompanyQueryVariables } from "API";
import { ErrorContext } from "App";
import { deleteGroupByCompanyAdmin } from "graphql/mutations";
import { listEmployeesCompany } from "graphql/queries";
import { EmployeeDao } from "lib/dao/employeeDao";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext } from "react";
import { routeBuilder } from "router";
import ButtonNegative from "views/components/common/molecules/ButtonNegative";

type Props = {
  companyId: string;
  groupId: string;
  id: string;
};

export default function (props: Props): JSX.Element {
  const setError = useContext(ErrorContext);
  return (
    <ButtonNegative
      onClick={async () => {
        const listI: ListEmployeesCompanyQueryVariables = {
          companyID: props.companyId,
          filter: {
            groupID: {
              eq: props.groupId,
            },
          },
        };
        const employeeItem = await EmployeeDao.listCompany(
          listEmployeesCompany,
          listI
        );

        if (window.confirm("部署情報を削除してもよろしいでしょうか？")) {
          if (!employeeItem) {
            setError("社員情報の取得に失敗しました");
            return;
          }
          if (employeeItem && employeeItem.length === 0) {
            const deleteI: DeleteGroupInput = {
              id: props.id,
            };
            const deleteItem = await GroupDao.deleteByAdmin(
              deleteGroupByCompanyAdmin,
              deleteI
            );

            if (deleteItem) {
              window.alert("部署の削除が完了しました");
              window.location.href = routeBuilder.adminGroupListPath();
            } else {
              setError("部署情報の削除に失敗しました");
            }
          } else {
            window.alert("部署に社員が存在するため部署を削除できません");
          }
        }
      }}
    >
      削除
    </ButtonNegative>
  );
}

import { Formik } from "formik";
import React from "react";
import { SelectLabel } from "views/components/common/atoms/Types";
import CommandButton from "views/components/common/molecules/CommandButton";
import PullDown from "views/components/common/molecules/PullDown";
import { AdminEmployeeDataType } from "./AdminListEmployee";

type Props = {
  groups: SelectLabel[];
  setTableData: React.Dispatch<
    React.SetStateAction<(AdminEmployeeDataType | null)[] | null>
  >;
  initTableData: (AdminEmployeeDataType | null)[] | null;
};

export default function (props: Props) {
  return (
    <Formik
      initialValues={{
        groupList: props.groups[0].value,
      }}
      onSubmit={(values) => {
        if (props.initTableData) {
          let filter: (AdminEmployeeDataType | null)[] = props.initTableData;
          // 部署フィルター
          if (values.groupList !== "all") {
            filter = filter.filter(
              (datum) => datum?.groupId === values.groupList
            );
          }

          // ソート
          filter.sort(function (a, b) {
            if (a && b) {
              if (a.groupId > b.groupId) return 1;
              if (a.groupId < b.groupId) return -1;
              if (a.employeeLocalId > b.employeeLocalId) return 1;
              if (a.employeeLocalId < b.employeeLocalId) return -1;
            }
            return 0;
          });
          props.setTableData(filter);
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          {props.groups ? (
            <>
              <PullDown
                name="groupList"
                options={props.groups}
                handleChange={formik.handleChange}
              />
              <CommandButton type="submit">確認</CommandButton>
            </>
          ) : null}
        </form>
      )}
    </Formik>
  );
}

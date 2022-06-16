import {
  BooleanType,
  DeleteEmployeeInput,
  DeleteReportInput,
  DeleteSheetInput,
  EmployeeType,
  ListEmployeesCompanyQueryVariables,
  ListReportsSubQueryVariables,
  ListSheetsRevieweeQueryVariables,
  UpdateEmployeeInput,
  UpdateReportInput,
  UpdateSheetInput,
} from "API";
import { EmployeeContext, ErrorContext } from "App";
import { Formik } from "formik";
import {
  deleteEmployeeByCompanyAdmin,
  deleteReportByCompanyAdmin,
  updateEmployeeByCompanyAdmin,
  updateSheet,
} from "graphql/mutations";
import { listEmployeesCompany, listSheetsReviewee } from "graphql/queries";
import { EmployeeDao } from "lib/dao/employeeDao";
import { SheetDao } from "lib/dao/sheetDao";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { routeBuilder } from "router";
import styled from "styled-components";
import Button from "views/components/common/atoms/Button";
import Text from "views/components/common/atoms/Text";
import TextField from "views/components/common/atoms/TextField";
import { SelectLabel } from "views/components/common/atoms/Types";
import ButtonNegative from "views/components/common/molecules/ButtonNegative";
import CommandButton from "views/components/common/molecules/CommandButton";
import PullDown from "views/components/common/molecules/PullDown";
import { ReportDao } from "lib/dao/reportDao";
import { updateReportByCompanyAdmin } from "graphql/mutations";
import { listReportsSub } from "graphql/queries";
import { IOError } from "lib/exception";

export type AdminEditEmployeeDataType = {
  username: string;
  companyId: string;
  localId: string;
  email: string;
  lastName: string;
  firstName: string;
  groupId: string;
  grade: string;
  superior: string;
  isAdminValue: string;
  managerValue: string;
  isDeleted: BooleanType;
  sub: string;
};

type Props = {
  groups: SelectLabel[];
  superiors: SelectLabel[];
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

type FormType = {
  lastName: string;
  firstName: string;
  groupList: string | null;
  grade: string;
  superiorList: string | null;
  isAdmin: string | null;
  manager: string | null;
};

export default function (props: Props): JSX.Element {
  const setError = useContext(ErrorContext);
  const history = useHistory();
  const currentEmployee = useContext(EmployeeContext);

  // 社員の削除を押下した時の処理
  const onClickDeleteEmployee = async () => {
    // 対象社員の部下を取得
    const listI: ListEmployeesCompanyQueryVariables = {
      companyID: props.employee.companyId,
      no: {
        eq: props.employee.localId,
      },
      filter: {
        superiorUsername: {
          eq: props.employee.username,
        },
      },
    };
    const listItem = await EmployeeDao.listCompany(listEmployeesCompany, listI);
    if (!listItem) {
      setError("社員情報の取得に失敗しました");
      return;
    }
    // 対象社員の部下が存在しない場合
    if (listItem.length === 0) {
      const listI: ListSheetsRevieweeQueryVariables = {
        sub: props.employee.sub,
      };
      const sheetItems = await SheetDao.listReviewee(listSheetsReviewee, listI);

      if (
        window.confirm(
          "過去の評価データと作業報告がある場合は全て削除されます。社員情報を削除してもよろしいでしょうか？"
        )
      ) {
        //対象社員の作業報告情報の削除
        let deleteReportNum = 0;
        const reportItem: ListReportsSubQueryVariables = {
          sub: props.employee.sub,
        };
        const reports = await ReportDao.listSub(listReportsSub, reportItem);
        if (!reports) {
          setError("作業報告情報の取得に失敗しました");
          return;
        }
        await Promise.all(
          reports.map(async (report) => {
            if (!report?.id) {
              // idが取得できない場合はスキップ
              return;
            }
            const deleteReportI: DeleteReportInput = {
              id: report.id,
            };
            const deleteReportItem = await ReportDao.deleteByAdmin(
              deleteReportByCompanyAdmin,
              deleteReportI
            );
            if (!deleteReportItem) {
              setError("作業報告情報の削除に失敗しました");
              return;
            }
            deleteReportNum++;
          })
        );

        // 報告書の削除件数を表示する
        window.alert(`${deleteReportNum}件の報告書の削除が完了しました`);

        //対象社員のシート情報の削除
        let deletedNum = 0;
        if (!sheetItems) {
          setError("シート情報の取得に失敗しました");
          return;
        }
        await Promise.all(
          sheetItems.map(async (sheet) => {
            if (!sheet?.id) {
              // idが取得できない場合はスキップ
              return;
            }
            const deleteSheetI: DeleteSheetInput = {
              id: sheet.id,
            };
            const deleteSheetItem = await SheetDao.deleteWithChildren(
              deleteSheetI
            );
            if (!deleteSheetItem) {
              setError("シート情報の削除に失敗しました");
              return;
            }
            deletedNum++;
          })
        );

        // 評価シートの削除件数を表示する
        window.alert(`${deletedNum}件のシート情報の削除が完了しました`);

        // 対象社員情報の削除
        const deleteEmployeeI: DeleteEmployeeInput = {
          username: props.employee.username,
        };
        const deleteEmployeeItem = await EmployeeDao.deleteByAdmin(
          deleteEmployeeByCompanyAdmin,
          deleteEmployeeI
        );
        if (deleteEmployeeItem) {
          window.alert("社員情報の削除が完了しました");
          history.push(routeBuilder.adminEmployeeListPath());
        } else {
          setError("社員情報の削除に失敗しました");
        }
      }
    } else {
      // 対象社員の部下の氏名を取得
      const revieweeNames: string[] = [];
      listItem.forEach((element) => {
        return revieweeNames.push(`${element?.lastName} ${element?.firstName}`);
      });
      let displayReviewee = "";
      for (let i = 0; i < revieweeNames.length; i++) {
        displayReviewee = displayReviewee + revieweeNames[i];
        if (i !== revieweeNames.length - 1) {
          displayReviewee = displayReviewee + "、";
        }
      }
      window.alert(`削除できません。部下：${displayReviewee}`);
    }
  };

  // 編集操作を確定するときの処理
  const onSubmitForm = async (values: FormType) => {
    try {
      if (window.confirm("変更内容を保存してよろしいですか？")) {
        const updateI: UpdateEmployeeInput = {
          companyID: props.employee.companyId,
          username: props.employee.username,
          lastName: values.lastName,
          firstName: values.firstName,
          groupID: values.groupList,
          grade: values.grade,
          isCompanyAdmin: values.isAdmin === "true" ? true : false,
          superiorUsername: values.superiorList || "",
          manager:
            values.manager === "MANAGER"
              ? EmployeeType.MANAGER
              : values.manager === "SUPER_MANAGER"
              ? EmployeeType.SUPER_MANAGER
              : values.manager === "NORMAL"
              ? EmployeeType.NORMAL
              : null,
          isDeleted: props.employee.isDeleted,
        };
        const updateItem = await EmployeeDao.updateByAdmin(
          updateEmployeeByCompanyAdmin,
          updateI
        );
        if (updateItem) {
          // シートの等級情報を更新
          if (
            props.employee.grade !== values.grade ||
            props.employee.groupId !== values.groupList
          ) {
            const today: Date = new Date();
            const startMonth = currentEmployee?.company?.startMonth;
            if (startMonth) {
              const dateMonth = startMonth - 1;
              const targetYear =
                today.getMonth() < dateMonth
                  ? today.getFullYear() - 1
                  : today.getFullYear();
              const listI: ListSheetsRevieweeQueryVariables = {
                sub: props.employee.sub,
                year: {
                  eq: targetYear,
                },
              };
              const listItem = await SheetDao.listReviewee(
                listSheetsReviewee,
                listI
              );
              if (listItem && listItem.length > 0) {
                if (listItem.length > 1) {
                  // 今年度のシートが複数作成されている場合
                  throw new RangeError(
                    "今年度のシート情報が複数存在しています"
                  );
                }
                const sheet = listItem[0];
                if (!sheet?.id) {
                  // IDが入力されていない場合は不整合
                  throw new TypeError("idに想定されていない値が含まれます");
                }
                const statusValue = sheet?.statusValue || null;
                if (statusValue !== 14) {
                  // 更新対象外であれば、更新処理を実施しない
                  const updateI: UpdateSheetInput = {
                    id: sheet?.id,
                    grade: values.grade,
                    groupID: values.groupList,
                    sheetGroupName: props.groups.find(
                      (element) => element.value === values.groupList
                    )?.label,
                  };
                  const updateItem = await SheetDao.update(
                    updateSheet,
                    updateI
                  );
                  if (!updateItem) {
                    throw new TypeError("シート情報の更新に失敗しました");
                  }
                }
              }
              //変更対象社員のすべての作業報告(report)の部署(groupIdフィールド)を変更後の社員の部署idに付け替える。
              //処理はフロントエンドで非同期で実行する。
              const reportItem: ListReportsSubQueryVariables = {
                sub: props.employee.sub,
              };
              const reports = await ReportDao.listSub(
                listReportsSub,
                reportItem
              );
              if (reports && reports.length > 0) {
                await Promise.all(
                  reports.map(async (report) => {
                    if (!report?.id) {
                      // idが取得できない場合はスキップ
                      return;
                    }
                    const updateI: UpdateReportInput = {
                      id: report.id,
                      groupID: props.employee.groupId,
                    };
                    const updateItem = await ReportDao.updateByAdmin(
                      updateReportByCompanyAdmin,
                      updateI
                    );
                    if (!updateItem) {
                      throw new IOError("作業報告の更新に失敗しました");
                    }
                  })
                );
              }
            }
          }
          window.alert(
            "社員情報を変更しました。全ての変更が完了したら反映ボタンを押して変更を確定させてください。"
          );
          history.push(routeBuilder.adminEmployeeListPath());
        } else {
          setError("社員情報の更新に失敗しました");
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        throw new Error("不明なエラーです");
      }
    }
  };

  return (
    <Formik<FormType>
      initialValues={{
        lastName: props.employee.lastName,
        firstName: props.employee.firstName,
        groupList:
          props.groups.find((group) => group.value === props.employee.groupId)
            ?.value || null,
        grade: props.employee.grade,
        superiorList:
          props.superiors.find(
            (employee) => employee.value === props.employee.superior
          )?.value || null,
        isAdmin:
          props.isAdmin.find(
            (flag) => flag.value === props.employee.isAdminValue
          )?.value || null,
        manager:
          props.manager.find((mgr) => mgr.value === props.employee.managerValue)
            ?.value || null,
      }}
      onSubmit={onSubmitForm}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <table>
            <tr>
              <td>
                <Text>社員番号</Text>
              </td>
              <td>
                <Text>{props.employee.localId}</Text>
              </td>
            </tr>

            <tr>
              <td>
                <Text>社員氏名</Text>
              </td>
              <td>
                <TextField
                  name="lastName"
                  onChange={formik.handleChange}
                  defaultValue={props.employee.lastName}
                />
                <TextField
                  name="firstName"
                  onChange={formik.handleChange}
                  defaultValue={props.employee.firstName}
                />
              </td>
            </tr>

            <tr>
              <td>
                <Text>所属部署</Text>
              </td>
              <td>
                <PullDown
                  name="groupList"
                  handleChange={formik.handleChange}
                  options={props.groups}
                  defaultIndex={props.groups.findIndex(
                    (element) => element.value === props.employee.groupId
                  )}
                />
              </td>
            </tr>

            <tr>
              <td>
                <Text>メールアドレス</Text>
              </td>
              <td>
                <Text>{props.employee.email}</Text>
              </td>
            </tr>

            <tr>
              <td>
                <Text>等級</Text>
              </td>
              <td>
                <TextField
                  name="grade"
                  onChange={formik.handleChange}
                  defaultValue={props.employee.grade}
                />
              </td>
            </tr>

            <tr>
              <td>
                <Text>所属長</Text>
              </td>
              <td>
                <PullDown
                  name="superiorList"
                  handleChange={formik.handleChange}
                  options={props.superiors}
                  defaultIndex={
                    props.employee.superior
                      ? props.superiors.findIndex(
                          (element) => element.value === props.employee.superior
                        )
                      : 0
                  }
                />
              </td>
            </tr>

            <tr>
              <td>
                <Text>マスター管理</Text>
              </td>
              <td>
                <PullDown
                  name="isAdmin"
                  handleChange={formik.handleChange}
                  options={props.isAdmin}
                  defaultIndex={props.isAdmin.findIndex(
                    (element) => element.value === props.employee.isAdminValue
                  )}
                />
              </td>
            </tr>

            <tr>
              <td>
                <Text>参照権限</Text>
              </td>
              <td>
                <PullDown
                  name="manager"
                  handleChange={formik.handleChange}
                  options={props.manager}
                  defaultIndex={props.manager.findIndex(
                    (element) => element.value === props.employee.managerValue
                  )}
                />
              </td>
            </tr>

            <SpaceStyle>
              <CommandButton type="submit">変更</CommandButton>
            </SpaceStyle>

            <SpaceStyle>
              <Button href={routeBuilder.adminEmployeeListPath()}>
                キャンセル
              </Button>
            </SpaceStyle>

            <SpaceStyle>
              <ButtonNegative onClick={onClickDeleteEmployee}>
                削除
              </ButtonNegative>
            </SpaceStyle>
          </table>
        </form>
      )}
    </Formik>
  );
}

const SpaceStyle = styled.div({
  display: "inline-block",
  margin: "0 10px",
});

import { BooleanType, DeleteEmployeeInput, DeleteSheetInput, EmployeeType, ListEmployeesCompanyQueryVariables, ListSheetsRevieweeQueryVariables, UpdateEmployeeInput } from "API";
import { ErrorContext } from "App";
import { Formik } from "formik";
import { deleteEmployee, deleteSheet, updateEmployee } from "graphql/mutations";
import { listEmployeesCompany, listSheetsReviewee } from "graphql/queries";
import { EmployeeDao } from "lib/dao/employeeDao";
import { SheetDao } from "lib/dao/sheetDao";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { routeBuilder } from "router";
import styled from "styled-components";
import Button from "views/components/atoms/Button";
import Text from "views/components/atoms/Text";
import TextField from "views/components/atoms/TextField";
import { SelectLabel } from "views/components/atoms/Types";
import ButtonNegative from "views/components/molecules/ButtonNegative";
import CommandButton from "views/components/molecules/CommandButton";
import PullDown from "views/components/molecules/PullDown";

export type AdminEditEmployeeDataType = {
    username: string,
    companyId: string,
    localId: string,
    email: string,
    lastName: string,
    firstName: string,
    groupId: string,
    grade: string,
    superior: string,
    isAdminValue: string,
    managerValue: string,
    isDeleted: BooleanType,
    sub: string,
}

type Props = {
    groups: SelectLabel[],
    superiors: SelectLabel[],
    isAdmin: {
        label: string
        value: string
    }[],
    manager: {
        label: string
        value: string
    }[],

    employee: AdminEditEmployeeDataType
}

export default function (props: Props) {
    const setError = useContext(ErrorContext);
    const history = useHistory();

    return (
        <Formik
            initialValues={{
                lastName: props.employee.lastName,
                firstName: props.employee.firstName,
                groupList: props.groups[props.groups.findIndex((element) => element.value === props.employee.groupId)].value,
                grade: props.employee.grade,
                superiorList: props.employee.superior ? props.superiors[props.superiors.findIndex((element) => element.value === props.employee.superior)].value : props.superiors[0].value,
                isAdmin: props.isAdmin[props.isAdmin.findIndex((element) => element.value === props.employee.isAdminValue)].value,
                manager: props.manager[props.manager.findIndex((element) => element.value === props.employee.managerValue)].value,
            }}
            onSubmit={async (values) => {
                if (window.confirm("変更内容を保存してよろしいですか？")) {
                    console.log("values", values)
                    const updateI: UpdateEmployeeInput = {
                        companyID: props.employee.companyId,
                        username: props.employee.username,
                        lastName: values.lastName,
                        firstName: values.firstName,
                        groupID: values.groupList,
                        grade: values.grade,
                        isCompanyAdmin: values.isAdmin === "true" ? true : false,
                        superiorUsername: values.superiorList,
                        manager: values.manager === "MANAGER" ? EmployeeType.MANAGER : values.manager === "SUPER_MANAGER" ? EmployeeType.SUPER_MANAGER : values.manager === "NORMAL" ? EmployeeType.NORMAL : null,
                        isDeleted:  props.employee.isDeleted,
                        
                    }
                    const updateItem = await EmployeeDao.update(updateEmployee, updateI);
                    if (updateItem) {
                        window.alert("社員情報を変更しました");
                        history.push(routeBuilder.adminEmployeeListPath());
                    } else {
                        console.log("社員情報の更新に失敗しました");
                        setError("社員情報の更新に失敗しました");
                    }
                }
            }}
        >
            {formik => (
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
                                    defaultIndex={props.groups.findIndex((element) => element.value === props.employee.groupId)}
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
                                    defaultIndex={props.employee.superior ? props.superiors.findIndex((element) => element.value === props.employee.superior) : 0}
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
                                    defaultIndex={props.isAdmin.findIndex((element) => element.value === props.employee.isAdminValue)}
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
                                    defaultIndex={props.manager.findIndex((element) => element.value === props.employee.managerValue)}
                                />
                            </td>
                        </tr>

                        <SpaceStyle>
                            <CommandButton type="submit">変更</CommandButton>
                        </SpaceStyle>

                        <SpaceStyle>
                            <Button href={routeBuilder.adminEmployeeListPath()}>キャンセル</Button>
                        </SpaceStyle>

                        <SpaceStyle>
                            <ButtonNegative
                                onClick={async () => {
                                    // 対象社員の部下を取得
                                    const listI: ListEmployeesCompanyQueryVariables = {
                                        companyID: props.employee.companyId,
                                        no: {
                                            eq: props.employee.localId,
                                        },
                                        filter: {
                                            superiorUsername: {
                                                eq: props.employee.username
                                            }
                                        }
                                    }
                                    const listItem = await EmployeeDao.listCompany(listEmployeesCompany, listI);
                                    if (listItem) {
                                        // 対象社員の部下が存在しない場合
                                        if (listItem.length === 0) {

                                            const listI: ListSheetsRevieweeQueryVariables = {
                                                sub: props.employee.sub
                                            }
                                            const sheetItems = await SheetDao.listReviewee(listSheetsReviewee, listI);

                                            if (sheetItems) {
                                                // 対象社員のシート情報が存在する場合
                                                if (sheetItems.length > 0) {
                                                    if (window.confirm("過去の評価データも削除されますが、社員情報を削除してよろしいですか？")) {

                                                        //対象社員のシート情報の削除
                                                        let deletedNum = 0;
                                                        sheetItems.map(async (sheet, index) => {
                                                            if (sheet.sub && sheet.year) {
                                                                const deleteSheetI: DeleteSheetInput = {
                                                                    id: sheet.id,
                                                                }
                                                                const deleteSheetItem = await SheetDao.delete(deleteSheet, deleteSheetI);
                                                                if (deleteSheetItem) {
                                                                    deletedNum++;
                                                                } else {
                                                                    console.log("シート情報の削除に失敗しました");
                                                                    setError("シート情報の削除に失敗しました");
                                                                }
                                                            }
                                                            if (index === sheetItems.length - 1) {
                                                                window.alert(`${deletedNum}件のシート情報の削除が完了しました`);
                                                            }
                                                        })

                                                        // 対象社員情報の削除
                                                        const deleteEmployeeI: DeleteEmployeeInput = {
                                                            username: props.employee.username,
                                                        }
                                                        const deleteEmployeeItem = await EmployeeDao.delete(deleteEmployee, deleteEmployeeI);
                                                        if (deleteEmployeeItem) {
                                                            window.alert("社員情報の削除が完了しました");
                                                            history.push(routeBuilder.adminEmployeeListPath());
                                                        } else {
                                                            console.log("社員情報の削除に失敗しました");
                                                            setError("社員情報の削除に失敗しました");
                                                        }

                                                    }
                                                } else {
                                                    // 対象社員のシート情報が存在しない場合
                                                    if (window.confirm("社員情報を削除してよろしいですか？")) {
                                                        const deleteI: DeleteEmployeeInput = {
                                                            username: props.employee.username,
                                                        }
                                                        const deleteItem = await EmployeeDao.delete(deleteEmployee, deleteI);
                                                        if (deleteItem) {
                                                            window.alert("社員情報の削除が完了しました");
                                                            history.push(routeBuilder.adminEmployeeListPath());
                                                        } else {
                                                            console.log("社員情報の削除に失敗しました");
                                                            setError("社員情報の削除に失敗しました");
                                                        }
                                                    }
                                                }
                                            } else {
                                                console.log("シート情報の取得に失敗しました");
                                                setError("シート情報の取得に失敗しました");
                                            }
                                        } else {

                                            // 対象社員の部下の氏名を取得
                                            const revieweeNames: string[] = [];
                                            listItem.forEach(element => {
                                                return revieweeNames.push(`${element.lastName} ${element.firstName}`)
                                            })
                                            let displayReviewee: string = ""
                                            for (let i = 0; i < revieweeNames.length; i++) {
                                                displayReviewee = displayReviewee + revieweeNames[i]
                                                if (i !== revieweeNames.length - 1) {
                                                    displayReviewee = displayReviewee + "、"
                                                }
                                            }
                                            window.alert(`削除できません。部下：${displayReviewee}`)
                                        }
                                    } else {
                                        console.log("社員情報の取得に失敗しました");
                                        setError("社員情報の取得に失敗しました");
                                    }
                                }}
                            >削除</ButtonNegative>
                        </SpaceStyle>
                    </table>
                </form>
            )}
        </Formik>
    )
}

const SpaceStyle = styled.div({
    display: "inline-block",
    margin: "0 10px",
})
import { BooleanType, CreateEmployeeInput, EmployeeType } from "API";
import { ErrorContext } from "App";
import { Formik } from "formik";
import { createEmployee } from "graphql/mutations";
import { EmployeeDao } from "lib/dao/employeeDao";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { routeBuilder } from "router";
import styled from "styled-components";
import Button from "views/components/atoms/Button";
import Text from "views/components/atoms/Text";
import TextField from "views/components/atoms/TextField";
import { SelectLabel } from "views/components/atoms/Types";
import CommandButton from "views/components/molecules/CommandButton";
import PullDown from "views/components/molecules/PullDown";

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
    companyId: string
}

export default function (props: Props) {
    const history = useHistory();
    const setError = useContext(ErrorContext);

    return (
        <Formik
            initialValues={{
                localID: "",
                lastName: "",
                firstName: "",
                groupList: props.groups[0].value,
                email: "",
                grade: "",
                superiorList: props.superiors ? props.superiors[0].value : "",
                isAdmin: props.isAdmin[0].value,
                manager: props.manager[0].value,
            }}
            onSubmit={async (values) => {
                // console.log("values", values)
                if (window.confirm("社員登録を行いますか？")) {
                    const createI: CreateEmployeeInput = {
                        companyID: props.companyId,
                        email: values.email,
                        employeeGroupLocalId: values.groupList,
                        firstName: values.firstName,
                        grade: values.grade,
                        isDeleted: BooleanType.FALSE,
                        lastName: values.lastName,
                        localID: values.localID,
                        manager: values.manager === "NORMAL" ? EmployeeType.NORMAL : values.manager === "MANAGER" ? EmployeeType.MANAGER : values.manager === "SUPER_MANAGER" ? EmployeeType.SUPER_MANAGER : EmployeeType.OTHER,
                        superiorUsername: values.superiorList,
                        username: values.email,
                        isCompanyAdmin: values.isAdmin === "true" ? true : false,
                    }
                    const createItem = await EmployeeDao.create(createEmployee, createI);
                    if (createItem) {
                        window.confirm("社員情報の登録が完了しました。");
                        history.push(routeBuilder.adminEmployeeListPath());
                    } else {
                        setError("社員情報の登録に失敗しました")
                        console.error("社員情報の登録に失敗しました")
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
                                <TextField
                                    name="localID"
                                    onChange={formik.handleChange}
                                />
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
                                />
                                <TextField
                                    name="firstName"
                                    onChange={formik.handleChange}
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
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Text>メールアドレス</Text>
                            </td>
                            <td>
                                <TextField
                                    name="email"
                                    onChange={formik.handleChange}
                                />
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
                                />
                            </td>
                        </tr>

                        <CommandButton
                            type="submit"
                        >
                            社員登録
                    </CommandButton>
                        <SpaceStyle>
                            <Button href={routeBuilder.adminEmployeeListPath()}>キャンセル</Button>
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
import { Formik } from "formik";
import React from "react";
import styled from "styled-components";
import Button from "views/components/atoms/Button";
import Text from "views/components/atoms/Text";
import TextField from "views/components/atoms/TextField";
import CommandButton from "views/components/molecules/CommandButton";
import PullDown from "views/components/molecules/PullDown";

type Props = {
    groups: {
        label: string
        value: string
    }[],
    superiors: {
        label: string
        value: string
    }[],
    isAdmin: {
        label: string
        value: string
    }[],
    manager: {
        label: string
        value: string
    }[],
}

export default function (props: Props) {
    return (
        <Formik
            initialValues={{
                localID: "",
                lastName: "",
                firstName: "",
                groupList: props.groups[0].value,
                email: "",
                grade: "",
                superiorList: props.superiors[0].value,
                isAdmin: props.isAdmin[0].value,
                manager: props.manager[0].value,
            }}
            onSubmit={(values) => {
                console.log("values", values)
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
                            <Button href="/test">キャンセル</Button>
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
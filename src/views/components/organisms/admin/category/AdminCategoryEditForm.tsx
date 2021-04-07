import { UpdateCategoryInput } from "API";
import { ErrorContext } from "App";
import { Formik } from "formik";
import { updateCategory } from "graphql/mutations";
import { CategoryDao } from "lib/dao/categoryDao";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { routeBuilder } from "router";
import styled from "styled-components";
import Button from "views/components/atoms/Button";
import Text from "views/components/atoms/Text";
import TextField from "views/components/atoms/TextField";
import CommandButton from "views/components/molecules/CommandButton";

export type AdminCategoryEditDataType = {
    companyId: string
    localId: string
    name: string
}

type Props = AdminCategoryEditDataType;

export default function (props: Props) {
    const setError = useContext(ErrorContext);
    const history = useHistory();
    return (
        <Formik
            initialValues={{
                name: props.name,
            }}
            onSubmit={async (values) => {
                const updateI: UpdateCategoryInput = {
                    companyID: props.companyId,
                    localID: props.localId,
                    name: values.name,
                }
                const updateItems = await CategoryDao.update(updateCategory, updateI);
                if (updateItems) {
                    window.alert("カテゴリ内容の変更が完了しました");
                    history.push(routeBuilder.adminCategoryListPath());
                } else {
                    console.log("カテゴリ内容の変更に失敗しました");
                    setError("カテゴリ内容の変更に失敗しました");
                }

            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <table>
                        <tr>
                            <td>
                                <Text>カテゴリID</Text>
                            </td>
                            <td>
                                <Text>{props.localId}</Text>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Text>カテゴリ内容</Text>
                            </td>
                            <td>
                                <TextField
                                    name="name"
                                    onChange={formik.handleChange}
                                    defaultValue={formik.initialValues.name}
                                />
                            </td>
                        </tr>

                        <CommandButton type="submit">変更</CommandButton>

                        <SpaceStyle>
                            <Button href={routeBuilder.adminCategoryListPath()}>
                                キャンセル
                            </Button>
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
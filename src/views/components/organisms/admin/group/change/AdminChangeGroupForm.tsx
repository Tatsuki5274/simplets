import { UpdateGroupInput } from "API";
import { ErrorContext } from "App";
import { Formik } from "formik";
import { updateGroup } from "graphql/mutations";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext } from "react";
import { routeBuilder } from "router";
import styled from "styled-components";
import Button from "views/components/atoms/Button";
import Text from "views/components/atoms/Text";
import TextField from "views/components/atoms/TextField";
import CommandButton from "views/components/molecules/CommandButton";

type Props = {
    companyId: string
    groupLocalId: string
    groupName: string
}

export default function (props: Props) {
    const setError = useContext(ErrorContext);

    return (
        <Formik
            initialValues={{
                groupName: props.groupName,
            }}
            onSubmit={(values) => {
                const updateI: UpdateGroupInput = {
                    companyID: props.companyId,
                    localID: props.groupLocalId,
                    name: values.groupName,
                }
                const updateItem = GroupDao.update(updateGroup, updateI)
                if (updateItem) {
                    window.alert("保存が完了しました")
                } else {
                    console.error("部署情報の更新に失敗しました")
                    setError("部署情報の更新に失敗しました")
                }
            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <table>
                        <tr>
                            <td>
                                <Text>部署ID</Text>
                            </td>
                            <td>
                                <Text>{props.groupLocalId}</Text>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Text>部署名</Text>
                            </td>
                            <td>
                                <TextField
                                    name="groupName"
                                    onChange={formik.handleChange}
                                    defaultValue={formik.initialValues.groupName}
                                />
                            </td>
                        </tr>

                        <CommandButton type="submit">部署変更</CommandButton>

                        <SpaceStyle>
                            <Button href={routeBuilder.adminGroupListPath()}>
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
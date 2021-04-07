import React from "react";
import { LinkType } from "views/components/atoms/Types";
import Title from "views/components/molecules/Title";
import AdminEmployeeCreateInput from "views/components/organisms/admin/employee/AdminEmployeeCreateInput";
import Header, { HeaderProps } from "views/components/organisms/common/Header";
import Container from "../../Container";
import Content from "../../Content";
import LeftBox from "../../LeftBox";
import RightBox from "../../RightBox";
import Sidebar from "../../Sidebar";

type Props = {
    header: HeaderProps | null
    sidebar: LinkType[][] | null

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
        <>
            <Header
                {...props.header}
            />
            <Container>
                <LeftBox>
                    <>
                        {props.sidebar ?
                            <Sidebar
                                data={props.sidebar}
                            />
                            : null}
                    </>
                </LeftBox>
                <RightBox>
                    <Content>
                        <>
                            <Title>社員登録</Title>
                            <AdminEmployeeCreateInput
                                {...props}
                            />
                        </>
                    </Content>
                </RightBox>
            </Container>
        </>
    )
}
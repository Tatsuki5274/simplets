import React from "react";
import { LinkType } from "views/components/atoms/Types";
import Title from "views/components/molecules/Title";
import AdminCategoryCreateInput from "views/components/organisms/admin/category/AdminCategoryCreateInput";
import Header, { HeaderProps } from "views/components/organisms/common/Header";
import Container from "../../Container";
import Content from "../../Content";
import LeftBox from "../../LeftBox";
import RightBox from "../../RightBox";
import Sidebar from "../../Sidebar";

type Props = {
    header: HeaderProps | null
    sidebar: LinkType[][] | null

    companyId: string
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
                            <Title>カテゴリ内容作成</Title>
                            <AdminCategoryCreateInput
                                companyId={props.companyId}
                            />
                        </>
                    </Content>
                </RightBox>
            </Container>
        </>
    )
}
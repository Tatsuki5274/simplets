import React from "react";
import { LinkType } from "views/components/atoms/Types";
import { AdminListCategoryRowType } from "views/components/molecules/admin/RowListCategory";
import Title from "views/components/molecules/Title";
import AdminCategoryList from "views/components/organisms/admin/category/AdminCategoryList";
import AdminNewCategory from "views/components/organisms/admin/category/AdminNewCategory";
import Header, { HeaderProps } from "views/components/organisms/common/Header";
import Container from "../../Container";
import Content from "../../Content";
import LeftBox from "../../LeftBox";
import RightBox from "../../RightBox";
import Sidebar from "../../Sidebar";

type Props = {
    header: HeaderProps | null
    sidebar: LinkType[][] | null

    data: AdminListCategoryRowType[] | null
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
                            <Title>カテゴリ一覧</Title>
                            <AdminNewCategory />
                            <AdminCategoryList
                                data={props.data}
                            />
                        </>
                    </Content>
                </RightBox>
            </Container>
        </>
    )
}
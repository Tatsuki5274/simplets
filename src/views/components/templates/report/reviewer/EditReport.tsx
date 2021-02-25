import React from "react";
import { LinkType } from "views/components/atoms/Types";
import Title from "views/components/molecules/Title";
import Header, { HeaderProps } from "views/components/organisms/common/Header";
import EditReport from "views/components/organisms/report/reviewer/EditReport";
import Container from "../../Container";
import Content from "../../Content";
import LeftBox from "../../LeftBox";
import RightBox from "../../RightBox";
import Sidebar from "../../Sidebar";

type Props = {
    header: HeaderProps | null
    sidebar: LinkType[][] | null

    data: {
        revieweeMailAddress: string | null
        // date: Date
        date: string
        commentWork: string
        workStatus: string
        commentStatus: string
        commentOther: string
        commentReviewer: string
        reviewee: string
        revieweeName: string
    }
}

export default function (props: Props) {

    return (
        <>
            <Header
                {...props.header}
            />
            <Container>
                <LeftBox>
                    <Sidebar
                        data={props.sidebar}
                    />
                </LeftBox>
                <RightBox>
                    <Content>
                        <>
                            <Title>作業報告書記載画面</Title>
                            <EditReport
                                {...props.data}
                            />
                        </>
                    </Content>
                </RightBox>
            </Container>
        </>
    )
}
import React from "react";
import styled from "styled-components";
import { LinkType } from "views/components/atoms/Types";
import Title from "views/components/molecules/Title";
import Header, { HeaderProps } from "views/components/organisms/common/Header";
import ReferenceReport from "views/components/organisms/report/reviewer/ReferenceReport";
import Container from "../../Container";
import Content from "../../Content";
import LeftBox from "../../LeftBox";
import RightBox from "../../RightBox";
import Sidebar from "../../Sidebar";

type Props = {
    header: HeaderProps | null
    sidebar: LinkType[][] | null

    data: {
        sub: string
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
                            <Title>作業報告</Title>
                            <StyleEditReport>
                                <ReferenceReport
                                    {...props.data}
                                />
                            </StyleEditReport>
                        </>
                    </Content>
                </RightBox>
            </Container>
        </>
    )
}
const StyleEditReport = styled.div({
    marginTop: "20px",
})
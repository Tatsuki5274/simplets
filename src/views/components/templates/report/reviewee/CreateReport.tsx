import React from "react";
import { LinkType } from "views/components/atoms/Types";
import Title from "views/components/molecules/Title";
import Header, { HeaderProps } from "views/components/organisms/common/Header";
import CreateReport, { RevieweeCreateReportType } from "views/components/organisms/report/reviewee/CreateReport";
import Container from "../../Container";
import Content from "../../Content";
import LeftBox from "../../LeftBox";
import RightBox from "../../RightBox";
import Sidebar from "../../Sidebar";

type Props = {
    header: HeaderProps | null,
    sidebar: LinkType[][] | null,
    data: RevieweeCreateReportType
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
                            <Title>作業報告書入力</Title>
                            <CreateReport
                                data={props.data}
                            />
                        </>
                    </Content>
                </RightBox>
            </Container>
        </>
    )
}
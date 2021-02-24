import React from "react";
import { LinkType } from "views/components/atoms/Types";
import Title from "views/components/molecules/Title";
import Header, { HeaderProps } from "views/components/organisms/common/Header";
import ChangeReport from "views/components/organisms/report/reviewee/ChangeReport";
import Container from "../../Container";
import Content from "../../Content";
import LeftBox from "../../LeftBox";
import RightBox from "../../RightBox";
import Sidebar from "../../Sidebar";

type Props = {
    header: HeaderProps | null,
    sidebar: LinkType[][] | null
    workStatusList: {
        value: string
        label: string
    }[]

    data: {
        date: string
        companyID: string
        superior: {
            email: string | null,
        }
        reviewee: string
        revieweeName: string
        workStatusValue: string
        reviewerComments: string
        commentWork: string
        commentStatus: string
        commentOther: string
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
                            <Title>作業報告書入力</Title>
                            <ChangeReport
                                data={props.data}
                                workStatusList={props.workStatusList}
                            />
                        </>
                    </Content>
                </RightBox>
            </Container>
        </>
    )
}
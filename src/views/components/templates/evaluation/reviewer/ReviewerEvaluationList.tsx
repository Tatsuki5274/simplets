import React from "react";
import { routeBuilder } from "router";
import styled from "styled-components";
import { LinkType, SelectLabel } from "views/components/atoms/Types";
import Header, { HeaderProps } from "views/components/organisms/common/Header";
import SidebarManager from "views/components/organisms/common/SidebarManager";
import EvaluationFilter from "views/components/organisms/evaluation/reviewerList/EvaluationFilter";
import EvaluationListTitle from "views/components/organisms/evaluation/reviewerList/EvaluationListTitle";
import TableEvaluationList, { TableEvaluationListType } from "views/components/organisms/evaluation/reviewerList/TableEvaluationList";
import Container from "../../Container";
import Content from "../../Content";
import LeftBox from "../../LeftBox";
import RightBox from "../../RightBox";
import Sidebar from "../../Sidebar";

type Props = {
    tableData: (TableEvaluationListType | null)[] | null
    setTableData: React.Dispatch<React.SetStateAction<(TableEvaluationListType | null)[] | null>>
    initTableData: (TableEvaluationListType | null)[] | null
    data: {
        header: HeaderProps | null
        sidebar: LinkType[][] | null
        years: number[] | null
        groups: SelectLabel[] | null
    }
}

const EvaluationListTitleStyle = styled.div({
    // paddingTop: "20px",
})

const EvaluationFilterStyle = styled.div({
    paddingTop: "20px",
})

export default function (props: Props) {
    const yearList = props.data.years?.map(year => {
        return {
            label: `${year}年`,
            value: year.toString()
        }
    })
    // const radioButtonMock = [{
    //     label: "DX",
    //     value: "40"
    // }, {
    //     label: "BSS",
    //     value: "20"
    // }, {
    //     label: "EMS",
    //     value: "30"
    // }]

    // const yearMock = [{
    //     label: "2020年",
    //     value: "2020"
    // }, {
    //     label: "2021年",
    //     value: "2021"
    // }]

    // const status = Object.entries(StatusString).map(([key, value]) => {
    //     return {
    //         label: key,
    //         value: value
    //     }
    // })

    const statusMock = [
        {
            label: "全て",
            value: "all"
        },
        {
            label: "目標：設定中",
            value: "1"
        },
        {
            label: "目標：所属長提出済",
            value: "2"
        },
        {
            label: "目標：所属長承認済",
            value: "3"
        },
        {
            label: "評価：社員評価提出済、所属長評価待",
            value: "10"
        },
        {
            label: "評価：所属長評価済、社員確認待",
            value: "11"
        },
        {
            label: "評価：社員確認済、所属長承認待",
            value: "12"
        },
        {
            label: "評価：所属長承認済、部門長確認待",
            value: "13"
        },
        {
            label: "評価：完了",
            value: "14"
        },
    ]


    return (
        <>
            <Header
                {...props.data.header}
            />
            <Container>
                <LeftBox>
                    <>
                    {props.data.sidebar ?
                    <Sidebar
                        data={props.data.sidebar}
                    /> :
                    null}
                    
                    </>
                </LeftBox>
                <RightBox>
                    <Content>
                        <>
                            <EvaluationListTitleStyle>
                                <EvaluationListTitle />
                            </EvaluationListTitleStyle>
                            {yearList && props.data.groups ?
                                <EvaluationFilterStyle>
                                    <EvaluationFilter
                                        groups={props.data.groups}
                                        status={statusMock}
                                        years={yearList}
                                        initTableData={props.initTableData}
                                        setTableData={props.setTableData}
                                    />
                                </EvaluationFilterStyle>
                                : null}
                            {props.tableData ?
                                <TableEvaluationList
                                    data={props.tableData}
                                />
                                : null}

                        </>
                    </Content>
                </RightBox>
            </Container>
        </>
    )
}
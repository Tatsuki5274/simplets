import React from "react";
import { LinkType, SelectLabel } from "views/components/atoms/Types";
import Header, { HeaderProps } from "views/components/organisms/common/Header";
import ProgressCard, { ProgressReferenceType } from "views/components/organisms/progress/ProgressCard";
import ProgressFilter from "views/components/organisms/progress/ProgressFilter";
import ProgressTitle from "views/components/organisms/progress/ProgressTitle";
import Container from "../../Container";
import Content from "../../Content";
import LeftBox from "../../LeftBox";
import RightBox from "../../RightBox";
import Sidebar from "../../Sidebar";

type Props = {
    cardData: (ProgressReferenceType | null)[] | null
    setCardData: React.Dispatch<React.SetStateAction<(ProgressReferenceType | null)[] | null>>
    initCardData: (ProgressReferenceType | null)[] | null
    data: {
        header: HeaderProps | null
        sidebar: LinkType[][] | null
        years: number[] | null
        groups: SelectLabel[] | null
    }
}

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

export default function (props: Props) {
    const yearList = props.data.years?.map(year => {
        return {
            label: `${year}年`,
            value: year.toString()
        }
    })
    return (
        <>
            <Header
                {...props.data.header}
            />
            <Container>
                <LeftBox>
                    
                    <Sidebar
                        data={props.data.sidebar}
                    />
                </LeftBox>
                <RightBox>
                    <Content>
                        <>
                            <ProgressTitle />
                            {yearList && props.data.groups ?

                                <ProgressFilter
                                    groups={props.data.groups}
                                    status={statusMock}
                                    years={yearList}
                                    initCardData={props.initCardData}
                                    setCardData={props.setCardData}
                                />
                                : null}
                            {props.cardData?.map(data => {
                                if (data) {
                                    return (
                                        <ProgressCard
                                            year={data.year}
                                            groupId={data.groupId}
                                            avg={data.avg}
                                            dest={data.dest}
                                            employeeId={data.employeeId}
                                            employeeName={data.employeeName}
                                            gaugeId={data.gaugeId}
                                            groupName={data.groupName}
                                            objective={data.objective}
                                            statusValue={data.statusValue}
                                        />
                                    )
                                }
                            })}
                        </>
                    </Content>
                </RightBox>
            </Container>
        </>
    )
}
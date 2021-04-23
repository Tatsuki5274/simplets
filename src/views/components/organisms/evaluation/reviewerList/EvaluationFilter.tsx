import React from "react";
import Text from "views/components/atoms/Text";
import PullDown from "views/components/molecules/PullDown";
import { TableEvaluationListType } from "./TableEvaluationList";
import { Formik } from "formik";
import CommandButton from "views/components/molecules/CommandButton";
import styled from "styled-components";

type Props = {
    groups: { value: string, label: string }[]
    years: { label: string, value: string }[]
    status: { label: string, value: string }[]
    initTableData: (TableEvaluationListType | null)[] | null
    setTableData: React.Dispatch<React.SetStateAction<(TableEvaluationListType | null)[] | null>>
    setSelectedYear: React.Dispatch<React.SetStateAction<number | null>>
}

export default function (props: Props) {
    return (
        <Formik
            initialValues={{
                group: props.groups[0].value,
                year: props.years[0].value,
                statusValue: props.status[0].value
            }}
            onSubmit={(values) => {
                // console.log("input", props.initTableData)
                // console.log("values",values);
                if(props.initTableData){
                    let filter: (TableEvaluationListType | null)[] = props.initTableData
                    // 部署フィルター
                    if (values.group !== "all") {
                        filter = filter.filter(datum => datum?.data.groupId === values.group)
                    }
                    // 年度フィルター
                    filter = filter.filter(datum => datum?.data.year.toString() === values.year)
                    // ステータスフィルター
                    if(values.statusValue !== "all"){
                        // all が選択されていない場合のみフィルター
                        filter = filter.filter(datum => datum?.data.statusValue.toString() === values.statusValue)
                    }
                    // console.log("filter", filter)

                    //ソート
                    filter.sort(function (a, b) {
                        if (a && b && a.data && b.data) {
                            if (a.data.groupNo > b.data.groupNo) return 1
                            if (a.data.groupNo < b.data.groupNo) return -1
                            if (a.data.empNo > b.data.empNo) return 1
                            if (a.data.empNo < b.data.empNo) return -1
                        }
                        return 0
                    })
                    props.setTableData(filter)
                    props.setSelectedYear(parseInt(values.year))
                }

            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <Space>
                        <Text>部署</Text>
                        <PullDown
                            name="group"
                            handleChange={formik.handleChange}
                            options={props.groups}
                        ></PullDown>
                    </Space>
                    <Space>
                        <Text>年度</Text>
                        <PullDown
                            name="year"
                            handleChange={formik.handleChange}
                            options={props.years}
                        ></PullDown>
                    </Space>

                    <Space>
                        <Text>ステータス</Text>
                        <PullDown
                            name="statusValue"
                            handleChange={formik.handleChange}
                            options={props.status}
                        ></PullDown>
                    </Space>

                    <Space>
                        <CommandButton
                            type="submit"
                        >
                            確認
                        </CommandButton>
                    </Space>
                </form>
            )}
        </Formik>
    )
}

const Space = styled.span({
    display: "inline-block",
    margin: "0 10px"
})
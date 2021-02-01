import React from "react";
import Text from "views/components/atoms/Text";
import PullDown from "views/components/molecules/PullDown";
import { TableEvaluationListType } from "./TableEvaluationList";
import { Formik } from "formik";
import RadioButtonSelect from "views/components/molecules/RadioButtonSelect";
import CommandButton from "views/components/molecules/CommandButton";

type Props = {
    groups: { value: string, label: string }[]
    years: { label: string, value: string }[]
    status: { label: string, value: string }[]
    initTableData: (TableEvaluationListType | null)[] | null
    setTableData: React.Dispatch<React.SetStateAction<(TableEvaluationListType | null)[] | null>>
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
                        filter = filter.filter(datum => datum?.data.groupLocalId === values.group)
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
                            if (a.data.groupLocalId > b.data.groupLocalId) return 1
                            if (a.data.groupLocalId < b.data.groupLocalId) return -1
                            if (a.data.localId > b.data.localId) return 1
                            if (a.data.localId < b.data.localId) return -1
                        }
                        return 0
                    })
                    props.setTableData(filter)
                }

            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <RadioButtonSelect
                        radioButtons={props.groups} 
                        name="group" 
                        onChange={formik.handleChange}
                    />

                    <Text>年度</Text>
                    <PullDown
                        name="year"
                        handleChange={formik.handleChange}
                        options={props.years}
                    ></PullDown>

                    <Text>ステータス</Text>
                    <PullDown
                        name="statusValue"
                        handleChange={formik.handleChange}
                        options={props.status}
                    ></PullDown>

                    <CommandButton
                        type="submit"
                    >
                        確認
                    </CommandButton>
                </form>
            )}
        </Formik>
    )
}
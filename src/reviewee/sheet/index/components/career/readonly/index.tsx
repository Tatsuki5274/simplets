import { tableHeaderStyle } from "common/globalStyle.module.scss";
import React, { useContext } from "react"
import { Table } from "react-bootstrap";
import { SheetContext } from "reviewee/sheet/index";

export const RevieweeSheetCareerReadonly = () => {
    const context = useContext(SheetContext);
    const sheet = context.sheet
    // const setSheet = context.setSheet
    
    if(sheet){
        return (
            <Table bordered hover>
                <thead className={tableHeaderStyle}>
                    <tr>
                        <td>
                            本人希望
                        </td>
                        <td>話し合い結果</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{sheet.careerPlan}</td>
                        <td>{sheet.careerPlanComment}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }else{
        return null
    }

}
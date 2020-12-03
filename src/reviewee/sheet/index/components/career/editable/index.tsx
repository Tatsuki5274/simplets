import { tableHeaderStyle } from "common/globalStyle.module.scss";
import React, { useContext, useState } from "react"
import { Button, Table } from "react-bootstrap";
import { SheetContext } from "reviewee/sheet/index";
import { RevieweeSheetCareerModal } from "../../careerModal";

export const RevieweeSheetCareerEditable = () => {
    const context = useContext(SheetContext);
    const sheet = context.sheet
    // const setSheet = context.setSheet

    const [careerPlanUpdateShow, setCareerPlanUpdateShow] = useState(false);
    const handleCloseCareerPlanUpdate = () => setCareerPlanUpdateShow(false);
    const handleShowCareerPlanUpdate = () => setCareerPlanUpdateShow(true);
    
    if(sheet){
        return (
            <Table bordered hover>
                <RevieweeSheetCareerModal isShowModal={careerPlanUpdateShow} handleClose={handleCloseCareerPlanUpdate} />
                <thead className={tableHeaderStyle}>
                    <tr>
                        <td>
                            本人希望
                            <Button variant="info" onClick={handleShowCareerPlanUpdate}>編集</Button>
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
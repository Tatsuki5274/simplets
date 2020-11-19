import { Form, Formik } from "formik";
import React, { useContext } from "react"
import { Button, Col, Modal, Row } from "react-bootstrap"
import { SheetContext } from "../..";
import * as APIt from 'API';
import { SheetDao } from "lib/dao/sheetDao";
import { updateSheet } from "graphql/mutations";
import { inputFieldStyle } from "common/globalStyle.module.scss";

type Props = {
    isShowModal: boolean,
    handleClose: () => void
}

export const RevieweeSheetCareerModal = (props: Props) => {
    const context = useContext(SheetContext);
    const sheet = context.sheet
    const setSheet = context.setSheet
    
    return (
        <Formik
            initialValues={{
                careerPlan: sheet ? sheet.careerPlan : null
            }}
            onSubmit={async (values)=>{
                if(sheet && setSheet){
                    const updateI: APIt.UpdateSheetInput = {
                        id: sheet.id,
                        careerPlan: values.careerPlan
                    };
                    const updatedSheet = await SheetDao.update(updateSheet, updateI)
            
                    if (updatedSheet) {
                        setSheet({...updatedSheet})
                    }
                    props.handleClose()
                }else{
                    console.error("sheetの取得に失敗しています")
                }

            }}
        >
            {formik => (
                <Modal show={props.isShowModal} onHide={props.handleClose}>
                    <Form>
                        <Modal.Header closeButton>
                            <Modal.Title>キャリアプラン</Modal.Title>
                        </Modal.Header >
                        <Modal.Body>
                            <Row>
                                <Col>キャリアプラン本人希望内容</Col>
                                <Col><textarea rows={10} cols={60} name="careerPlan" onChange={formik.handleChange} className={inputFieldStyle}>{formik.values.careerPlan}</textarea></Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            キャンセル
                        </Button>
                        <Button variant="primary" type="submit">
                            保存
                        </Button>
                        </Modal.Footer>
                    </Form>

                </Modal>
            )}
        </Formik>
    )
}
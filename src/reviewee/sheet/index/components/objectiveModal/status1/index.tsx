import { Formik } from "formik";
import React from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import * as APIt from 'API';
import { Objective } from "App";
import { ObjectiveDao } from "lib/dao/objectiveDao";
import { updateObjective } from "graphql/mutations";
import { inputFieldStyle } from "common/globalStyle.module.scss";

type Props = {
    objective: Objective,
    isShowModal: boolean,
    handleClose: ()=>void
}

export const RevieweeSheetObjectiveModalStatus1 = (props: Props)=>{
    // const context = useContext(SheetContext);
    // const sheet = context.sheet
    // const setSheet = context.setSheet
    
    if(props.objective){
        return (
            <Formik
                initialValues={{
                    content: props.objective.content,
                    expStartDate: props.objective.expDoneDate,
                    expDoneDate: props.objective.expDoneDate,
                    selfEvaluation: String(props.objective.selfEvaluation),
                    priority: props.objective.priority,
                    result: props.objective.result
                }}
                onSubmit={async (values, actions) => {
                    console.log("values", values);
    
                    //項目明細 情報更新
                    const objectiveId = props.objective.id;
                    let selfEvaluationInput:number | null | undefined = parseInt(values.selfEvaluation);
                    if(isNaN(selfEvaluationInput)) {
                        selfEvaluationInput = undefined;
                    }
                    //目標変更の目標、ステータス、自己評価、優先順位、実績を項目明細に上書き
                    const updateI: APIt.UpdateObjectiveInput = {
                        id: objectiveId,
                        content: values.content,
                        selfEvaluation: selfEvaluationInput,
                        priority: values.priority,
                        result: values.result,
                        expStartDate: values.expStartDate ? values.expStartDate : undefined,
                        expDoneDate: values.expDoneDate ? values.expDoneDate : undefined
                    };
                    const updatedObjective = await ObjectiveDao.update(updateObjective, updateI)
                    if(updatedObjective){
                        // const newSheet = sheet
                        // newSheet?.section?.items?.find
                    }
    
                    // window.location.reload()
                    props.handleClose();
    
                }}
            >
                {formik => (
                    <Modal show={props.isShowModal} onHide={props.handleClose} size="xl">
                        <form onSubmit={formik.handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>目標変更</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                        目標
                                    </Col>
                                    <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                                        <Form.Control
                                            as="textarea"
                                            name="content"
                                            onChange={formik.handleChange}
                                            defaultValue={props.objective.content}
                                            className={inputFieldStyle}
                                            rows={5}
                                        />
                                        <p></p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>開始予定日</Col>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <Form.Control
                                            required
                                            type="date"
                                            name="expStartDate"
                                            onChange={formik.handleChange}
                                            defaultValue={props.objective.expStartDate || undefined}
                                            className={inputFieldStyle}
                                        />
                                        <p></p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>完了予定日</Col>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <Form.Control
                                            required
                                            type="date"
                                            name="expDoneDate"
                                            onChange={formik.handleChange}
                                            defaultValue={props.objective.expDoneDate || undefined}
                                            className={inputFieldStyle}
                                        />
                                        <p></p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>自己評価</Col>
                                    <Col xs={2} sm={2} md={2} lg={2} xl={1}>
                                        <Form.Control
                                            as="select"
                                            name="selfEvaluation"
                                            onChange={formik.handleChange}
                                            defaultValue={String(props.objective.selfEvaluation) || undefined}
                                            className={inputFieldStyle} >
                                            <option></option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </Form.Control>
                                        <p></p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>優先順位</Col>
                                    {/* <Col md="1" lg="1" xl="1"> */}
                                    <Col xs={2} sm={2} md={2} lg={2} xl={1}>
                                        <Form.Control
                                            as="select"
                                            name="priority"
                                            onChange={formik.handleChange}
                                            defaultValue={props.objective.priority || undefined}
                                            className={inputFieldStyle} >
                                            <option></option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                        </Form.Control>
                                        <p></p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>実績</Col>
                                    <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                                        <Form.Control
                                            as="textarea"
                                            name="result"
                                            onChange={formik.handleChange}
                                            defaultValue={props.objective.result || undefined}
                                            className={inputFieldStyle}
                                            rows={5}
                                        />
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="primary" type="submit">
                                    変更保存
                        </Button>
                                <Button variant="secondary" onClick={props.handleClose}>
                                    キャンセル
                        </Button>
                            </Modal.Footer>
                        </form>
                    </Modal>
    
                )}
            </Formik>
        )
    }else{
        return null
    }
 
}
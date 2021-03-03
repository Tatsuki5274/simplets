import { ErrorMessage, Formik } from "formik";
import React from "react"
import { Badge, Button, Col, Form, Modal, Row } from "react-bootstrap";
import * as APIt from 'API';
import { ObjectiveDao } from "lib/dao/objectiveDao";
import { updateObjective } from "graphql/mutations";
import { inputFieldStyle } from "common/globalStyle.module.scss";
import * as Yup from 'yup';
import { Objective } from "API";
import ErrorText from "views/components/atoms/ErrorText";

type Props = {
    objective: Objective,
    isShowModal: boolean,
    handleClose: ()=>void
}

export const RevieweeSheetObjectiveModalStatus1 = (props: Props)=>{
    
    if(props.objective){
        return (
            <Formik
                initialValues={{
                    content: props.objective.content,
                    expStartDate: props.objective.expDoneDate,
                    expDoneDate: props.objective.expDoneDate,
                    priority: props.objective.priority,
                }}
                validationSchema={Yup.object({
                    expStartDate: Yup.date().typeError('yyyy-mm-dd形式で入力してください').required('必須入力です'),
                    expDoneDate: Yup.date().min(Yup.ref('expStartDate'), ({min}) => `開始予定日より後の日付を入力してください`,)
                        .typeError('yyyy-mm-dd形式で入力してください').required('必須入力です'),
                    priority: Yup.string().required('必須入力です'),
                    content: Yup.string().required('必須入力です'),
                })}
                onSubmit={async (values) => {
                    console.log("values", values);
    
                    //目標変更の目標、ステータス、自己評価、優先順位、実績を項目明細に上書き
                    const updateI: APIt.UpdateObjectiveInput = {
                        createdAt: props.objective.createdAt || "", // unsafe
                        sectionKeys: props.objective.sectionKeys || "", // unsafe
                        content: values.content,
                        priority: values.priority,
                        expStartDate: values.expStartDate ? values.expStartDate : undefined,
                        expDoneDate: values.expDoneDate ? values.expDoneDate : undefined
                    };
                    const updatedObjective = await ObjectiveDao.update(updateObjective, updateI)
                    if(updatedObjective){
                        // const newSheet = sheet
                        // newSheet?.section?.items?.find
                    }
    
                    window.location.reload()
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
                                        目標<Badge variant="danger">必須</Badge>
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
                                        <p>
                                            <ErrorText>
                                                <ErrorMessage name="content" />
                                            </ErrorText>
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>開始予定日<Badge variant="danger">必須</Badge></Col>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <Form.Control
                                            type="date"
                                            name="expStartDate"
                                            onChange={formik.handleChange}
                                            defaultValue={props.objective.expStartDate || undefined}
                                            className={inputFieldStyle}
                                        />
                                        <p>
                                            <ErrorText>
                                                <ErrorMessage name="expStartDate" />
                                            </ErrorText>
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>完了予定日<Badge variant="danger">必須</Badge></Col>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <Form.Control
                                            type="date"
                                            name="expDoneDate"
                                            onChange={formik.handleChange}
                                            defaultValue={props.objective.expDoneDate || undefined}
                                            className={inputFieldStyle}
                                        />
                                        <p>
                                            <ErrorText>
                                                <ErrorMessage name="expDoneDate" />
                                            </ErrorText>
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>優先順位<Badge variant="danger">必須</Badge></Col>
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
                                        <p>
                                            <ErrorText>
                                                <ErrorMessage name="priority" />
                                            </ErrorText>
                                        </p>
                                    </Col>
                                </Row>
                                <p>※使用しているブラウザがSafariの場合、開始予定日と完了予定日は yyyy-mm-dd 形式で入力してください</p>
                                <p>例：2020年1月1日　→　2020-01-01</p>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="primary" type="submit">
                                    保存
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
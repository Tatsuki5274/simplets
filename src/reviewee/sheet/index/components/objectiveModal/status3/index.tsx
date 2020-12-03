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

export const RevieweeSheetObjectiveModalStatus3 = (props: Props)=>{
    // const context = useContext(SheetContext);
    // const sheet = context.sheet
    // const setSheet = context.setSheet

    // //目標変更検知
    // function handleCheckObjectiveItems(inputItems: (string | null | undefined)[], objectiveItems: (string | null | undefined)[]) {
    //     for (let i = 0; i < inputItems.length; i++) {
    //         if (inputItems[i] !== undefined) {
    //             if (inputItems[i] !== objectiveItems[i]) {
    //                 // 承認ステータス更新処理を実行
    //                 console.log("項目変更を検知しました");
    //                 break;
    //             }
    //         }
    //     }
    // }
    
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
    
                    // // 承認ステータス3の場合,実績と自己評価以外の項目を変更した場合の処理
                    // if (sheet && sheet.statusValue === 3) {
                    //     const comparisonValues = [values.content, values.expStartDate, values.expDoneDate, values.priority, values.selfEvaluation];
                    //     const comparisonObjectives = [props.objective.content, props.objective.expStartDate, props.objective.expDoneDate, props.objective.priority, (props.objective.selfEvaluation)?.toString()];
                    //     handleCheckObjectiveItems(comparisonValues, comparisonObjectives);
                    // } 
    
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
                        
                        // 暫定的な対応
                        // ファイルを読み直すためリロードが入り、通信量が多くなる。
                        window.location.reload()    
                        // const newSheet: Sheet = {
                        //     ...sheet,
                        //     section: {
                        //         ...sheet.section,
                        //         items: [

                        //         ]
                        //     }
                        // }
                        // newSheet?.section?.items?.find(section => {
                        //     return section?.objective?.items?.find(objective => {
                        //         return true
                        //     })
                        // })
                    }
    
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
                                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>目標</Col>
                                    <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                                        <p>{props.objective.content}</p>
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
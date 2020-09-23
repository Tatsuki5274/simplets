import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { GraphQLResult } from "@aws-amplify/api";
import  {  API, graphqlOperation } from 'aws-amplify';
//import {BrowserRouter, Route, Link, Switch } from "react-router-dom";
import {getSheet, getSection} from 'graphql/queries'
import { Sheet, Section, Objective } from 'App';
import {GetSheetQuery} from 'API';
import * as APIt from 'API';
import dateFormat from 'dateformat'
import {updateObjective} 
  from 'graphql/mutations';

type Props = {
    match: {
        params: {
            sheetId: string
        }
    }
}

type formType = {
    content:string,
    status:string
}



function RevieweeSheetShow(props: Props) {
    const sheetId = props.match.params.sheetId;

    //モーダル
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [changeObjectiveId, setObjectiveId] = useState<Array<any> | any>();
    function HandleChange(event: any){
        console.log(event.target.getAttribute('data-objectiveId'));
        setObjectiveId(event.target.getAttribute('data-objectiveId'));
        handleShow();

    }
    
    const [formInput, setFormInput] = useState<any>()
    function handleChange(event:any){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name: string = target.name;
        
        // const tmpInput: object = formInput as object;
        // tmpInput[name] = value;
        setFormInput({
            ...formInput, [name]: value
          });
        console.log(formInput)

    }

    


    //objectiveの更新
    function HandleUpdateObject(){
        (async()=>{
        const objectiveId = changeObjectiveId;
        const selfEvaluationInput = parseInt(formInput.selfEvaluation);
        //目標変更の目標、ステータス、自己評価、優先順位、実績を項目明細に上書き
        const updateI: APIt.UpdateObjectiveInput = 
        {id:objectiveId, content: formInput.content, status:formInput.status, selfEvaluation:selfEvaluationInput, priority:formInput.priority, result:formInput.result };
        const updateMV: APIt.UpdateObjectiveMutationVariables = {
            input: updateI,
        };
        const updateR: GraphQLResult<APIt.UpdateObjectiveMutation> = 
        await API.graphql(graphqlOperation(updateObjective, updateMV)) as GraphQLResult<APIt.UpdateObjectiveMutation>;

        if (updateR.data) {
            const updateTM: APIt.UpdateObjectiveMutation = updateR.data;
            if (updateTM.updateObjective) {
                const objective: Objective = updateTM.updateObjective;
                console.log('UpdateObjective:', objective);
            }
        }
    }
        )()
        window.location.reload()
        handleClose();
    }

    //表示用データ
    const [sheet, setSheet] = useState<Sheet>()

    useEffect(() => {
        ;(async()=>{
            //URLのパラメータを取得

            const input: APIt.GetSheetQueryVariables = {
                id: sheetId
            }
            const response = (await API.graphql(graphqlOperation(getSheet, input))
            )as GraphQLResult<GetSheetQuery>;
            const sheet: Sheet = response.data?.getSheet as Sheet;
            setSheet(sheet);
            console.log(response);
        })()
      },[]);

    if(sheet===undefined) return <p>Loading</p>
    else if(sheet === null){
        console.log("sheet not found.");
        return <p>該当のシートは存在しません</p>
    }
    return (
        <div>
            {/* サイドバーのコンポーネントを配置する */}

            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>目標変更</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>目標</Col>
                            <Col><input type="text" onChange={handleChange} name="content"/> </Col>
                        </Row>
                        <Row>
                            <Col>ステータス</Col>
                            <Col>
                                <select onChange={handleChange} name="status">
                                    <option value="実施前">実施前</option>
                                    <option value="実施中">実施中</option>
                                    <option value="実施完了">実施完了</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>自己評価</Col>
                            <Col>
                                <select onChange={handleChange} name="selfEvaluation">
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>優先順位</Col>
                            <Col>
                                <select onChange={handleChange} name="priority">
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>実績</Col>
                            <Col><input type="text" onChange={handleChange} name="result"/> </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={HandleUpdateObject}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div>
                <Container>
                    <h2>メイン</h2>
                    <h3>目標一覧</h3>
                    <Link to={`/reviewee/objective/new/${sheetId}`}>
                        <Button variant="info">
                            目標追加
                        </Button>
                    </Link>

                    {sheet.section?.items?.map((arg: any) => {
                        const section: Section = arg    //仮の型変換処理
                        return (
                            <div key={section.id}>
                                <h4>{section.category?.name}</h4>
                                <Table  striped bordered hover>
                                    <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>目標</td>
                                            <td>実績</td>
                                            <td>ステータス</td>
                                            <td>優先順位</td>
                                            <td>自己評価</td>
                                            <td>最終評価</td>
                                            <td>更新日時</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {section.objective?.items?.map((arg: any)=>{
                                            const objective: Objective = arg;   //仮の型変換処理
                                            const date = new Date(objective.updatedOn);
                                            return (
                                                <tr key={objective.id}>
                                                    <td>
                                                        <Button variant="primary" data-objectiveId={objective.id} onClick={HandleChange}>変更</Button>
                                                    </td>
                                                    <td>{objective.content}</td>
                                                    <td>{objective.result}</td>
                                                    <td>{objective.status}</td>
                                                    <td>{objective.priority}</td>
                                                    <td>{objective.selfEvaluation}</td>
                                                    <td>{objective.lastEvaluation}</td>
                                                    <td>{dateFormat(date, "yyyy/mm/dd HH:MM")}</td>
                                                </tr>                                            
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        )
                    })}
          
                    <h4>キャリア計画</h4>
                    <Row>
                        <Col>
                            <h5>本員希望</h5>
                            <Button variant="info">変更</Button>
                            <p>{sheet.careerPlan}</p>
                        </Col>
                        <Col>
                            <h5>話し合い結果</h5>
                            <p>{sheet.careerPlanComment}</p>
                        </Col>
                    </Row>
                    <Button variant="success">所属長提出</Button>
                    <h4>年度評価</h4>
                    <Row>
                        <Col>
                            <h5>所属長コメント</h5>
                            <p>{sheet.secondComment}</p>
                        </Col>
                        <Col>
                            <h5>部門長</h5>
                            <p>{sheet.firstComment}</p>
                        </Col>
                    </Row>
                    <h4>総合評価 {sheet.overAllEvaluation}</h4>
                </Container>
            </div>
        </div>
    );
}

export default RevieweeSheetShow;

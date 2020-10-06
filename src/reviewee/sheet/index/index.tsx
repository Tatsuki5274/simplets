import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from 'aws-amplify';
//import {BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { getSheet, getSection } from 'graphql/queries'
import { Sheet, Section, Objective } from 'App';
import { GetSheetQuery } from 'API';
import * as APIt from 'API';
import dateFormat from 'dateformat'
import { updateObjective, updateSheet }
    from 'graphql/mutations';
import { error } from 'console';

type Props = {
    match: {
        params: {
            sheetId: string
        }
    }
}


function RevieweeSheetShow(props: Props) {
    const sheetId = props.match.params.sheetId;
    const [sheet, setSheet] = useState<Sheet>()

    //モーダル
    const [objectiveUpdateShow, setObjectiveUpdateShow] = useState(false);
    const handleCloseObjectiveUpdate = () => setObjectiveUpdateShow(false);
    const handleShowObjectiveUpdate = () => setObjectiveUpdateShow(true);

    const [careerPlanUpdateShow, setCareerPlanUpdateShow] = useState(false);
    const handleCloseCareerPlanUpdate = () => setCareerPlanUpdateShow(false);
    const handleShowCareerPlanUpdate = () => setCareerPlanUpdateShow(true);


    const [changeObjectiveId, setObjectiveId] = useState<Array<any> | any>();
    function HandleChange(event: any) {
        console.log(event.target.getAttribute('data-objectiveId'));
        setObjectiveId(event.target.getAttribute('data-objectiveId'));
        handleShowObjectiveUpdate();

    }

    const [formInput, setFormInput] = useState<any>()

    function handleChangeObjective(event: any) {
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
    function HandleUpdateObject() {
        (async () => {
            const objectiveId = changeObjectiveId;
            const selfEvaluationInput = parseInt(formInput.selfEvaluation);
            //目標変更の目標、ステータス、自己評価、優先順位、実績を項目明細に上書き
            const updateI: APIt.UpdateObjectiveInput = {
                id: objectiveId,
                content: formInput.content,
                selfEvaluation: selfEvaluationInput,
                priority: formInput.priority,
                result: formInput.result,
                expStartDate: formInput.expStartDate,
                expDoneDate: formInput.expDoneDate
            };
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
        handleCloseObjectiveUpdate();
    }

    // Progress 更新
    async function handleChangeProgress(event: any) {
        // console.log(event.target.getAttribute('data-objective-id'));
        const objectiveId = event.target.getAttribute('data-objective-id');
        // console.log(event.currentTarget.value);
        const objectiveProgress = parseInt(event.currentTarget.value);

        const updateI: APIt.UpdateObjectiveInput = {
            id: objectiveId,
            progress: objectiveProgress,
        };

        const updateMV: APIt.UpdateObjectiveMutationVariables = {
            input: updateI,
        };
        const updateR: GraphQLResult<APIt.UpdateObjectiveMutation> =
            await API.graphql(graphqlOperation(updateObjective, updateMV)) as GraphQLResult<APIt.UpdateObjectiveMutation>;
        // console.log("updateR", updateR);
        // console.log("sheet", sheet)
    }


    const [formInputCareerPlan, setFormInputCareerPlan] = useState<any>();
    function handleChangeCareerPlan(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name: string = target.name;

        // const tmpInput: object = formInput as object;
        // tmpInput[name] = value;
        setFormInputCareerPlan({
            ...formInputCareerPlan, [name]: value
        });
    }
    async function HandleUpdateCareerPlan(e: any) {
        const updateI: APIt.UpdateSheetInput = {
            id: sheetId,
            careerPlan: formInputCareerPlan.careerPlan || ""
        };
        const updateMV: APIt.UpdateSheetMutationVariables = {
            input: updateI,
        };
        const updateR: GraphQLResult<APIt.UpdateSheetMutation> =
            await API.graphql(graphqlOperation(updateSheet, updateMV)) as GraphQLResult<APIt.UpdateSheetMutation>;
        if (updateR.data) {
            const updateTM: APIt.UpdateSheetMutation = updateR.data;
            if (updateTM.updateSheet) {
                const updatedSheet: Sheet = updateTM.updateSheet;
                let newSheet = sheet;
                if (newSheet) {
                    newSheet.careerPlan = updatedSheet.careerPlan;
                    setSheet(newSheet)
                } else {
                    console.error("現在のシートが存在しません")
                }
                console.log('UpdateSheet:', sheet);
                handleCloseCareerPlanUpdate();
            }
        }
    }

    //表示用データ

    useEffect(() => {
        ; (async () => {
            //URLのパラメータを取得

            const input: APIt.GetSheetQueryVariables = {
                id: sheetId
            }
            const response = (await API.graphql(graphqlOperation(getSheet, input))
            ) as GraphQLResult<GetSheetQuery>;
            const sheet: Sheet = response.data?.getSheet as Sheet;
            setSheet(sheet);
            console.log(response);
        })()
    }, []);

    if (sheet === undefined) return <p>Loading</p>
    else if (sheet === null) {
        console.log("sheet not found.");
        return <p>該当のシートは存在しません</p>
    }
    return (
        <div>
            {/* サイドバーのコンポーネントを配置する */}

            <div>
                <Modal show={objectiveUpdateShow} onHide={handleCloseObjectiveUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>目標変更</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>目標</Col>
                            <Col><input type="text" onChange={handleChangeObjective} name="content" /> </Col>
                        </Row>
                        <Row>
                            <Col md="2" lg="2" xl="2">開始予定日</Col>
                            <Col md="4" lg="4" xl="4">
                                <Form.Control
                                    required
                                    type="datetime-local"
                                    name="expStartDate"
                                    onChange={handleChangeObjective}
                                />
                            </Col>
                            <Col md="2" lg="2" xl="2">完了予定日</Col>
                            <Col md="4" lg="4" xl="4">
                                <Form.Control
                                    required
                                    type="datetime-local"
                                    name="expDoneDate"
                                    onChange={handleChangeObjective}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>自己評価</Col>
                            <Col>
                                <select onChange={handleChangeObjective} name="selfEvaluation">
                                    <option></option>
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
                                <select onChange={handleChangeObjective} name="priority">
                                    <option></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>実績</Col>
                            <Col><input type="text" onChange={handleChangeObjective} name="result" /> </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseObjectiveUpdate}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={HandleUpdateObject}>
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={careerPlanUpdateShow} onHide={handleCloseCareerPlanUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>キャリアプラン</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>キャリアプラン本人希望内容</Col>
                            <Col><textarea rows={10} cols={60} name="careerPlan" onChange={handleChangeCareerPlan}>{sheet.careerPlan || ""}</textarea></Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCareerPlanUpdate}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={HandleUpdateCareerPlan}>
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
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>目標</td>
                                            <td>実績</td>
                                            <td>進捗率</td>
                                            <td>優先順位</td>
                                            <td>開始予定日</td>
                                            <td>完了予定日</td>
                                            <td>自己評価</td>
                                            <td>最終評価</td>
                                            <td>更新日時</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {section.objective?.items?.map((arg: any) => {
                                            const objective: Objective = arg;   //仮の型変換処理
                                            const date = new Date(objective.updatedAt);
                                            return (
                                                <tr key={objective.id}>
                                                    <td>
                                                        <Button variant="primary" data-objectiveId={objective.id} onClick={HandleChange}>変更</Button>
                                                    </td>
                                                    <td>{objective.content}</td>
                                                    <td>{objective.result}</td>
                                                    {(() => {
                                                        // 進捗率が空の場合,下記を表示
                                                        if (objective.progress === null || objective.progress === undefined) {
                                                            return (
                                                                <td>
                                                                    <input name="progress" onChange={handleChangeProgress} data-objective-id={objective.id} type="number" min="0" max="100" step="10"></input>
                                                                    <p>%</p>
                                                                </td>
                                                            )
                                                        }
                                                        // 進捗率が入力済みの場合,下記を表示 
                                                        else {
                                                            // progress 型変換
                                                            const valueProgress = String(objective.progress);
                                                            return (
                                                                <td>
                                                                    <input name="progress" onChange={handleChangeProgress} data-objective-id={objective.id} placeholder={valueProgress} type="number" min="0" max="100" step="10"></input>
                                                                    <p>%</p>
                                                                </td>
                                                            );
                                                        }
                                                    })()}
                                                    <td>{objective.priority}</td>
                                                    <td>{objective.expStartDate ? dateFormat(objective.expStartDate, "yyyy/mm/dd") : ""}</td>
                                                    <td>{objective.expDoneDate ? dateFormat(objective.expDoneDate, "yyyy/mm/dd") : ""}</td>
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
                            <h5>本人希望</h5>
                            <Button variant="info" onClick={handleShowCareerPlanUpdate}>変更</Button>
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
                            <p>{sheet.secondComment || "なし"}</p>
                        </Col>
                        <Col>
                            <h5>部門長コメント</h5>
                            <p>{sheet.firstComment || "なし"}</p>
                        </Col>
                    </Row>
                    <h4>総合評価 {sheet.overAllEvaluation}</h4>
                </Container>
            </div>
        </div>
    );
}

export default RevieweeSheetShow;

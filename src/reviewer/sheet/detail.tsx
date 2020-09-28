import React, { useState, useEffect, ChangeEvent } from 'react';
import { Container, InputGroup, Table, FormControl, Form, Button, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from "@aws-amplify/api";
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { RouteComponentProps } from 'react-router';
import { Sheet, Section, Objective, Interview } from 'App';
import { GetSheetQuery, ListSheetsQuery } from 'API';
import { updateSheet } from 'graphql/mutations';
import * as APIt from 'API';
import { listSheets, getSheet } from 'graphql/queries';
import dateFormat from 'dateformat';

//propsの型を指定
type Props = {
    match: {
        params: {
            sheetId: string
        }
    }
}

function EvalutionScreen(props: Props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //画面内のフォームデータの管理ステート
    const [formInput, setFormInput] = useState<any>();

    const sheetId = props.match.params.sheetId;

    // sheet 情報取得
    const [sheet, setSheet] = useState<Sheet>()
    useEffect(() => {
        ; (async () => {
            //const sheetId = props.match.params.sheetId;
          
            try {
                const input: APIt.GetSheetQueryVariables = {
                    id: sheetId
                }
                const response = (await API.graphql(graphqlOperation(getSheet, input))
                ) as GraphQLResult<GetSheetQuery>;

                const sheetItem: Sheet = response.data?.getSheet as Sheet;
                setSheet(sheetItem);
                console.log(sheetItem);
                console.log(response);
            } catch (e) {
                console.log(e);
            }

        })()
    }, []);

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setFormInput({ ...formInput, [name]: value });
    }

    function HandleUpdateStatus() {
        // (async()=>{
        // //ステータスを「目標：設定中」に変更
        // const updateI: APIt.UpdateSheetInput = 
        // {id:sheetId, status: 'c5c847a3-e919-4133-89c5-747049c4a050'};
        // const updateMV: APIt.UpdateSheetMutationVariables = {
        //     input: updateI,
        // };
        // const updateR: GraphQLResult<APIt.UpdateSheetMutation> = 
        // await API.graphql(graphqlOperation(updateSheet, updateMV)) as GraphQLResult<APIt.UpdateSheetMutation>;

        // if (updateR.data) {
        //     const updateTM: APIt.UpdateSheetMutation = updateR.data;
        //     if (updateTM.updateSheet) {
        //         const sheet: Sheet = updateTM.updateSheet;
        //         console.log('UpdateSheet:', sheet);
        //     }
        // }})()
        handleClose();
    }

    if (sheet === undefined) return <div>Loading...</div>
    else if (sheet === null) {
        console.log("sheet not found.");
        return <p>該当のシートは存在しません</p>
    }
    return (
        <div>

            {/* モーダルウィンドウ 差し戻しコメント */}
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>目標差し戻し</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>理由</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as="textarea" />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button variant="primary" onClick={handleClose}> */}
                        <Button variant="primary" onClick={HandleUpdateStatus}>
                            差し戻し
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            キャンセル
                        </Button>

                    </Modal.Footer>
                </Modal>

            </div>

            {/* 評価画面 */}
            <div>
                <Container>
                    <h3>今後のキャリア計画</h3><br />

                    <div>
                        <h4>本人希望</h4>

                        {/* 本人希望　情報表示 */}
                        <p>{sheet.careerPlan}</p>


                        <h4>話し合い結果</h4>
                        <InputGroup>
                            <FormControl as="textarea" />
                        </InputGroup><br />

                        {/* インタビュー実施記録 */}
                        <h4>インタビュー実施記録</h4>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <td>目的</td>
                                    <td>実施日時</td>
                                    <td>内容</td>
                                </tr>
                            </thead>
                            <tbody>

                                {/* インタビュー実施記録　情報表示 */}
                                {sheet.interviews?.items?.map((arg: any) => {
                                    const interviews: Interview = arg;
                                    const date = new Date(interviews.createdAt);
                                    return (
                                        <tr key={interviews.id}>
                                            <td>{interviews.purpose}</td>
                                            <td>{dateFormat(date, "yyyy/mm/dd")}</td>
                                            <td><textarea name="interviewDetail">{interviews.detail}</textarea></td>
                                        </tr>
                                    );
                                })}

                            </tbody>

                        </Table><br />

                        {/* 年度評価 */}
                        <h4>年度評価</h4>
                        <Form>
                            <Form.Group>
                                <Form.Label>所属長コメント</Form.Label>
                                <Form.Control type="textarea"></Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>総合評価</Form.Label>
                                <Form.Control as="select">
                                    <option>5</option>
                                    <option>4</option>
                                    <option>3</option>
                                    <option>2</option>
                                    <option>1</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Button type="submit">保存して承認</Button>
                                <Button onClick={handleShow}>差し戻し</Button>
                            </Form.Group>
                        </Form><br />

                        {/* 目標コンポーネント */}
                        {sheet.section?.items?.map((arg: any) => {
                            const section: Section = arg    //仮の型変換処理
                            return (
                                <div key={section.id}>
                                    <h4>{section.category?.name}</h4>
                                    <Table bordered>
                                        <thead>
                                            <tr>
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
                                            {section.objective?.items?.map((arg: any) => {
                                                const objective: Objective = arg;   //仮の型変換処理
                                                const date = new Date(objective.updatedOn);
                                                return (
                                                    <tr key={objective.id}>

                                                        {/* 目標本文 */}
                                                        <td>{objective.content}</td>

                                                        {/* 実績 */}
                                                        <td>{objective.result}</td>

                                                        {/* ステータス文字列 */}
                                                        <td>{objective.status}</td>

                                                        {/* 優先順位 */}
                                                        <td>{objective.priority}</td>

                                                        {/* 自己評価 */}
                                                        <td>{objective.selfEvaluation}</td>

                                                        {/* 最終評価 */}
                                                        <td>
                                                            {/* 仮フォーム機能 後ほど修正*/}
                                                            <InputGroup>
                                                                <DropdownButton title="select">
                                                                    <Dropdown.Item value="5">5</Dropdown.Item>
                                                                    <Dropdown.Item value="4">4</Dropdown.Item>
                                                                    <Dropdown.Item value="3">3</Dropdown.Item>
                                                                    <Dropdown.Item value="2">2</Dropdown.Item>
                                                                    <Dropdown.Item value="1">1</Dropdown.Item>
                                                                </DropdownButton>
                                                            </InputGroup>
                                                        </td>

                                                        {/* 更新日時 */}
                                                        <td>{dateFormat(date, "yyyy/mm/dd HH:MM")}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            )
                        })}

                    </div>

                </Container>
            </div>

        </div>
    );
}

export default EvalutionScreen;
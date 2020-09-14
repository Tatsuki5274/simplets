import React ,{useState} from 'react';
import { Container, InputGroup, Table, FormControl, Form, Button, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { RouteComponentProps } from 'react-router';
import * as APIt from 'API';
import API, {GraphQLResult, graphqlOperation} 
  from '@aws-amplify/api';
import {updateSheet} 
  from 'graphql/mutations';
import {Sheet}
  from 'App';


//propsの型を指定
type Props = {
    match: {
        params: {
            sheetId: string
        }
    }
}


function EvalutionScreen(props:Props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const sheetId = props.match.params.sheetId;
    console.log(sheetId);  

    function HandleUpdateStatus(){
        (async()=>{
        //ステータスを「目標：設定中」に変更
        const updateI: APIt.UpdateSheetInput = 
        {id:sheetId, sheetStatusId: 'c5c847a3-e919-4133-89c5-747049c4a050'};
        const updateMV: APIt.UpdateSheetMutationVariables = {
            input: updateI,
        };
        const updateR: GraphQLResult<APIt.UpdateSheetMutation> = 
        await API.graphql(graphqlOperation(updateSheet, updateMV)) as GraphQLResult<APIt.UpdateSheetMutation>;

        if (updateR.data) {
            const updateTM: APIt.UpdateSheetMutation = updateR.data;
            if (updateTM.updateSheet) {
                const sheet: Sheet = updateTM.updateSheet;
                console.log('UpdateSheet:', sheet);
            }
        }})()
        handleClose();
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
                        <p>様々なスキルを身に付け、早く一人前のSEになりたい。SEの経験を積んだ後も将来はコンサルタントを目指したい。</p>

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
                                <tr>
                                    <td>目標設定</td>
                                    <td>2017/06/30</td>
                                    <td>インタビューを行い目標を設定した。本人の認識と特に大きな相違はなかった。</td>
                                </tr>
                                <tr>
                                    <td>中間#1</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>中間#2</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>中間#3</td>
                                    <td></td>
                                    <td></td>
                                </tr>
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

                        {/* ビジネス成果目標 */}
                        <h4>ビジネス成果目標</h4>
                        <Table bordered itemID="business">
                            <thead>
                                <tr>
                                    <td>目標</td>
                                    <td>実績</td>
                                    <td>ステータス</td>
                                    <td>自己評価</td>
                                    <td>最終評価</td>
                                    <td>更新日時</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>A社でのOJTを着実に実施し、有償稼働できる状況にする。</td>
                                    <td>A社での保守作業に１０月から有償で参加することができた</td>
                                    <td>実施完了</td>
                                    <td>4</td>
                                    <td>
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
                                    <td>2020/08/01 14:33</td>
                                </tr>
                                <tr>
                                    <td>A社SAP運用保守に有償で参加し、与えられた仕事に対して指導を受けながら成果を出す。</td>
                                    <td></td>
                                    <td>未着手</td>
                                    <td></td>
                                    <td>
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
                                    <td>2020/08/02 15:20</td>
                                </tr>
                                <tr>
                                    <td>A社担当チームの一員としてお客様X様空合格点をもらう</td>
                                    <td></td>
                                    <td>実施中</td>
                                    <td></td>
                                    <td>
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
                                    <td>2020/08/01 14:20</td>
                                </tr>
                            </tbody>
                        </Table><br />

                        {/* ビジネス姿勢目標 */}
                        <h4>ビジネス姿勢目標</h4>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <td>目標</td>
                                    <td>実績</td>
                                    <td>ステータス</td>
                                    <td>自己評価</td>
                                    <td>最終評価</td>
                                    <td>更新日時</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>所属長へのOJT週報を徹底する　OJT期間だけでなく年間を通して報告する</td>
                                    <td>１１月まではほぼ実施できたが１２月はあまり報告できなかった。業務多忙により１２月は報告できなかったが報告内容は適切であった。</td>
                                    <td>実施完了</td>
                                    <td>3</td>
                                    <td>
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
                                    <td>2020/08/01 14:33</td>
                                </tr>
                                <tr>
                                    <td>部門会議にてプロジェクト報告を実施する。　年度末までに一回。</td>
                                    <td>２月の部門会議でA社に関するプロジェクト報告を実施した</td>
                                    <td>実施完了</td>
                                    <td>3</td>
                                    <td>
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
                                    <td>2020/08/02 15:20</td>
                                </tr>
                                <tr>
                                    <td>イベントや勉強会に積極的に参加し、自分を売り込む</td>
                                    <td>イベントや勉強会には毎回参加できた。</td>
                                    <td>実施完了</td>
                                    <td>3</td>
                                    <td>
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
                                    <td>2020/08/01 14:20</td>
                                </tr>
                            </tbody>
                        </Table><br />

                        {/* 成長目標 */}
                        <h4>成長目標</h4>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <td>目標</td>
                                    <td>実績</td>
                                    <td>ステータス</td>
                                    <td>自己評価</td>
                                    <td>最終評価</td>
                                    <td>更新日時</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>人人研修に出席し、SEとしての基礎スキルを身についける。
解らないことはそのままにせず、自分で調べたり他人に聞いて解決するように心がける。</td>
                                    <td>新人研修には積極的に取り組み、問題なく終了することができた</td>
                                    <td>実施完了</td>
                                    <td>4</td>
                                    <td>
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
                                    <td>2020/08/01 14:33</td>
                                </tr>
                                <tr>
                                    <td>仕事を通じて様々なことを吸収し、社会人として成長する</td>
                                    <td>A社A社SAP運用保守に１０月から有償で参加し、指導を受けながら活動した。不明な点は自分で調査した上で相手に確認する等、期待通りの成果をあげた。
積極的な仕事への取り組みはお客様からも評価されている。</td>
                                    <td>実施完了</td>
                                    <td>3</td>
                                    <td>
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
                                    <td>2020/08/02 15:20</td>
                                </tr>
                            </tbody>
                        </Table>

                    </div>

                </Container>
            </div>

        </div>
    );
}

export default EvalutionScreen;
import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
//import {BrowserRouter, Route, Link, Switch } from "react-router-dom";

function RevieweeSheetShow() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
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
                            <Col><input type="text" /> </Col>
                        </Row>
                        <Row>
                            <Col>ステータス</Col>
                            <Col>
                                <select>
                                    <option value="">実施前</option>
                                    <option value="">実施中</option>
                                    <option value="">実施完了</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>自己評価</Col>
                            <Col>
                                <select>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>実績</Col>
                            <Col><input type="text" /> </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div>
                <Container>
                    <h2>メイン</h2>
                    <h3>目標一覧</h3>
                    <Link to="/reviewee/sheet/new">
                        <Button variant="info">
                            目標追加
                        </Button>
                    </Link>

                    {/* 繰り返しコンポーネント */}
                    <h4>ビジネス成果目標</h4>
                    <Table  striped bordered hover>
                        <thead>
                            <tr>
                                <td>#</td>
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
                                <td>
                                    <Button variant="primary" onClick={handleShow}>変更</Button>
                                </td>
                                <td>A社でのOJTを着実に実施し、有償稼働できる状況にする。</td>
                                <td>A社での保守作業に１０月から有償で参加することができた</td>
                                <td>実施完了</td>
                                <td>4</td>
                                <td>4</td>
                                <td>2020/08/01 14:33</td>
                            </tr>
                            <tr>
                                <td><a>変更</a></td>
                                <td> A社SAP運用保守に有償で参加し、与えられた仕事に対して指導を受けながら成果を出す。</td>
                                <td>A社A社SAP運用保守に１０月から有償で参加し、指導を受けながら活動した。不明な点は自分で調査した上で相手に確認する等、期待通りの成果をあげた。積極的な仕事への取り組みはお客様からも評価されている。</td>
                                <td>実施完了</td>
                                <td>3</td>
                                <td>4</td>
                                <td>2020/08/02 15:30</td>
                            </tr>
                        </tbody>
                    </Table>
                    <h4>キャリア計画</h4>
                    <Row>
                        <Col>
                            <h5>本員希望</h5>
                            <Button variant="info">変更</Button>
                            <p>様々なスキルを身につけ、早く一人前のSEになりたい。SEの経験を積んだ後も将来はコンサルタントを目指したい。</p>
                        </Col>
                        <Col>
                            <h5>話し合い結果</h5>
                            <p>与えられた仕事をこなすだけでなく、周りの人の仕事にも注意を払い、余裕のある時は手伝いを申し出る等により幅広い経験をして欲しい。コンサルタントを目指すためには常にお客様の視点を意識して仕事をして欲しい。</p>
                        </Col>
                    </Row>
                    <Button variant="success">所属長提出</Button>
                    <h4>年度評価</h4>
                    <Row>
                        <Col>
                            <h5>所属長コメント</h5>
                            <p>ほぼ予定通りの時期に優勝活動を開始できた。仕事にも真面目に取り組みチームメンバーやお客様からも信頼され始めている。お客様満足度がやや低下してしまったことは残念だが、低下の原因をチーム全員で話し合って今後の満足度改善につなげていってほしい。</p>
                        </Col>
                        <Col>
                            <h5>部門長</h5>
                            <p>〜〜〜</p>
                        </Col>
                    </Row>
                    <h4>総合評価 3</h4>
                </Container>
            </div>
        </div>
    );
}

export default RevieweeSheetShow;

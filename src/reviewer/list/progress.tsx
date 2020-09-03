import React from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProgressReferenceList() {
    return (
        <div>
            <Container>
                <h2>進捗参照</h2><br />

                <Form>
                    <Form.Group controlId="Form.Checkbox">
                        <Form.Check inline label="EMS" />
                        <Form.Check inline label="DX" />
                        <Form.Check inline label="BSS" />
                    </Form.Group>

                    <Form.Group controlId="Form.Dropdown">
                        <Form.Label>年度</Form.Label>
                        <Form.Control as="select">
                            <option>2020</option>
                            <option>2019</option>
                            <option>2018</option>
                        </Form.Control>


                    </Form.Group>

                    <Form.Group>
                        <Button type="submit">確認</Button>
                    </Form.Group>


                </Form>
                <br />

                <Table bordered>
                    <thead>
                        <tr>
                            <td>社員番号</td>
                            <td>名前</td>
                            <td>部署</td>
                            <td>承認ステータス</td>
                            <td>ビジネス成果目標</td>
                            <td>ビジネス姿勢目標</td>
                            <td>成長目標</td>
                            <td>人事管理目標</td>
                            <td>合計</td>
                            <td></td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>10000</td>
                            <td>山田</td>
                            <td>EMS</td>
                            <td>目標設定中</td>
                            <td>2/5</td>
                            <td>1/5</td>
                            <td>3/5</td>
                            <td>0/0</td>
                            <td>6/15</td>
                            <td>詳細</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>実施中</td>
                            <td>3/5</td>
                            <td>4/5</td>
                            <td>2/5</td>
                            <td>0/0</td>
                            <td>9/15</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>完了</td>
                            <td>0/5</td>
                            <td>0/5</td>
                            <td>0/5</td>
                            <td>0/5</td>
                            <td>0/5</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                    </tbody>
                </Table>


            </Container>
        </div>
    );
}

export default ProgressReferenceList;
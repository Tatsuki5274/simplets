import React from 'react';
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListPerformanceEvalution() {
    return (
        <div>

            <div>
                <Container>
                    <h2>業績評価一覧</h2>
                    <Table bordered>
                        <thead>
                            <tr>
                                <td></td>
                                <td>年度</td>
                                <td>所属長</td>
                                <td>ステータス</td>
                                <td>総合評価</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>

                                    <a href="#">編集</a>
                                </td>
                                <td>2020</td>
                                <td>[所属長氏名]</td>
                                <td>社長確認済み、所属長承認待</td>
                                <td>未評価</td>
                                <td>プレビュー</td>
                            </tr>
                            <tr>
                                <td>
                                    <a href="#">確認</a>
                                </td>
                                <td>2019</td>
                                <td>[所属長氏名]</td>
                                <td>完了</td>
                                <td>4</td>
                                <td>プレビュー</td>
                            </tr>
                            <tr>
                                <td>
                                    <a href="#">確認</a>
                                </td>
                                <td>2018</td>
                                <td>[所属長氏名]</td>
                                <td>完了</td>
                                <td>5</td>
                                <td>プレビュー</td>
                            </tr>

                        </tbody>
                    </Table>
                </Container>
            </div>
        </div>
    );
}

export default ListPerformanceEvalution;
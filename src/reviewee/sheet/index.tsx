import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {BrowserRouter, Route, Link, Switch } from "react-router-dom";

function RevieweeSheetShow() {
  return (
      <div>
          <div>
              <h1>メイン</h1>
              <h2>目標一覧</h2>
              <button>目標追加</button>

              {/* 繰り返しコンポーネント */}
              <h3>ビジネス成果目標</h3>
              <table>
                  <thead>
                      <tr>
                          <td></td>
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
                          <td><a>変更</a></td>
                          <td>A社でのOJTを着実に実施し、有償稼働できる状況にする。</td>
                          <td>A社での保守作業に１０月から有償で参加することができた</td>
                          <td>実施完了</td>
                          <td>4</td>
                          <td>4</td>
                          <td>2020/08/01 14:33</td>
                      </tr>
                  </tbody>
              </table>
              <Container>
                  <Row>
                      <Col>
                        <h3>本員希望</h3>
                        <button>変更</button>
                        <p>様々なスキルを身につけ、早く一人前のSEになりたい。SEの経験を積んだ後も将来はコンサルタントを目指したい。</p>
                      </Col>
                      <Col>

                      </Col>
                  </Row>
              </Container>
          </div>
      </div>
  );
}

export default RevieweeSheetShow;

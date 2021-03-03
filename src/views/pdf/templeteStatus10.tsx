import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import dateFormat from 'dateformat';
import { useHistory } from 'react-router-dom';
import { buttonComponentStyle } from 'common/globalStyle.module.scss';
import style from './common/style.module.scss';
import { getSectionKeys } from 'lib/util';
import { Sheet } from 'API';
const ReactToPdf = require('react-to-pdf').default;

// import Pdf from "react-to-pdf";

type Props = {
  sheet: Sheet,
  twoYearsAgoOverAllEvaluation: number | null, //前々期評価
  lastYearsAgoOverAllEvaluation: number | null, //前期評価
  gradeString: string, //等級名称
  approvalStatusString: string, //承認ステータス文字列
}

const outputDate = (dateStr: string) => {
  try {
    return dateFormat(dateStr, "yyyy/mm/dd")
  } catch (e) {
    return null
  }
}

// Create Document Component
export const PDFTempleteStatus10 = (props: Props) => {
  const history = useHistory();

  return (
    <ReactToPdf
      filename="output.pdf"
      scale={0.7}
      options={{
        orientation: "l",
        unit: "px"
      }}
    >
      {(
        {
          toPdf,
          targetRef
        }: {
          toPdf: any,
          targetRef: any
        }
      ) => (

        <div>
          <Button
            onClick={() => history.goBack()}
            className={buttonComponentStyle}
          >戻る</Button>
          {/* <Button onClick={toPdf} className={buttonComponentStyle}>PDFをダウンロード</Button> */}

          <div ref={targetRef} className={style.PDFScreenStyle}>
            <Row>
              <Col
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <h4>{props.sheet.year}年度 業績評価シート</h4>
              </Col>
            </Row>
            <Row>
              <Col
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <Table bordered className={style.PDFTableStyle}>
                  <th>本人氏名</th>
                  <td>{props.sheet.revieweeEmployee?.lastName} {props.sheet.revieweeEmployee?.firstName}</td>
                  <th>所属長氏名</th>
                  <td>{props.sheet.revieweeEmployee?.superior?.lastName} {props.sheet.revieweeEmployee?.superior?.firstName}</td>
                </Table>
              </Col>
            </Row>

            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <h5>目標設定</h5>
              </Col>
            </Row>

            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <Table bordered className={style.PDFTableStyle}>
                  <thead>
                    <tr>
                      <td>目標設定　（評価の優先順位も記入）</td>
                      <td>優先順位</td>
                      <td>実績</td>
                      <td>自己評価</td>
                      <td>最終評価</td>
                    </tr>
                  </thead>
                  <tbody>
                    {props.sheet.section?.items?.map((section) => {

                      return (
                        section ?
                          <tr key={getSectionKeys(section)}>
                            <td>
                              <p>{section.sectionCategoryName}</p>
                              <Table borderless>
                                {section.objective?.items?.map((objective) => {
                                  return (
                                    <tr>
                                      <td>{objective?.content}</td>
                                    </tr>
                                  );
                                })}
                              </Table>
                            </td>
                            <td>
                              <p>　</p>
                              <Table borderless>
                                {section.objective?.items?.map((objective) => {
                                  return (
                                    <tr>
                                      <td>{objective?.priority}</td>
                                    </tr>
                                  );
                                })}
                              </Table>
                            </td>

                            <td>
                              <p>　</p>
                              <Table borderless>
                                {section?.objective?.items?.map((objective) => {
                                  return (
                                    <tr>
                                      <td>{objective?.result}</td>
                                    </tr>
                                  );
                                })}
                              </Table>
                            </td>
                            <td>
                              <p>　</p>
                              <Table borderless>
                                {section?.objective?.items?.map((objective) => {
                                  return (
                                    <tr>
                                      <td>{objective?.selfEvaluation}</td>
                                    </tr>
                                  );
                                })}
                              </Table>
                            </td>
                            <td>
                              <p>　</p>
                              <Table borderless>
                                {section?.objective?.items?.map((objective) => {
                                  return (
                                    <tr>
                                      {/* <td>{objective?.lastEvaluation}</td> */}
                                      <td>-</td>
                                    </tr>
                                  );
                                })}
                              </Table>
                            </td>

                          </tr>
                          : null

                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Row>
              <Col
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <h5>今後のキャリア計画</h5>
              </Col>
              <Col
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <h5>業績評価</h5>
              </Col>
            </Row>
            <Row>
              <Col
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <Table bordered className={style.PDFTableStyle}>
                  <thead>
                    <tr>
                      <td>本人希望</td>
                      <td>話合い結果</td>
                    </tr>
                  </thead>
                  <tbody>
                    <td>{props.sheet.careerPlan}</td>
                    <td>{props.sheet.careerPlanComment}</td>
                  </tbody>
                </Table>
              </Col>

              <Col
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <Row>
                  <Col
                    xs={5}
                    sm={5}
                    md={5}
                    lg={5}
                    xl={5}
                  >
                    <div>総合評価（所属長記入）＝＝＝＝⇒</div>
                  </Col>

                  <Col
                    xs={5}
                    sm={5}
                    md={5}
                    lg={5}
                    xl={5}
                  >
                    <Table bordered className={style.PDFOverAllEvaluationStyle}>
                      <thead>
                        <tr>
                          <td>現在の等級</td>
                          <td>前々期</td>
                          <td>前期</td>
                          <td>今期</td>
                        </tr>
                      </thead>
                      <tbody>
                        <td>{props.gradeString}</td>
                        <td>{props.twoYearsAgoOverAllEvaluation ? props.twoYearsAgoOverAllEvaluation : "-"}</td>
                        <td>{props.lastYearsAgoOverAllEvaluation ? props.lastYearsAgoOverAllEvaluation : "-"}</td>
                        {/* <td>{props.sheet.overAllEvaluation}</td> */}
                        <td>-</td>
                      </tbody>
                    </Table>
                  </Col>
                </Row>


                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                >
                  <div className={style.PDFTextStyle}>*評価基準　5:非常に良い成果をあげた、4:良い成果をあげた、3:成果は普通の水準であった、</div>
                  <div className={style.PDFTextStyle}>2:成果はやや物足りなかった、1:成果は不十分であった</div>
                </Col>
              </Col>

            </Row>

            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <h5>インタビュー実施記録</h5>
              </Col>
              <Col>
                <Table bordered className={style.PDFTableStyle}>
                  <thead>
                    <tr>
                      <td>目的</td>
                      <td>実施日時</td>
                      <td>内容（所属長記入）</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>目標設定（必須）</th>
                      <td>
                        {props.sheet.interviewPlanDate ?
                          <span>
                            {outputDate(props.sheet.interviewPlanDate)}
                          </span> : null}
                      </td>
                      <td>{props.sheet.interviewPlanComment}</td>
                    </tr>
                    <tr>
                      <th>中間 #1</th>
                      <td>
                        {props.sheet.InterviewMid1Date ?
                          <span>
                            {outputDate(props.sheet.InterviewMid1Date)}
                          </span> : null}
                      </td>
                      <td>{props.sheet.InterviewMid1Comment}</td>
                    </tr>
                    <tr>
                      <th>中間 #2</th>
                      <td>
                        {props.sheet.InterviewMid2Date ?
                          <span>
                            {outputDate(props.sheet.InterviewMid2Date)}
                          </span> : null}
                      </td>
                      <td>{props.sheet.InterviewMid2Comment}</td>
                    </tr>
                    <tr>
                      <th>中間 #3</th>
                      <td>
                        {props.sheet.InterviewMid3Date ?
                          <span>
                            {outputDate(props.sheet.InterviewMid3Date)}
                          </span> : null}
                      </td>
                      <td>{props.sheet.InterviewMid3Comment}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>

              <Col>
                <Table bordered className={style.PDFTableStyle}>
                  <thead>
                    <tr>
                      <td>目的</td>
                      <td>実施日時</td>
                      <td>内容（所属長記入）</td>
                      <td>本人確認</td>
                      <td>所属長確認</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>業績評価（必須）</td>
                      <td>
                        {/* {props.sheet.secondCheckDate} */}
                        {/* {props.sheet.secondCheckDate ?
                            <span>
                              {outputDate(props.sheet.secondCheckDate)}
                            </span> : null} */}
                      </td>
                      {/* <td>{props.sheet.secondComment}</td> */}
                      <td></td>
                      {/* <td>{props.sheet.selfCheckDate ? props.sheet.selfCheckDate : "-"}</td> */}
                      <td>-</td>
                      {/* <td>{props.sheet.secondCheckDate ? props.sheet.secondCheckDate : "-"}</td> */}
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>総合評価に関する部門長コメント</td>
                      <td>
                        {/* {props.sheet.firstCheckDate} */}
                        {/* {props.sheet.firstCheckDate ?
                            <span>
                              {outputDate(props.sheet.firstCheckDate)}
                            </span> : null} */}
                      </td>
                      {/* <td>{props.sheet.firstComment}</td> */}
                      <td></td>
                      {/* <td>{props.sheet.firstCheckDate ? props.sheet.firstCheckDate : "-"}</td> */}
                      <td>-</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>

        </div>
      )
      }
    </ReactToPdf >
  );
}
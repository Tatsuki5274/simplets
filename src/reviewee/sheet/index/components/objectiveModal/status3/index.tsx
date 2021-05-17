import { ErrorMessage, Formik } from "formik";
import React, { useContext, useState } from "react";
import { Badge, Button, Col, Form, Modal, Row } from "react-bootstrap";
import * as APIt from "API";
import { ObjectiveDao } from "lib/dao/objectiveDao";
import { updateObjective } from "graphql/mutations";
import { inputFieldStyle } from "common/globalStyle.module.scss";
import * as Yup from "yup";
import { Objective } from "API";
import ErrorText from "views/components/atoms/ErrorText";
import { ErrorContext } from "App";

type Props = {
  objective: Objective;
  isShowModal: boolean;
  handleClose: () => void;
};

export const RevieweeSheetObjectiveModalStatus3 = (props: Props) => {
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

  const setError = useContext(ErrorContext);
  const [isLoading, setLoading] = useState(false);

  if (props.objective) {
    return (
      <Formik
        initialValues={{
          selfEvaluation: String(props.objective.selfEvaluation),
          result: props.objective.result,
        }}
        validationSchema={Yup.object({
          selfEvaluation: Yup.string()
            .required("必須入力です")
            .typeError("正しく入力してください"),
          result: Yup.string().required("必須入力です").nullable(),
        })}
        onSubmit={async (values, actions) => {
          console.log("values", values);
          setLoading(true);

          // // 承認ステータス3の場合,実績と自己評価以外の項目を変更した場合の処理
          // if (sheet && sheet.statusValue === 3) {
          //     const comparisonValues = [values.content, values.expStartDate, values.expDoneDate, values.priority, values.selfEvaluation];
          //     const comparisonObjectives = [props.objective.content, props.objective.expStartDate, props.objective.expDoneDate, props.objective.priority, (props.objective.selfEvaluation)?.toString()];
          //     handleCheckObjectiveItems(comparisonValues, comparisonObjectives);
          // }

          //項目明細 情報更新
          // const objectiveId = props.objective.id;
          let selfEvaluationInput: number | null | undefined = parseInt(
            values.selfEvaluation
          );
          if (isNaN(selfEvaluationInput)) {
            selfEvaluationInput = undefined;
          }
          //目標変更の目標、ステータス、自己評価、優先順位、実績を項目明細に上書き
          const updateI: APIt.UpdateObjectiveInput = {
            createdAt: props.objective.createdAt || "", // unsafe
            id: props.objective.id || "", // unsafe
            selfEvaluation: selfEvaluationInput,
            result: values.result,
          };
          const updatedObjective = await ObjectiveDao.update(
            updateObjective,
            updateI
          );
          if (updatedObjective) {
            window.alert("実績入力が完了しました。");
            // 暫定的な対応
            // ファイルを読み直すためリロードが入り、通信量が多くなる。
            window.location.reload();
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
          } else {
            console.error("保存に失敗しました", updateObjective);
            setError("保存に失敗しました");
            setLoading(false);
          }

          props.handleClose();
        }}
      >
        {(formik) => (
          <Modal show={props.isShowModal} onHide={props.handleClose} size="xl">
            <form onSubmit={formik.handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>実績入力</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                    目標
                  </Col>
                  <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                    <p>{props.objective.content}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                    開始予定日
                  </Col>
                  <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                    <p>
                      {props.objective.expStartDate
                        ? props.objective.expStartDate.replace(/-/g, "/")
                        : null}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                    完了予定日
                  </Col>
                  <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                    <p>
                      {props.objective.expDoneDate
                        ? props.objective.expDoneDate.replace(/-/g, "/")
                        : null}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                    優先順位
                  </Col>
                  <Col xs={2} sm={2} md={2} lg={2} xl={1}>
                    <p>{props.objective.priority}</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                    自己評価<Badge variant="danger">必須</Badge>
                  </Col>
                  <Col xs={2} sm={2} md={2} lg={2} xl={1}>
                    <Form.Control
                      required
                      as="select"
                      name="selfEvaluation"
                      onChange={formik.handleChange}
                      defaultValue={
                        String(props.objective.selfEvaluation) || undefined
                      }
                      className={inputFieldStyle}
                    >
                      <option></option>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </Form.Control>
                    <p>
                      <ErrorText>
                        <ErrorMessage name="selfEvaluation" />
                      </ErrorText>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                    実績<Badge variant="danger">必須</Badge>
                  </Col>
                  <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                    <Form.Control
                      as="textarea"
                      name="result"
                      onChange={formik.handleChange}
                      defaultValue={props.objective.result || undefined}
                      className={inputFieldStyle}
                      rows={5}
                    />
                    <p>
                      <ErrorText>
                        <ErrorMessage name="result" />
                      </ErrorText>
                    </p>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? "処理中…" : "保存"}
                </Button>
                <Button variant="secondary" onClick={props.handleClose}>
                  キャンセル
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        )}
      </Formik>
    );
  } else {
    return null;
  }
};

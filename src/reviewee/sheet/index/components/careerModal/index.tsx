import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { SheetContext } from "../..";
import * as APIt from "API";
import { SheetDao } from "lib/dao/sheetDao";
import { updateSheet } from "graphql/mutations";
import { inputFieldStyle } from "common/globalStyle.module.scss";
import { ErrorContext } from "App";

type Props = {
  isShowModal: boolean;
  handleClose: () => void;
};

export const RevieweeSheetCareerModal = (props: Props) => {
  const setError = useContext(ErrorContext);
  const context = useContext(SheetContext);
  const sheet = context.sheet;
  const setSheet = context.setSheet;

  return (
    <Formik
      initialValues={{
        careerPlan: sheet ? sheet.careerPlan : null,
      }}
      onSubmit={async (values) => {
        if (sheet && setSheet) {
          if (sheet.sub && sheet.year && sheet.id) {
            const updateI: APIt.UpdateSheetInput = {
              id: sheet.id,
              sub: sheet.sub,
              companyID: sheet.companyID,
              reviewee: sheet.reviewee,
              year: sheet.year,
              careerPlan: values.careerPlan,
            };
            const updatedSheet = await SheetDao.update(updateSheet, updateI);

            if (updatedSheet) {
              setSheet({ ...updatedSheet });
            }
            props.handleClose();
          } else {
            console.error("必要なデータの取得に失敗しました", sheet);
            setError("必要なデータの取得に失敗しました");
          }
        } else {
          console.error("sheetの取得に失敗しています");
          setError("sheetの取得に失敗しています");
        }
      }}
    >
      {(formik) => (
        <Modal show={props.isShowModal} onHide={props.handleClose}>
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>キャリア計画</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>本人希望内容</Col>
                <Col>
                  <textarea
                    rows={10}
                    cols={60}
                    name="careerPlan"
                    onChange={formik.handleChange}
                    className={inputFieldStyle}
                  >
                    {formik.values.careerPlan}
                  </textarea>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                保存
              </Button>
              <Button variant="secondary" onClick={props.handleClose}>
                キャンセル
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

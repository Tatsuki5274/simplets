import { Sheet, UserContext } from "App";
import { Formik } from "formik";
import { getSheet } from "graphql/queries";
import { SheetDao } from "lib/dao/sheetDao";
import { getSectionKeys } from "lib/util";
import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ObjectiveCreateModalContent } from "./content";
import * as APIt from 'API';
import * as Yup from 'yup';
import { ObjectiveDao } from "lib/dao/objectiveDao";
import { createObjective } from "graphql/mutations";


type Props = {
    year: number
}

export type TypeForm = {
    sectionKeys: string | null,
    content: string,
    priority: string,
    expStartDate: string,
    expDoneDate: string,
}

export function ObjectiveCreateModal(props: Props){
    const [show, setShow] = useState(false);
    const [sheet, setSheet] = useState<Sheet | null>(null)
    const [defaultSectionKeys, setDefaultSectionKeys] = useState<string | null>(null);
    const currentUser = useContext(UserContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        ; (async () => {
            const sheet = await SheetDao.get(getSheet, { companyID: currentUser?.attributes["custom:companyId"] || "", reviewee: currentUser?.username || "", year: props.year })
            if (sheet && sheet.section && sheet.section.items) {
                sheet.section.items.sort(function (a, b) {
                    if (a?.category && b?.category && a.category.localID > b.category.localID) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                setSheet(sheet)

                const defaultSectionKeys = sheet.section.items[0] ? getSectionKeys(sheet.section.items[0]) : null;
                setDefaultSectionKeys(defaultSectionKeys)
            }
        })()
    }, [sheet]);
    if(sheet && defaultSectionKeys){
        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    目標追加
                </Button>
                <Modal
                    show={show}
                    onHide={handleClose}
                    size="xl"
                >
                    <Formik
                        initialValues={{
                            sectionKeys: defaultSectionKeys,
                            content: '',
                            priority: '',
                            expStartDate: '',
                            expDoneDate: '',
                        }as TypeForm}
                        validationSchema={Yup.object({
                            expStartDate: Yup.date().typeError('正しく入力してください').required('必須入力です'),
                            expDoneDate: Yup.date().min(Yup.ref('expStartDate'), ({min}) => `開始予定日より後の日付を入力してください`,)
                                .typeError('正しく入力してください')
                                .required('必須入力です'),
                            sectionKeys: Yup.string().required('目標カテゴリを選択してください').nullable(),
                            priority: Yup.string().required('必須入力です'),
                            content: Yup.string().required('必須入力です')
                        })}
                        onSubmit={async (values)=>{
                            //会社グループ権限が存在する場合,ミューテーション処理を実行
                            if (values.sectionKeys) {
                                if(sheet){
                                    const createI: APIt.CreateObjectiveInput = {
                                        companyID: sheet.companyID,
                                        sectionKeys: values.sectionKeys,
                                        content: values.content || "",
                                        priority: values.priority || "",
                                        expStartDate: values.expStartDate?.replace('T', '-') || "",
                                        expDoneDate: values.expDoneDate?.replace('T', '-') || "",
                                        progress: 0,
                                        topReviewers: sheet.topReviewers,
                                        secondReviewers: sheet.secondReviewers,
                                        referencer: sheet.referencer
                                    }
                                    const createR = await ObjectiveDao.create(createObjective, createI)
                                    if (createR) {
                                        // const createTM: APIt.CreateObjectiveMutation = createR.data;
                                        window.location.reload()
                                    } else {
                                        console.log("保存に失敗しました", createR)
                                    }
                                }else{
                                    console.error("目標追加時にシートの取得に失敗しています")
                                }

                            }
                        }}>
                        {formik => (
                            <form onSubmit={formik.handleSubmit}>
                                <Modal.Header closeButton>
                                <Modal.Title>目標追加</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ObjectiveCreateModalContent
                                        year={props.year}
                                        formik={formik}
                                        sheet={sheet}
                                        defaultSectionKeys={defaultSectionKeys}
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button type="submit">目標追加</Button>

                                    {/* <Button variant="primary" onClick={handleClose}>
                                        Save Changes
                                    </Button> */}
                                    <Button variant="secondary" onClick={handleClose}>
                                        閉じる
                                    </Button>
                                </Modal.Footer>
                            </form>
                        )}
                    </Formik>

                </Modal>
            </>
        )
    }else{
        return null
    }
}
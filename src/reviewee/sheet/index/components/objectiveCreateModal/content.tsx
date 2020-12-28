import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Container, Button, Form, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Sheet, UserContext } from 'App';
import { getSheet } from 'graphql/queries';
import * as APIt from 'API';
import CategoryInput from "./categoryInput"
import { createObjective } from 'graphql/mutations';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { SheetDao } from 'lib/dao/sheetDao';
import { inputFieldStyle } from 'common/globalStyle.module.scss';
import { getSectionKeys } from 'lib/util';
import { ObjectiveDao } from 'lib/dao/objectiveDao';

type Props = {
    sheetId: string
}

type TypeForm = {
    sectionKeys: string | null,
    content: string,
    priority: string,
    expStartDate: string,
    expDoneDate: string,
}

export function ObjectiveCreateModalContent(props: Props) {
    const sheetId = props.sheetId;
    const [sheet, setSheet] = useState<Sheet | null>(null)

    const [defaultSectionKeys, setDefaultSectionKeys] = useState<string | null>(null);

    const currentUser = useContext(UserContext);
    // 社員情報を取得

    const today: number = new Date().getFullYear()

    useEffect(() => {
        ; (async () => {
            const sheet = await SheetDao.get(getSheet, { companyID: currentUser?.attributes["custom:companyId"] || "", reviewee: currentUser?.username || "", year: today })
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
    }, [sheetId]);

    if (sheet && defaultSectionKeys) {
        return (
            <div>
                {/* ヘッダーの表示 */}

                <Container>
                    <Formik
                        initialValues={{
                            sectionKeys: defaultSectionKeys,
                            content: '',
                            priority: '',
                            expStartDate: '',
                            expDoneDate: '',
                        } as TypeForm
                        }
                        validationSchema={Yup.object({
                            expStartDate: Yup.date().typeError('正しく入力してください').required('必須入力です'),
                            expDoneDate: Yup.date().min(Yup.ref('expStartDate'), ({ }) => `開始予定日より後の日付を入力してください`,)
                                .typeError('正しく入力してください')
                                .required('必須入力です'),
                            sectionKeys: Yup.string().required('目標カテゴリを選択してください').nullable(),
                            priority: Yup.string().required('必須入力です'),
                            content: Yup.string().required('必須入力です')
                        })}

                        onSubmit={async (values) => {
                            console.log('values', values);

                            //会社グループ権限が存在する場合,ミューテーション処理を実行
                            // if(companyGroups && companyGroups[0] && companyGroups[1] && companyGroups[2]) {
                            if (values.sectionKeys) {
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
                                console.log('createI', createI);
                                const createR = await ObjectiveDao.create(createObjective, createI)
                                if (createR) {
                                    // const createTM: APIt.CreateObjectiveMutation = createR.data;
                                    window.location.reload()
                                } else {
                                    console.log("保存に失敗しました")
                                }
                            }
                            // } else {
                            //     console.error("会社グループの取得に失敗しました",companyGroups);
                            // }

                        }}
                    >
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                                <div>
                                    <Form.Label>目標カテゴリ<Badge variant="danger">必須</Badge></Form.Label>
                                    {sheet.section?.items?.map((section, index) => {
                                        if (section && section.category && section.category.name) {
                                            return (
                                                <CategoryInput
                                                    key={getSectionKeys(section)}
                                                    handleChange={props.handleChange}
                                                    sectionKeys={getSectionKeys(section)}
                                                    categoryName={section.category?.name}
                                                    defaultCheck={index === 0}
                                                    style={categoryInputStyle}
                                                ></CategoryInput>
                                            );

                                        } else {
                                            console.log("エラー: カテゴリが設定されていない可能性があります。")
                                        }
                                    })}
                                    <p><ErrorMessage name="sectionKeys" /></p>
                                </div>
                                <Form.Label>目標内容<Badge variant="danger">必須</Badge></Form.Label>
                                <Form.Control as="textarea" name="content" onChange={props.handleChange} className={inputFieldStyle} />
                                <p><ErrorMessage name="content" /></p>

                                <Form.Label>優先順位<Badge variant="danger">必須</Badge></Form.Label>
                                <Form.Control as="select" name="priority" onChange={props.handleChange} style={priorityStyle} className={inputFieldStyle}>
                                    <option></option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </Form.Control>
                                <p><ErrorMessage name="priority" /></p>

                                <Form.Label>開始予定日<Badge variant="danger">必須</Badge></Form.Label>
                                <Form.Control
                                    //required
                                    type="date"
                                    name="expStartDate"
                                    onChange={props.handleChange}
                                    className={inputFieldStyle}
                                    style={expDateInputStyle}
                                />
                                <p><ErrorMessage name="expStartDate" /></p>

                                <Form.Label>完了予定日<Badge variant="danger">必須</Badge></Form.Label>
                                <Form.Control
                                    //required
                                    type="date"
                                    name="expDoneDate"
                                    onChange={props.handleChange}
                                    className={inputFieldStyle}
                                    style={expDateInputStyle}
                                />
                                <p><ErrorMessage name="expDoneDate" /></p>

                                <Button type="submit">目標登録</Button>{' '}
                            </form>
                        )}
                    </Formik>
                </Container>
            </div>
        )
    } else {
        console.error("sheetが存在しません")
        return <span>表示にエラーが生じました</span>
    }
}

const priorityStyle: CSSProperties = {
    width: "100px"
}
const categoryInputStyle: CSSProperties = {
    fontSize: "24px",
    lineHeight: "40px",
    display: "inline"
}
const expDateInputStyle: CSSProperties = {
    width: "170px"
}
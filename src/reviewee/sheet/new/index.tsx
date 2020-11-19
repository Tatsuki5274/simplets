import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { Employee, Section, Sheet } from 'App';
import { GraphQLResult } from "@aws-amplify/api";
import { getEmployee, getSheet, listSections } from 'graphql/queries';
import * as APIt from 'API';
import { ListSectionsQuery, ListSectionsQueryVariables, ModelSectionFilterInput } from 'API';
import CategoryInput from "./categoryInput"
import { createObjective } from 'graphql/mutations';
import { Link, Redirect } from 'react-router-dom';
import HeaderComponents from 'common/header';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { SheetDao } from 'lib/dao/sheetDao';
import ApprovalStatusBox from 'common/approvalStatusBox';

type Props = {
    match: {
        params: {
            sheetId: string
        }
    }
}

type InputForm = {
    section?: string
    content?: string
    priority?: string
    expDoneDate?: string
    expStartDate?: string
}

function RevieweeSheetNew(props: Props){
    const sheetId = props.match.params.sheetId;
    const [sheet, setSheet] = useState<Sheet | null>(null)

    const [isRedirect, setIsRedirect] = useState<boolean>();

    const [companyGroups, setCompanyGroups] = useState<Array<string>>();


    // 社員情報を取得
    async function getQueryEmployee() {
        //ログインユーザ情報取得
        const currentUser = await Auth.currentAuthenticatedUser();
        const revieweeEmployeeID: string = currentUser.username;

        //所属長,部門長情報取得
        const input: APIt.GetEmployeeQueryVariables = {
            id: revieweeEmployeeID
        }
        let response;
        try {
            response = (await API.graphql(graphqlOperation(getEmployee, input))
            ) as GraphQLResult<APIt.GetEmployeeQuery>;
        } catch (e) {
            console.log("エラーを無視しています", e)
            response = e;
        }

        const employeeItem: Employee = response.data.getEmployee as Employee;
        
        return employeeItem;
    }

    // 会社グループ情報を取得
    async function getCompanyGroup() {
        const revieweeEmployee: Employee = await getQueryEmployee();
        const companyGroup = revieweeEmployee.company?.companyGroupName || "";
        const companyManagerGroup = revieweeEmployee.company?.companyManagerGroupName || "";
        const companyAdminGroup = revieweeEmployee.company?.companyAdminGroupName || "";
        const groupItems = [companyGroup, companyManagerGroup, companyAdminGroup];
        setCompanyGroups(groupItems);
    }

    useEffect(() => {
        ;(async()=>{
            const sheet = await SheetDao.get(getSheet, {id: sheetId})
            if(sheet && sheet.section && sheet.section.items){
                sheet.section.items.sort(function (a, b) {
                    if (a?.category?.no! > b?.category?.no!) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                setSheet(sheet)
            }


            // const queryInput: ListSectionsQueryVariables = {
            //     filter:{
            //         sectionSheetId: {
            //             eq: sheetId
            //         }
            //     } as ModelSectionFilterInput
            // }
            // const response = (await API.graphql(graphqlOperation(listSections, queryInput))
            // )as GraphQLResult<ListSectionsQuery>;
            // const repsonseSection = response.data?.listSections?.items as Section[];
            
            // //カテゴリ情報のnoを元にソート
            // repsonseSection?.sort(function (a, b) {
            //     if (a.category?.no! > b.category?.no!) {
            //         return 1;
            //     } else {
            //         return -1;
            //     }
            // });
            // setSections(repsonseSection);

            // // companyGroupsを取得
            getCompanyGroup();
            // console.log(repsonseSection)
        })()
      },[sheetId]);
      
    if(isRedirect) return <Redirect to={`/reviewee/sheet/${sheetId}`} />
    else if(sheet){
        return (
            <div>
                {/* ヘッダーの表示 */}
                <HeaderComponents />
                
                <Container>
                    <Link to={`/reviewee/sheet/${sheetId}`} >
                        <Button >戻る</Button>
                    </Link>
                    <ApprovalStatusBox statusValue={sheet.statusValue || -1} />
                    <h2>業績目標設定</h2>
                    <Formik
                        initialValues={{
                            section: '',
                            content: '',
                            priority: '',
                            expStartDate: '',
                            expDoneDate: '',
                        }}
                        validationSchema={Yup.object({
                            expStartDate: Yup.date().typeError('正しく入力してください').required('必須入力です'),
                            expDoneDate: Yup.date().min(Yup.ref('expStartDate'), ({ min }) => `開始予定日より後の日付を入力してください`,)
                                .typeError('正しく入力してください')
                                .required('必須入力です'),
                            section: Yup.string().required('目標カテゴリを選択してください'),
                            priority: Yup.string().required('必須入力です'),
                            content: Yup.string().required('必須入力です')
                        })}
                        
                        onSubmit={async (values, actions) => {
                            console.log('values', values);

                            //会社グループ権限が存在する場合,ミューテーション処理を実行
                            if(companyGroups && companyGroups[0] && companyGroups[1] && companyGroups[2]) {

                                const createI: APIt.CreateObjectiveInput = {
                                    content: values.content || "",
                                    priority: values.priority || "",
                                    objectiveSectionId: values.section || "",
                                    expStartDate: values.expStartDate?.replace('T', '-') || "",
                                    expDoneDate: values.expDoneDate?.replace('T', '-') || "",
                                    readGroups: [companyGroups[0]],
                                    updateGroups: [companyGroups[1], companyGroups[2]],
                                    progress: 0
                                }
                                console.log('createI',createI);
                                const createMV: APIt.CreateObjectiveMutationVariables = {
                                    input: createI
                                }
                                let createR: GraphQLResult<APIt.CreateObjectiveMutation>
                                try {
                                    createR = await API.graphql(graphqlOperation(createObjective, createMV)) as GraphQLResult<APIt.CreateObjectiveMutation>;
                                } catch (e) {
                                    console.log("エラーを無視しています", e)
                                    console.log("データが不完全でないことを確認してください")
                                    createR = e;
                                }
                                if (createR.data) {
                                    const createTM: APIt.CreateObjectiveMutation = createR.data;
                                    setIsRedirect(true);
                                } else {
                                    console.log("保存に失敗しました")
                                }
                            } else {
                                console.error("会社グループの取得に失敗しました",companyGroups);
                            }

                        }}
                    >
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                                <div>
                                    <Form.Label>目標カテゴリ<Badge variant="danger">必須</Badge></Form.Label>
                                    {sheet.section?.items?.map((section, index) => {
                                        if (section && section.category && section.category.name) {
                                            if (index === 0) {
                                                return (
                                                    <CategoryInput key={section.id} handleChange={props.handleChange} sectionId={section.id} categoryName={section.category?.name} defaultCheck={true}></CategoryInput>
                                                );
                                            } else {
                                                return (
                                                    <CategoryInput key={section.id} handleChange={props.handleChange} sectionId={section.id} categoryName={section.category?.name} defaultCheck={false}></CategoryInput>
                                                );
                                            }
                                        } else {
                                            console.log("エラー: カテゴリが設定されていない可能性があります。")
                                        }
                                    })}
                                    <p><ErrorMessage name="section" /></p>
                                </div>
                                <Form.Label>目標内容<Badge variant="danger">必須</Badge></Form.Label>
                                <Form.Control as="textarea" name="content" onChange={props.handleChange}/>
                                <p><ErrorMessage name="content" /></p>

                                <Form.Label>優先順位<Badge variant="danger">必須</Badge></Form.Label>
                                <Form.Control as="select" name="priority" onChange={props.handleChange}>
                                    <option></option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </Form.Control>
                                <p><ErrorMessage name="priority" /></p>
                                <Row>
                                    <Col md="2" lg="2" xl="2">開始予定日<Badge variant="danger">必須</Badge></Col>
                                    <Col md="4" lg="4" xl="4">
                                        <Form.Control
                                            //required
                                            type="date"
                                            name="expStartDate"
                                            onChange={props.handleChange}
                                        />
                                        <ErrorMessage name="expStartDate" />
                                    </Col>
                                    <Col md="2" lg="2" xl="2">完了予定日<Badge variant="danger">必須</Badge></Col>
                                    <Col md="4" lg="4" xl="4">
                                        <Form.Control
                                            //required
                                            type="date"
                                            name="expDoneDate"
                                            onChange={props.handleChange}
                                        />
                                        <ErrorMessage name="expDoneDate" />
                                    </Col>
                                </Row>
                                <Button type="submit">目標登録</Button>{' '}
                            </form>
                        )}
                    </Formik>
                </Container>
            </div>
        )
    }else{
        console.error("sheetが存在しません")
        return <span>表示にエラーが生じました</span>
    }
}

export default RevieweeSheetNew;
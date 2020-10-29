import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API, graphqlOperation } from 'aws-amplify';
import { Section } from 'App';
import { GraphQLResult } from "@aws-amplify/api";
import { listSections } from 'graphql/queries';
import * as APIt from 'API';
import { ListSectionsQuery, ListSectionsQueryVariables, ModelSectionFilterInput } from 'API';
import CategoryInput from "./categoryInput"
import { createObjective } from 'graphql/mutations';
import { Redirect } from 'react-router-dom';
import HeaderComponents from 'common/header';
import { Formik } from 'formik';

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

    const [isRedirect, setIsRedirect] = useState<boolean>();
    const [sections, setSections] = useState<Section[]>();
    // const [input, setInput] = useState<InputForm>({});

    // function handleChange(event: ChangeEvent<HTMLInputElement>){
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;
    //     setInput({ ...input, [name]: value });
    // }

    // async function onSubmit(event: ChangeEvent<HTMLInputElement>){
    //     event.preventDefault();
    //     const createI: APIt.CreateObjectiveInput = {
    //         content: input.content || "",
    //         priority: input.priority || "",
    //         objectiveSectionId: input.section || "",
    //         expStartDate: input.expStartDate?.replace('T', '-') || "",
    //         expDoneDate: input.expDoneDate?.replace('T', '-') || "",
    //     }
    //     const createMV: APIt.CreateObjectiveMutationVariables = {
    //         input: createI
    //     }
    //     let createR: GraphQLResult<APIt.CreateObjectiveMutation>
    //     try{
    //         createR = await API.graphql(graphqlOperation(createObjective, createMV)) as GraphQLResult<APIt.CreateObjectiveMutation>;
    //     }catch(e){
    //         console.log("エラーを無視しています", e)
    //         console.log("データが不完全でないことを確認してください")
    //         createR = e;
    //     }
    //     if(createR.data){
    //         const createTM: APIt.CreateObjectiveMutation = createR.data;
    //         setIsRedirect(true);
    //     }else{
    //         console.log("保存に失敗しました")
    //     }

    // }

    useEffect(() => {
        ;(async()=>{

            const queryInput: ListSectionsQueryVariables = {
                filter:{
                    sectionSheetId: {
                        eq: sheetId
                    }
                } as ModelSectionFilterInput
            }
            const response = (await API.graphql(graphqlOperation(listSections, queryInput))
            )as GraphQLResult<ListSectionsQuery>;
            const repsonseSection = response.data?.listSections?.items as Section[];
            
            //カテゴリ情報のnoを元にソート
            repsonseSection?.sort(function (a, b) {
                if (a.category?.no! > b.category?.no!) {
                    return 1;
                } else {
                    return -1;
                }
            });
            setSections(repsonseSection);
            console.log("section", repsonseSection);
        })()
      },[]);
      
    if(isRedirect) return <Redirect to={`/reviewee/sheet/${sheetId}`} />
    return (
        <div>
            {/* ヘッダーの表示 */}
            <HeaderComponents />
            
            <Container>
                <Formik
                    initialValues={{
                        section: '',
                        content: '',
                        priority: '',
                        expStartDate: '',
                        expDoneDate: '',

                    }}
                    onSubmit={async (values, actions) => {
                        console.log('values', values);

                        const createI: APIt.CreateObjectiveInput = {
                            content: values.content || "",
                            priority: values.priority || "",
                            objectiveSectionId: values.section || "",
                            expStartDate: values.expStartDate?.replace('T', '-') || "",
                            expDoneDate: values.expDoneDate?.replace('T', '-') || "",
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

                    }}
                >
                    {props => (
                        <form onSubmit={props.handleSubmit}>
                            <div>
                                {sections?.map((section: Section) => {
                                    if (section.category && section.category.name) {
                                        return <CategoryInput key={section.id} handleChange={props.handleChange} sectionId={section.id} categoryName={section.category?.name}></CategoryInput>
                                    } else {
                                        console.log("エラー: カテゴリが設定されていない可能性があります。")
                                    }
                                })}
                            </div>
                            <Form.Label>目標内容</Form.Label>
                            <Form.Control as="textarea" name="content" onChange={props.handleChange}/>

                            <Form.Label>優先順位</Form.Label>
                            <Form.Control as="select" name="priority" onChange={props.handleChange}>
                                <option></option>
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                            </Form.Control>
                            <Row>
                                <Col md="2" lg="2" xl="2">開始予定日</Col>
                                <Col md="4" lg="4" xl="4">
                                    <Form.Control
                                        required
                                        type="date"
                                        name="expStartDate"
                                        onChange={props.handleChange}
                                    />
                                </Col>
                                <Col md="2" lg="2" xl="2">完了予定日</Col>
                                <Col md="4" lg="4" xl="4">
                                    <Form.Control
                                        required
                                        type="date"
                                        name="expDoneDate"
                                        onChange={props.handleChange}
                                    />
                                </Col>
                            </Row>
                            <Button variant="success" type="submit">目標登録</Button>{' '}
                        </form>
                    )}
                </Formik>
            </Container>
        </div>
    )
}

export default RevieweeSheetNew;
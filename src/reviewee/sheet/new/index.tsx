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
}

function RevieweeSheetNew(props: Props){
    const sheetId = props.match.params.sheetId;

    const [isRedirect, setIsRedirect] = useState<boolean>();
    const [sections, setSections] = useState<Section[]>();
    const [input, setInput] = useState<InputForm>({});

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setInput({ ...input, [name]: value });
    }

    async function onSubmit(event: ChangeEvent<HTMLInputElement>){
        event.preventDefault();
        const createI: APIt.CreateObjectiveInput = {
            content: input.content || "",
            priority: input.priority || "",
            objectiveSectionId: input.section || "",
        }
        const createMV: APIt.CreateObjectiveMutationVariables = {
            input: createI
        }
        let createR: GraphQLResult<APIt.CreateObjectiveMutation>
        try{
            createR = await API.graphql(graphqlOperation(createObjective, createMV)) as GraphQLResult<APIt.CreateObjectiveMutation>;
        }catch(e){
            console.error("エラーを無視しています", e)
            console.error("データが不完全でないことを確認してください")
            createR = e;
        }
        if(createR.data){
            const createTM: APIt.CreateObjectiveMutation = createR.data;
            setIsRedirect(true);
        }else{
            console.log("保存に失敗しました")
        }

    }

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
                <Form onSubmit={onSubmit}>
                    <div>
                        {sections?.map((section: Section)=>{
                            if(section.category && section.category.name){
                                return <CategoryInput key={section.id} handleChange={handleChange} sectionId={section.id} categoryName={section.category?.name}></CategoryInput>
                            }else{
                                console.log("エラー: カテゴリが設定されていない可能性があります。")
                            }
                        })}
                    </div>
                    <Form.Label>目標内容</Form.Label>
                    <Form.Control placeholder="目標内容を入力" onChange={handleChange} name="content" />

                    <Form.Label>優先順位</Form.Label>
                    <Form.Control as="select" onChange={handleChange} name="priority">
                        <option>未選択</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                    </Form.Control>
                    <Button variant="success" type="submit">目標登録</Button>{' '}
                </Form>


            </Container>
        </div>
    )
}

export default RevieweeSheetNew;
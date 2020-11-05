import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Card, ToggleButton, ToggleButtonGroup, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API, graphqlOperation } from 'aws-amplify';
import { listGroups, listSheets } from 'graphql/queries';
import { GetEmployeeQuery, ListGroupsQuery, ListSheetsQuery } from 'API';
import { GraphQLResult } from "@aws-amplify/api";
import * as APIt from 'API';
import { Employee, Group, Objective, Section, Sheet } from 'App';
import { getEmployee } from 'graphql/queries'
import SidebarComponents from 'common/Sidebar';
import HeaderComponents from 'common/header';//ヘッダーの表示
import style from './progressStyle.module.scss';
import { Link } from 'react-router-dom';
import { ArcGauge } from '@progress/kendo-react-gauges';

type ViewType = {
    sheetId: string
    reviewee: {
        lastName: string,
        firstName: string
    }
    groupName: string
    categorys: {
        name: string | undefined
        avg: number
    }[] | undefined,
    avg: number
}


function ProgressReferenceList() {
    //今日の日付を取得
    const today: Date = new Date();
    const thisYear: number = today.getFullYear();
    let yearList: Array<number> = [];
    for (let step = 0; step < 10; step++) {
        yearList.push((thisYear - step));
    }

    const [sheets, setSheets] = useState<Sheet[]>();
    const [sheetsView, setSheetsView] = useState<ViewType[]>();
    

    const [groupValue, setGroupValue] = useState([]);
    const handleChangeBottun = (val: any) => setGroupValue(val);
    console.log(groupValue)

    //選択する部署のデータを取得して昇順でソートして表示する機能
    const [groupList, setGroupList] = useState<Group[]>()
    useEffect(() => {
        ; (async () => {

            try {
                const groupList: APIt.ListGroupsQueryVariables = {
                }
                const response = (await API.graphql(graphqlOperation(listGroups, groupList))
                ) as GraphQLResult<ListGroupsQuery>;

                const groupItem = response.data?.listGroups?.items as Group[];
                //昇順でソートしてgroupItemに保存
                groupItem?.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                setGroupList(groupItem);
            } catch (e) {
                console.log(e);
            }

        })()
    }, []);

    //フォーム内で選択された部門と年度をformInputに保存する
    const [formInput, setFormInput] = useState<any>({ year: thisYear })
    function handleChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name: string = target.name;

        setFormInput({
            ...formInput, [name]: value
        });
        console.log(formInput)

    }

    //選択された部門と年度によって各社員の進捗情報を抽出する
    async function handleClickSearch() {
        let listItems: Sheet[];
        //部門の選択肢の中から「全て」が選択された場合
        if (formInput.groupId === "all") {
            const listQV: APIt.ListSheetsQueryVariables = { filter: { year: { eq: parseInt(formInput.year as string) } } };
            let response;
            try{
                response = await (API.graphql(graphqlOperation(listSheets, listQV))) as GraphQLResult<ListSheetsQuery>;
            }catch(e){
                console.log("エラーを無視しています", e);
                response = e;
            }
            listItems = response.data?.listSheets?.items;
            setSheets(listItems as Sheet[]);
            console.log(response);
            console.log(listItems);
            //部門の選択肢の中から「全て」以外が選択された場合
        } else {
            const listQV: APIt.ListSheetsQueryVariables = { filter: { sheetGroupId: { eq: formInput.groupId }, year: { eq: parseInt(formInput.year as string) } } };

            let response;
            try{
                response = await (API.graphql(graphqlOperation(listSheets, listQV))
                ) as GraphQLResult<ListSheetsQuery>;
            }catch(e){
                console.log("エラーを無視しています", e);
                response = e;
            }
            listItems = response.data?.listSheets?.items;
            setSheets(listItems as Sheet[]);
            console.log(response);
            console.log(listItems);
        }

        // 平均値を算出する処理
        const getAgvObjective = (section: Section)=>{
            let sum = 0;
            let cnt = 0;
            let ret = -1;
            section?.objective?.items?.forEach((objective)=>{
                if(objective && objective.progress){
                    sum += objective?.progress;
                    cnt++;
                }
            })
            if(cnt > 0) ret = sum / cnt;
            return ret;
        }
        const getAvg = (nums: number[]) =>{
            let sum = 0;
            let cnt = 0;
            let ret = -1;

            nums.forEach((num)=>{
                if(num !== -1){
                    sum += num;
                    cnt++;
                }
            })
            if(cnt > 0) ret = sum / cnt;
            return ret;
        }
        // 画面表示に必要な情報を加工する処理
        let viewTemp: ViewType[] = listItems.map((sheet: Sheet)=>{
            return {
                sheetId: sheet.id,
                groupName: sheet.group?.name || "",
                reviewee: {
                    firstName: sheet.revieweeEmployee?.firstName || "",
                    lastName: sheet.revieweeEmployee?.lastName || ""
                },
                categorys: sheet.section?.items?.map((section)=>{
                    return {
                        name: section?.category?.name,
                        avg: getAgvObjective(section as Section)
                    }
                }),
                avg: -1
            }
        })
        const view = viewTemp.map(item=>{
            return {
                ...item,
                avg: item.categorys ? 
                    getAvg(item.categorys.map(cat=>{
                        return cat.avg;
                    })) 
                : -1
            }            
        })

        setSheetsView(view);
    }

    const arcColors = [
        {
            to: 25,
            color: '#0058e9'
        }, {
            from: 25,
            to: 50,
            color: '#f31700'
        }, {
            from: 50,
            to: 75,
            color: '#ffc000'
        }, {
            to: 75,
            color: '#00ffff'
        }, {
            to: 100,
            color: '#7fff00'
        }
    ];

    return (
        <div>
            <div id="gage"></div>
            {/* ヘッダーの表示 */}
            <HeaderComponents />
            {/* サイドバーコンポーネント 表示 */}
            <SidebarComponents />
            

            <Container>
                <h2>進捗参照</h2><br />
                {/* 部門の選択肢を表示 */}
                <InputGroup.Prepend>
                    <span>
                        <InputGroup.Radio value="all" name="groupId" onChange={handleChange} aria-label="Radio button for following text input" inline />
                        <span>全て</span>
                    </span>
                    {groupList?.map((group: Group) => {
                        return (
                            <span>
                                <InputGroup.Radio value={group.id} name="groupId" onChange={handleChange} aria-label="Radio button for following text input" inline />
                                <span>{group.name}</span>
                            </span>
                        )
                    }
                    )}
                </InputGroup.Prepend>


                <Form>
                    {/* 年度の選択肢を表示 */}
                    <Form.Group controlId="Form.Dropdown">
                        <Form.Label>年度</Form.Label>
                        <Form.Control as="select" onChange={handleChange} name="year">
                            {yearList.map((year: number) => {
                                return (
                                    <option value={year}>{year}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>

                    {/* 確認を表示 */}
                    <Form.Group>
                        <Button type="button" onClick={handleClickSearch}>確認</Button>
                    </Form.Group>

                </Form>
                <br />

                {sheetsView?.map(view => {
                   return (
                        <Card className={style.linkbox}>
                            <Link to={`/reviewer/sheet/${view.sheetId}`} />
                            {/* 社員の姓名と部門名を表示 */}
                           <Card.Header>
                               {view.reviewee.lastName}
                               {view.reviewee.firstName}
                               &nbsp;
                               {view.groupName}
                               &nbsp;
                               {view.avg !== -1 ? `${view.avg}%` : null}
                               <ArcGauge
                                    {...{
                                        value: view.avg,
                                        colors: arcColors
                                    }} style={{
                                        width: '50px',
                                        height: '50px',
                                        display: 'inline-block'
                                    }} 
                                />
                            </Card.Header>
                            <Card.Body>
                                {view.categorys?.map(category=>{
                                    return <div>
                                        {category.name}&nbsp;{category.avg === -1 ? "-" : category.avg}
                                        <ArcGauge {...{
                                            value: category.avg,
                                            colors: arcColors
                                        }} style={{
                                            width: '50px',
                                            height: '50px',
                                            display: 'inline-block'
                                        }} />
                                    </div>
                                })}
                            </Card.Body>
                        </Card>
                    )
                })}


            </Container>
        </div>
    );
}

export default ProgressReferenceList;
import React, { useState, useEffect } from 'react';
import { Container, Button, Card, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API, graphqlOperation } from 'aws-amplify';
import { listGroups, listSheets } from 'graphql/queries';
import { ListGroupsQuery, ListSheetsQuery } from 'API';
import { GraphQLResult } from "@aws-amplify/api";
import * as APIt from 'API';
import { Group, Section, Sheet } from 'App';
import SidebarComponents from 'common/Sidebar';
import HeaderComponents from 'common/header';//ヘッダーの表示
import style from './progressStyle.module.scss';
import { Link } from 'react-router-dom';
import { ArcGauge } from '@progress/kendo-react-gauges';
import { Field, Form, Formik } from 'formik';
import { SheetDao } from 'lib/dao/sheetDao';
import GaugeChart from 'react-gauge-chart';

type ViewType = {
    sheetId: string
    reviewee: {
        lastName: string,
        firstName: string
    }
    groupName: string
    categorys: {
        name: string | undefined
        avg: number,
        no: number | null | undefined,
        id: string | undefined
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

    const [sheetsView, setSheetsView] = useState<ViewType[]>();
    
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

    useEffect(()=>{
        (async()=>{
            const filter =  { filter: { year: { eq: today.getFullYear() } } }
            const listItems = await SheetDao.list(listSheets, filter)
            if(listItems){
                setView(listItems)
            }
        })()
    }, [])

    const setView = (listItems: Sheet[])=>{
        // 平均値を算出する処理
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
        let viewTemp: ViewType[] = listItems.map((sheet)=>{
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
                        avg: section && section.objective && section.objective.items ?
                            getAvg(section.objective.items.map((obj)=>{
                                return  obj && obj.progress ? obj.progress : -1
                            })) : -1,
                        no: section?.category?.no,
                        id: section?.category?.id
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
                <Formik
                    initialValues={{
                        year: today.getFullYear(),
                        groupId: "",
                    }}
                    onSubmit={async (values)=>{
                        let filter: APIt.ListSheetsQueryVariables =  { filter: { year: { eq: values.year } } }
                        if(values.groupId !== "all") filter = { filter: { year: { eq: values.year }, sheetGroupId: {eq: values.groupId} } }
                        const listItems = await SheetDao.list(listSheets, filter)
                        console.log(listItems)

                        if(listItems){
                            setView(listItems)
                        }
                    }}
                >
                    {(formik) => (
                        <Form>
                            <div>
                                {/* 部門の選択肢を表示 */}
                                <span>
                                    <Field type="radio" name="groupId" value="all" />
                                    全て
                                </span>
                                {groupList?.map((group: Group) => {
                                    return (
                                        <span>
                                            <Field type="radio" name="groupId" value={group.id} />
                                            {group.name}
                                        </span>
                                    )
                                })}
                            </div>

                            {/* 年度の選択肢を表示 */}
                            <span>年度</span>
                            <Field as="select" name="year">
                                {yearList.map((year: number) => {
                                    return (
                                        <option value={year}>{year}</option>
                                    )
                                })}
                            </Field>

                            {/* 確認を表示 */}
                            <Button type="submit">確認</Button>

                        </Form>
                    )}
                </Formik>

                <br />

                {sheetsView?.map(view => {
                    view.categorys?.sort(function (a, b) {
                        if (a.no! > b.no!) {
                            return 1;
                        } else {
                            return -1;
                        }
                    });
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
                               <GaugeChart id={`chart-${view.sheetId}`}
                                   nrOfLevels={10}
                                   colors={['#EA4228', '#F5CD19', '#5BE12C']}
                                   percent={view.avg / 100}
                                   hideText={true}
                                   style={{
                                       width: '100px',
                                       height: '50px',
                                       display: 'inline-block'
                                   }}
                               />
                            </Card.Header>
                            <Card.Body>
                                {view.categorys?.map(category=>{
                                    if (category.id) {
                                        return <div id={category.id}>
                                            {category.name}&nbsp;{category.avg === -1 ? "-" : category.avg}
                                            <GaugeChart id={`chart-${category.id}`}
                                                nrOfLevels={10}
                                                colors={['#EA4228', '#F5CD19', '#5BE12C']}
                                                percent={category.avg / 100}
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    display: 'inline-block'
                                                }}
                                            />
                                        </div>
                                    }
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
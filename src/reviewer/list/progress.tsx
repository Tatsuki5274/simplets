import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API, graphqlOperation } from 'aws-amplify';
import { listGroups, listSheetYear } from 'graphql/queries';
import { ListGroupsQuery } from 'API';
import { GraphQLResult } from "@aws-amplify/api";
import * as APIt from 'API';
import { Group, Sheet, UserContext } from 'App';
import SidebarComponents, { performanceSidebarBackgroundColor } from 'common/Sidebar';
import HeaderComponents from 'common/header';//ヘッダーの表示
import style from './progressStyle.module.scss';
import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { SheetDao } from 'lib/dao/sheetDao';
import GaugeChart from 'react-gauge-chart';
import { calcAvg, round} from 'lib/util';
import { routeBuilder } from 'router';


type ViewType = {

    // sheetId: string
    companyId: string,
    year: string,
    reviewee: string,

    revieweeName: {
        lastName: string,
        firstName: string
    }
    groupName: string
    categorys: {
        name: string | undefined
        avg: number | null,
        no: number | null | undefined,
        id: string | undefined,
        sectionId?: string
    }[] | undefined,
    avg: number | null
}


function ProgressReferenceList() {
    //今日の日付を取得
    const today: Date = new Date();
    const thisYear: number = today.getFullYear();
    let yearList: Array<number> = [];
    for (let step = 0; step < 10; step++) {
        yearList.push((thisYear - step));
    }

    // const [sheets, setSheets] = useState<Sheet[] | null>(null)
    const [sheetsView, setSheetsView] = useState<ViewType[]>();
    
    //選択する部署のデータを取得して昇順でソートして表示する機能
    const [groupList, setGroupList] = useState<Group[]>()

    // ログインユーザを取得する
    const currentUser = useContext(UserContext);
    
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
            if (currentUser) {
                const listYearQV: APIt.ListSheetYearQueryVariables = {
                    companyID: currentUser.attributes["custom:companyId"],
                    year: {
                        eq: today.getFullYear()
                    }
                };

                const listItems = await SheetDao.listYear(listSheetYear, listYearQV)
                if (listItems) {
                    // setSheets(listItems)
                    listItems.sort(function (a, b) {
                        // 社員番号の昇順でソート
                        if (a.revieweeEmployee?.localID && b.revieweeEmployee?.localID && a.revieweeEmployee.localID > b.revieweeEmployee.localID) {
                            return 1
                        }

                        return -1
                    })
                    setView(listItems)
                }
            }
        })()
    }, [currentUser])

    const setView = (listItems: Sheet[])=>{
        // 画面表示に必要な情報を加工する処理
        let viewTemp: ViewType[] = listItems.map((sheet)=>{
            return {

                // sheetId: sheet.id,
                companyId: sheet.companyID,
                year: String(sheet.year),
                reviewee: sheet.reviewee,
                groupName: sheet.group?.name || "",
                revieweeName: {
                    firstName: sheet.revieweeEmployee?.firstName || "",
                    lastName: sheet.revieweeEmployee?.lastName || ""
                },
                categorys: sheet.section?.items?.map((section)=>{
                    return {
                        name: section?.category?.name,
                        avg: section && section.objective && section.objective.items ?
                            calcAvg(section.objective.items.map((obj)=>{
                                return  obj && obj.progress ? obj.progress : 0
                            })) : null,
                        no: section?.category ? parseInt(section.category.localID) : null,
                        id: section?.category?.localID,
                        sectionId: section?.companyID
                    }
                }),
                avg: -1
            }
        })
        const view = viewTemp.map(item=>{
            return {
                ...item,
                avg: item.categorys ? 
                    calcAvg(item.categorys.map(cat=>{
                        return cat.avg;
                    })) 
                : -1
            }            
        })

        setSheetsView(view);
    }

    return (
        <div>
            <div id="gage"></div>
            {/* ヘッダーの表示 */}
            <HeaderComponents />
            <Row>
                <Col
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    xl={1}
                    style={performanceSidebarBackgroundColor}
                >
                    {/* サイドバーコンポーネント 表示 */}
                    <SidebarComponents />
                </Col>
                <Col
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                >
                    <h2>進捗参照</h2><br />
                    <Formik
                        initialValues={{
                            year: today.getFullYear(),
                            groupId: "",
                        }}
                        onSubmit={async (values)=>{
                            let filter: APIt.ListSheetYearQueryVariables = {
                                companyID: currentUser?.attributes["custom:companyId"],
                                year: {
                                    eq: values.year
                                },
                            }
                            if(values.groupId !== "all") filter = {
                                companyID: currentUser?.attributes["custom:companyId"],
                                year: {
                                    eq: values.year
                                },
                                filter: {
                                    sheetGroupLocalId: {eq: values.groupId} //選択した部署情報
                                }
                            }
                            const listItems = await SheetDao.listYear(listSheetYear, filter)
                            console.log(listItems)

                            if(listItems){
                                setView(listItems)
                            }
                        }}
                    >
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit}>
                                <div>
                                    {/* 部門の選択肢を表示 */}
                                    <span className={`${style.selectionSize} ${style.selectionMargin}`}>
                                        <Field type="radio" name="groupId" value="all" handleChange={formik.handleChange}/>
                                        全て
                                    </span>
                                    {groupList?.map((group: Group) => {
                                        return (
                                            <span className={`${style.selectionSize} ${style.selectionMargin}`}>
                                                <Field type="radio" name="groupId" value={group.localID} handleChange={formik.handleChange}/>
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
                    {/* {sheets?.map(sheet => {
                        return (
                            <Card className={style.linkbox}>
                                <Link to={`/reviewer/sheet/${sheet.id}`} />
                            <Card.Header>
                                    {sheet.revieweeEmployee?.lastName}
                                    {sheet.revieweeEmployee?.firstName}
                                    &nbsp;
                                    {sheet.revieweeEmployee?.group?.name}
                                    &nbsp;
                                    <OSheetAvgGauge
                                        id={sheet.id}
                                        progressLists={extProgressFromSheet(sheet)}
                                    />
                                    最新版
                                </Card.Header>
                                <Card.Body>
                                    {sheet.section?.items?.map(sec => {
                                        const section = sec as Section
                                        return section ? (
                                            <div>
                                                {section.category.name}&nbsp;{section.category.avg === -1 ? "-" : category.avg}
                                                <OObjectiveAvgGauge
                                                    id={section.id}
                                                    progressList={extProgressFromSection(section)}
                                                />
                                            </div>
                                        ) : null
                                    })}
                                </Card.Body>
                            </Card>
                        )
                    })} */}

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
                                <Link to={routeBuilder.reviewerDetailPath(view.companyId,view.reviewee,view.year)} />
                                {/* 社員の姓名と部門名を表示 */}
                            <Card.Header>
                                {view.revieweeName.lastName}
                                {view.revieweeName.firstName}
                                &nbsp;
                                {view.groupName}
                                &nbsp;
                                {view.avg ? `${round(view.avg, 2).toFixed(1)}%` : null}

                                {view.avg ?
                                <GaugeChart id={`chart-${view.groupName}-${view.avg}`}
                                    nrOfLevels={10}
                                    colors={['#EA4228', '#F5CD19', '#5BE12C']}
                                    percent={view.avg / 100}
                                    hideText={true}
                                    style={{
                                        width: '100px',
                                        height: '50px',
                                        display: 'inline-block'
                                    }}
                                /> : null}
                                </Card.Header>
                                <Card.Body>
                                    {view.categorys?.map(category=>{
                                        return category.id && category.avg ?
                                        <div id={category.id}>
                                            {category.name}&nbsp;{round(category.avg, 2).toFixed(1)}
                                            <GaugeChart id={`chart-${category.sectionId}`}
                                                nrOfLevels={10}
                                                colors={['#EA4228', '#F5CD19', '#5BE12C']}
                                                percent={category.avg / 100}
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    display: 'inline-block'
                                                }}
                                            />
                                        </div> :
                                        <div id={category.id}>
                                            {category.name}&nbsp;-
                                        </div>
                                    })}
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Col>
            </Row>
        </div>
    );
}

export default ProgressReferenceList;
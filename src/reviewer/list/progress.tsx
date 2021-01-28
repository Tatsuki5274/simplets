import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as APIt from 'API';
import { EmployeeContext, Group, Sheet, UserContext } from 'App';
import SidebarComponents, { performanceSidebarBackgroundColor } from 'common/Sidebar';
import HeaderComponents from 'common/header';//ヘッダーの表示
import style from './progressStyle.module.scss';
import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { SheetDao } from 'lib/dao/sheetDao';
import GaugeChart from 'react-gauge-chart';
import { calcAvg, getSectionKeys, getSheetKeys, getThisYear, round} from 'lib/util';
import { routeBuilder } from 'router';
import { GroupDao } from 'lib/dao/groupDao';
import ApprovalStatusBox from 'common/approvalStatusBox';
import LeftBox from 'views/components/templates/LeftBox';
import RightBox from 'views/components/templates/RightBox';
import Content from 'views/components/templates/Content';
import SidebarManager from 'views/components/organisms/common/SidebarManager';
import Sidebar from 'views/components/templates/Sidebar';


type ViewType = {

    sheetKey: string,
    companyId: string,
    year: string,
    reviewee: string,
    statusValue: number | null,
    revieweeName: {
        lastName: string,
        firstName: string
    }
    groupName: string
    groupId: string
    categorys: {
        name: string | undefined
        avg: number | null,
        no: number | null | undefined,
        id: string | undefined,
        sectionId: string | null
    }[] | undefined,
    avg: number | null
} | null

const listGroups = /* GraphQL */ `
  query ListGroups(
    $companyID: ID
    $localID: ModelIDKeyConditionInput
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listGroups(
      companyID: $companyID
      localID: $localID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        localID
        name
      }
      nextToken
    }
  }
`;

const listSheetYear = /* GraphQL */ `
  query ListSheetYear(
    $companyID: ID
    $year: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSheetYear(
      companyID: $companyID
      year: $year
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        companyID
        year
        sheetGroupLocalId
        statusValue
        group {
          localID
          name
        }
        section {
          items {
            sheetKeys
            sectionCategoryLocalId
            companyID
            objective {
              items {
                progress
              }
            }
            category {
              localID
              name
            }
          }
        }
        reviewee
        revieweeEmployee {
          localID
          firstName
          lastName
        }
      }
      nextToken
    }
  }
`;

function ProgressReferenceList() {
    // ログインユーザを取得する
    const currentUser = useContext(UserContext);
    const currentEmployee = useContext(EmployeeContext);

    //今日の日付を取得
    const today: Date = new Date();
    const thisYear: number = getThisYear(currentEmployee?.company?.startMonth);
    let yearList: Array<number> = [];
    for (let step = 0; step < 10; step++) {
        yearList.push((thisYear - step));
    }

    // const [sheets, setSheets] = useState<Sheet[] | null>(null)
    const [sheetsView, setSheetsView] = useState<ViewType[]>();
    
    //選択する部署のデータを取得して昇順でソートして表示する機能
    const [groupList, setGroupList] = useState<Group[]>()

    //サイドバー
    const sidebarMock = [
        {
            label: "業績評価一覧",
            dest: routeBuilder.revieweeListPath()
        }, {
            label: "進捗参照",
            dest: routeBuilder.reviewerListPath()
        }, {
            label: "総合評価参照",
            dest: routeBuilder.reviewerEvaluationListPath()
        }]


    
    useEffect(() => {
        ; (async () => {
            if(currentUser && currentEmployee){
                if (currentEmployee.manager === 'SUPER_MANAGER') {
                    const groupList: APIt.ListGroupsQueryVariables = {
                        companyID: currentUser.attributes["custom:companyId"]
                    }
                    console.log("groupList",groupList)
                    const response = await GroupDao.list(listGroups, groupList)
    
                    //昇順でソートしてgroupItemに保存
                    const groupItem = response?.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        } else {
                            return -1;
                        }
                    });
                    setGroupList(groupItem);
                } else if(currentEmployee.manager === 'MANAGER'){
                    const groupList: APIt.ListGroupsQueryVariables = {
                        companyID: currentUser.attributes["custom:companyId"],
                        localID: {
                            eq: currentEmployee?.employeeGroupLocalId
                        }
                    }
                    console.log("groupList",groupList)
                    const response = await GroupDao.list(listGroups, groupList)
    
                    //昇順でソートしてgroupItemに保存
                    const groupItem = response?.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        } else {
                            return -1;
                        }
                    });
                    setGroupList(groupItem);
                }else{
                    console.error("マネージャーではありません")
                }
            }


        })()
    }, [currentUser, currentEmployee]);

    useEffect(()=>{
        ; (async()=>{
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
                        // 部署コードの照準、社員番号の昇順にソート
                        if(a.revieweeEmployee?.group && b.revieweeEmployee?.group){
                            if(a.revieweeEmployee.group.localID > b.revieweeEmployee.group.localID) return 1
                            if(a.revieweeEmployee.group.localID < b.revieweeEmployee.group.localID) return -1
                            if(a.revieweeEmployee.localID > b.revieweeEmployee.localID) return 1
                            if(a.revieweeEmployee.localID < b.revieweeEmployee.localID) return -1
                        }
                        return 0
                    })
                    setView(listItems)
                }
            }
        })()
    }, [currentUser])

    const setView = (listItems: Sheet[])=>{
        // 画面表示に必要な情報を加工する処理
        let viewTemp: ViewType[] | null = listItems.map((sheet) => {
            if (sheet.revieweeEmployee && sheet.group && sheet.section) {
                return {

                    sheetKey: getSheetKeys(sheet).replace(/[.@]/g, '-'),
                    companyId: sheet.companyID,
                    year: String(sheet.year),
                    reviewee: sheet.reviewee,
                    statusValue: sheet.statusValue,
                    groupName: sheet.group?.name,
                    groupId: sheet.group.localID,
                    revieweeName: {
                        firstName: sheet.revieweeEmployee.firstName,
                        lastName: sheet.revieweeEmployee.lastName
                    },
                    categorys: sheet.section.items?.map((section) => {
                        return {
                            name: section?.category?.name,
                            avg: section && section.objective && section.objective.items ?
                                calcAvg(section.objective.items.map((obj) => {
                                    return obj && obj.progress ? obj.progress : 0
                                })) : null,
                            no: section?.category ? parseInt(section.category.localID) : null,
                            id: section?.category?.localID,
                            sectionId: section ? getSectionKeys(section).replace(/[.@]/g, '-') : null
                        }
                    }),
                    avg: -1
                }
            } else {
                console.error("シート情報に不備があります");
                return null
            }
        })
        if (viewTemp) {
            const view = viewTemp.map(item => {
                if (item) {
                    return {
                        ...item,
                        avg: item.categorys ?
                            calcAvg(item.categorys.map(cat => {
                                return cat.avg;
                            }))
                            : -1
                    }
                } else {
                    return null
                }
            })

            if (view) {
                setSheetsView(view);
            }
        }
    }

    return (
        <div>
            <div id="gage"></div>
            {/* ヘッダーの表示 */}
            <HeaderComponents />
            <LeftBox>
                <Sidebar>
                    <SidebarManager
                        links={sidebarMock}
                    />
                </Sidebar>
            </LeftBox>
            <RightBox>
                <Content>
                    <>
                        <h2>進捗参照</h2><br />
                        <Formik
                            initialValues={{
                                year: today.getFullYear(),
                                groupId: "all",
                            }}
                            onSubmit={async (values) => {
                                let filter: APIt.ListSheetYearQueryVariables = {
                                    companyID: currentUser?.attributes["custom:companyId"],
                                    year: {
                                        eq: values.year
                                    },
                                }
                                if (values.groupId !== "all") filter = {
                                    companyID: currentUser?.attributes["custom:companyId"],
                                    year: {
                                        eq: values.year
                                    },
                                    filter: {
                                        sheetGroupLocalId: { eq: values.groupId } //選択した部署情報
                                    }
                                }
                                const listItems = await SheetDao.listYear(listSheetYear, filter)
                                console.log(listItems)

                                if (listItems) {
                                    setView(listItems)
                                }
                            }}
                        >
                            {(formik) => (
                                <Form onSubmit={formik.handleSubmit}>
                                    <div className={style.groupMargin}>
                                        {/* 部門の選択肢を表示 */}
                                        <span className={`${style.selectionSize} ${style.selectionMargin}`}>
                                            <Field type="radio" name="groupId" value="all" handleChange={formik.handleChange} />
                                        全て
                                    </span>
                                        {groupList?.map((group: Group) => {
                                            return (
                                                <span className={`${style.selectionSize} ${style.selectionMargin}`}>
                                                    <Field type="radio" name="groupId" value={group.localID} handleChange={formik.handleChange} />
                                                    {group.name}
                                                </span>
                                            )
                                        })}
                                    </div>

                                    {/* 年度の選択肢を表示 */}
                                    <span>年度</span>
                                    <Field as="select" name="year" className={style.yearMargin}>
                                        {yearList.map((year: number) => {
                                            return (
                                                <option value={year}>{year}</option>
                                            )
                                        })}
                                    </Field>

                                    {/* 確認を表示 */}
                                    <Button type="submit">参照</Button>

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

                        {sheetsView ? sheetsView.map(view => {
                            if (view) {
                                view?.categorys?.sort(function (a, b) {
                                    if (a.no! > b.no!) {
                                        return 1;
                                    } else {
                                        return -1;
                                    }
                                });

                                return (
                                    <Card className={style.linkbox}>
                                        <Link to={routeBuilder.reviewerDetailPath(view.companyId, view.reviewee, view.year)} />
                                        {/* 社員の姓名と部門名を表示 */}
                                        <Card.Header>
                                            {view.revieweeName.lastName}
                                            {view.revieweeName.firstName}
                                &nbsp;
                                {view.groupName}
                                &nbsp;
                                {view.avg ? `${round(view.avg, 2).toFixed(1)}%` : null}

                                            {view.avg ?
                                                <GaugeChart id={`chart-${view.groupId}-${view.sheetKey}`}
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
                                            {view.statusValue ?
                                                <ApprovalStatusBox statusValue={view.statusValue}
                                                /> : null}
                                        </Card.Header>
                                        <Card.Body>
                                            {view.categorys?.map(category => {
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
                            } else {
                                return null
                            }
                        }) : null}
                    </>
                </Content>
            </RightBox>
        </div>
    );
}

export default ProgressReferenceList;
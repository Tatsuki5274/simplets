import React, { useContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Category, Objective, Section, Sheet, UserContext } from 'App';
import { ApprovalStatus, getStatusValue } from 'lib/getStatusValue'
import { getEmployee, listCategorys, listSheets } from 'graphql/queries'
import * as APIt from 'API';
import { createSection, createSheet } from 'graphql/mutations';
import SidebarComponents from 'common/Sidebar';
import HeaderComponents from 'common/header';
import { SheetDao } from 'lib/dao/sheetDao';
import { EmployeeDao } from 'lib/dao/employeeDao';
import { CategoryDao } from 'lib/dao/categoryDao';
import { SectionDao } from 'lib/dao/sectionDao';

const sortSheet = (a: Sheet, b: Sheet) => {
    if (a.year < b.year) {
        return 1;
    } else {
        return -1;
    }
}

//今日の日付を取得
const today: Date = new Date();

function ListPerformanceEvalution() {
    const [sheets, setSheets] = useState<Sheet[] | null>(null);

    // ログインユーザを取得する
    const currentUser = useContext(UserContext);
    
    useEffect(() => {
        ; (async () => {
            if(currentUser){
                const listQV: APIt.ListSheetsQueryVariables = {
                    filter: {
                        reviewee: {
                            eq: currentUser.username
                        }
                    }
                };
                const items = await SheetDao.list(listSheets, listQV)

                //降順でソートしてlistItemsに保存
                items?.sort(sortSheet);
                setSheets(items);

                // 今年に作成されたシートを確認
                // let result = false;
                // if(items){
                //     const currentYear:number = new Date().getFullYear();
                //     let filteredSheet = items.filter((item)=>{
                //         return item.year === currentYear ? true : false;
                //     })
                //     if(filteredSheet.length === 0) {
                //         result = true;
                //     }
                // }
            }
        })()
    }, [currentUser]);

    async function handleClickCreate() {

        // 社員情報取得
        const currentUser = await Auth.currentAuthenticatedUser();
        const revieweeEmployeeID: string = currentUser.username;
        const revieweeEmployee = await EmployeeDao.get(getEmployee, {id: revieweeEmployeeID})
        if(revieweeEmployee){
            let revieweeEmployeeSuperior: Array<string> | null = null

            //上司情報取得
            if(revieweeEmployee.superior){
                revieweeEmployeeSuperior = []
                revieweeEmployeeSuperior.push(revieweeEmployee.superior.id)
                if(revieweeEmployee.superior.superior){
                    revieweeEmployeeSuperior.push(revieweeEmployee.superior.superior.id)
                }
            }
            
                    // 権限グループ名の取得
            // const companyGroup = revieweeEmployee.company?.companyGroupName || "";
            const companyManagerGroup = revieweeEmployee.company?.companyManagerGroupName || null;
            const companyAdminGroup = revieweeEmployee.company?.companyAdminGroupName || null;

            if(companyManagerGroup && companyAdminGroup){
                //カテゴリを取得する
                const categorys = await CategoryDao.list(listCategorys, {});
                if (categorys) {
                    console.log("categorys", categorys)

                    //シートを作成
                    const createdSheet = await SheetDao.create(createSheet, {
                        grade: 0,
                        year: today.getFullYear(),
                        statusValue: 1,
                        sheetSecondEmployeeId: revieweeEmployee.superior?.id,
                        sheetGroupId: revieweeEmployee.group?.id || "",
                        sheetRevieweeEmployeeId: revieweeEmployeeID,
                        reviewers: revieweeEmployeeSuperior,
                        readGroups: [companyManagerGroup],
                        updateGroups: [companyAdminGroup]
                    })
                    if (createdSheet) {
                        //取得したカテゴリを元にsectionを作成する
                        let isSuccess = true
                        categorys.forEach(async (category: Category) => {
                            const createdSection = await SectionDao.create(createSection, {
                                sectionSheetId: createdSheet.id,
                                sectionCategoryId: category.id,
                                reviewers: revieweeEmployeeSuperior,
                                readGroups: [companyManagerGroup]
                            })
                            if(!createdSection){
                                isSuccess = false
                                console.log("カテゴリセクションの登録に失敗しました")
                            }
                        })
                        //レンダリング要素の追加
                        addSheets(createdSheet);
                        if(isSuccess){
                            console.log("シートの作成に成功しました", sheets);
                        }
                    } else {
                        console.error("シートの作成に失敗しました");
                    }
                }
            }else{
                console.error("権限の取得に失敗しました")
            }

        }

        function addSheets(newSheet: Sheet) {
            //現在のステートへ適用
            if(sheets){
                const newSheetState = sheets.concat();
                newSheetState.push(newSheet)
                newSheetState.sort(sortSheet);
                setSheets(newSheetState);
            }
        }
    }

    if (sheets === undefined) return <div>Loading</div>
    return (
        <div>
            {/* ヘッダーの表示 */}
            <HeaderComponents />
            <Row>
                <Col
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={3}
                >
                    <SidebarComponents />
                </Col>
                <Col
                    xs={9}
                    sm={9}
                    md={9}
                    lg={9}
                    xl={9}
                >
                   <h2>業績評価一覧</h2>
                    {(sheets && sheets.find(sheet=>{
                        return sheet.year === today.getFullYear()
                    }))
                    ? null : 
                        <Button
                            variant="primary"
                            onClick={handleClickCreate}
                        >
                            新規作成
                        </Button>
                    }
                    <Table bordered>
                        <thead>
                            <tr>
                                <td></td>
                                <td>年度</td>
                                <td>所属長</td>
                                <td>平均達成率</td>
                                <td>ステータス</td>
                                <td>総合評価</td>
                                <td></td>
                            </tr>
                        </thead>

                        <tbody>
                            {sheets?.map((sheet: Sheet) => {
                                let editName = "編集";
                                if (sheet.statusValue === ApprovalStatus.DONE) {
                                    editName = "確認";
                                }
                                const progressList: number[] | undefined = sheet.section?.items?.map((arg: any)=>{
                                    const section: Section = arg;
                                    let sum = 0;
                                    let cnt = 0;
                                    section.objective?.items?.forEach((arg: any) => {
                                        const objective: Objective = arg;
                                        if(objective && objective.progress){
                                            sum += objective.progress || 0;
                                            cnt++;
                                        }
                                    });
                                    if(section && section.objective && section.objective.items){
                                        return sum / cnt;
                                    }else{
                                        return -1;
                                    }
                                })
                                let sum: number = 0;
                                let cnt: number = 0;
                                progressList?.forEach((progress: number)=>{
                                    if(progress !== -1){
                                        sum += progress;
                                        cnt ++;
                                    }
                                })
                                const avg: number = cnt !== 0 ? sum / cnt : -1;
                                return (
                                    <tr key={sheet.id}>
                                        <td><Link to={`/reviewee/sheet/${sheet.id}`}>{editName}</Link></td>
                                        <td>{sheet.year}</td>
                                        <td>{sheet.secondEmployee ? sheet.secondEmployee.lastName : ""}{sheet.secondEmployee ? sheet.secondEmployee.firstName : ""}</td>
                                        <td>{avg || "-"}%</td>
                                        <td>{getStatusValue(sheet.statusValue || -1)}</td>
                                        <td>{sheet.overAllEvaluation}</td>
                                        <td><a href="/#">プレビュー</a></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            {/* サイドバーコンポーネント 表示 */}

            <div>
                <Container>
 
                </Container>
            </div>
        </div>
    );
}

export default ListPerformanceEvalution;
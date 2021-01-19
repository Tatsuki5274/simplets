import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Category, Sheet, UserContext } from 'App';
import { ApprovalStatus, getStatusValue } from 'lib/getStatusValue'
import * as APIt from 'API';
import SidebarComponents, { performanceSidebarBackgroundColor } from 'common/Sidebar';
import HeaderComponents from 'common/header';
import { SheetDao } from 'lib/dao/sheetDao';
import { EmployeeDao } from 'lib/dao/employeeDao';
import { CategoryDao } from 'lib/dao/categoryDao';
import { SectionDao } from 'lib/dao/sectionDao';
import { DisplaySheetAverage } from './components/average';
import { tableHeaderStyle } from 'common/globalStyle.module.scss';
import { getSheetKeys } from 'lib/util';
import { BooleanType, EmployeeType } from 'API';

const sortSheet = (a: Sheet, b: Sheet) => {
  if (a.year < b.year) {
    return 1;
  } else {
    return -1;
  }
}

//今日の日付を取得
const today: Date = new Date();
// const targetYear = today.getMonth() >= 0 && today.getMonth() <= 2 ? today.getFullYear() - 1 : today.getFullYear()


const getEmployee = /* GraphQL */ `
  query GetEmployee($companyID: ID!, $username: ID!) {
    getEmployee(companyID: $companyID, username: $username) {
      username
      grade
      employeeGroupLocalId
      superior {
        username
        superior {
          username
        }
      }
      company {
        id
        name
        startMonth
      }
    }
  }
`;
const listSheetReviewee = /* GraphQL */ `
  query ListSheetReviewee(
    $companyID: ID
    $reviewee: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSheetReviewee(
      companyID: $companyID
      reviewee: $reviewee
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        companyID
        year
        grade
        overAllEvaluation
        statusValue
        sheetGroupLocalId
        reviewee
        section {
          items {
            objective {
              items {
                progress
              }
            }
          }
        }
        secondEmployee {
          firstName
          lastName
        }
      }
    }
  }
`;

const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $companyID: ID
    $localID: ModelIDKeyConditionInput
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCategorys(
      companyID: $companyID
      localID: $localID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        localID
      }
    }
  }
`;

const listEmployeesManager = /* GraphQL */ `
  query ListEmployeesManager(
    $companyID: ID
    $managerIsDeleted: ModelEmployeeEmployee_managerCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployeesManager(
      companyID: $companyID
      managerIsDeleted: $managerIsDeleted
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        username
      }
    }
  }
`;
const createSheet = /* GraphQL */ `
  mutation CreateSheet(
    $input: CreateSheetInput!
    $condition: ModelSheetConditionInput
  ) {
    createSheet(input: $input, condition: $condition) {
      companyID
      year
      grade
      statusValue
      revieweeUsername
      secondUsername
      sheetGroupLocalId
      referencer
      reviewee
      topReviewers
      secondReviewers
    }
  }
`;

const createSection = /* GraphQL */ `
  mutation CreateSection(
    $input: CreateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    createSection(input: $input, condition: $condition) {
      sheetKeys
      sectionCategoryLocalId
      companyID
      reviewee
      topReviewers
      secondReviewers
      referencer
    }
  }
`;

function ListPerformanceEvalution() {
  const [sheets, setSheets] = useState<Sheet[] | null>(null);
  const [targetYear, setTargetYear] = useState<number | null>(null)

  // ログインユーザを取得する
  const currentUser = useContext(UserContext);

  useEffect(() => {
    ; (async () => {
      if (currentUser) {
        const listQV: APIt.ListSheetRevieweeQueryVariables = {
          companyID: currentUser.attributes["custom:companyId"],
          reviewee: {
            eq: currentUser.username
          },
        };

        const items = await SheetDao.listReviewee(listSheetReviewee, listQV)

        //降順でソートしてlistItemsに保存
        items?.sort(sortSheet);
        setSheets(items);

      }
    })()
  }, [currentUser]);

  useEffect(()=>{
    (async ()=>{
      if(currentUser){
        const emp = await EmployeeDao.get(getEmployee, { companyID: currentUser.attributes["custom:companyId"], username: currentUser.username })
        const startMonth = emp?.company?.startMonth
        if(startMonth){
          const dateMonth = startMonth - 1 //1月が0のため
          const targetYear = today.getMonth() < dateMonth ? today.getFullYear() - 1 : today.getFullYear()
          setTargetYear(targetYear)
        }else{
          console.error("会社の年度開始月を取得できませんでした")
        }
      }
    })()
  }, [currentUser])

  async function handleClickCreate() {

    if (currentUser) {
      const revieweeEmployee = await EmployeeDao.get(getEmployee, { companyID: currentUser.attributes["custom:companyId"], username: currentUser.username })


      if (revieweeEmployee) {
        let revieweeEmployeeSuperior: Array<string> | null = null

        //上司情報取得
        if (revieweeEmployee.superior) {
          revieweeEmployeeSuperior = []
          revieweeEmployeeSuperior.push(revieweeEmployee.superior.username)
          if (revieweeEmployee.superior.superior) {
            revieweeEmployeeSuperior.push(revieweeEmployee.superior.superior.username)
          }
        }


        //カテゴリを取得する
        const categorys = await CategoryDao.list(listCategorys, { companyID: currentUser.attributes['custom:companyId'] });
        if (categorys) {
          console.log("categorys", categorys)

          //全ての社内特権マネージャーの情報を取得
          const superManagers = await EmployeeDao.listManager(listEmployeesManager, {
            companyID: currentUser.attributes["custom:companyId"],
            managerIsDeleted: {
              eq: {
                manager: 'SUPER_MANAGER' as EmployeeType,
                isDeleted: 'FALSE' as BooleanType
              }
            }
          })
          const groupManagers = await EmployeeDao.listManager(listEmployeesManager, {
            companyID: currentUser.attributes["custom:companyId"],
            managerIsDeleted: {
              eq: {
                manager: 'MANAGER' as EmployeeType,
                isDeleted: 'FALSE' as BooleanType
              }
            }, filter: {
              employeeGroupLocalId: {
                eq: revieweeEmployee?.employeeGroupLocalId
              }
            }
          })
          console.log("superManagers", superManagers)
          console.log("groupManagers", groupManagers)
          let listSuperManagers: Array<string> = [];
          let listGroupManagers: Array<string> = [];
          superManagers?.forEach(element => listSuperManagers.push(element.username));
          groupManagers?.forEach(element => listGroupManagers.push(element.username));
          console.log("listSuperManagers", listSuperManagers)
          console.log("listGroupManagers", listGroupManagers)
          const managers = listSuperManagers.concat(listGroupManagers)

          if (targetYear) {
            //シートを作成
            const createdSheet = await SheetDao.create(createSheet, {
              grade: revieweeEmployee.grade,
              year: targetYear,
              statusValue: 1,
              revieweeUsername: revieweeEmployee.username,
              secondUsername: revieweeEmployee.superior?.username || "",
              sheetGroupLocalId: revieweeEmployee.employeeGroupLocalId || "empty",
              companyID: currentUser.attributes['custom:companyId'],
              reviewee: currentUser.username,
              secondReviewers: revieweeEmployee.superior ? [revieweeEmployee.superior.username] : null,
              topReviewers: revieweeEmployee.superior?.superior ? [revieweeEmployee.superior.superior.username] : null,
              referencer: managers

            })
            if (createdSheet) {
              //取得したカテゴリを元にsectionを作成する
              let isSuccess = true
              categorys.forEach(async (category: Category) => {
                const createdSection = await SectionDao.create(createSection, {
                  sheetKeys: getSheetKeys(createdSheet),
                  sectionCategoryLocalId: category.localID,
                  secondReviewers: createdSheet.secondReviewers,
                  topReviewers: createdSheet.topReviewers,
                  companyID: createdSheet.companyID,
                  referencer: managers
                })
                if (!createdSection) {
                  isSuccess = false
                  console.log("カテゴリセクションの登録に失敗しました")
                }
              })
              const addSheets = (newSheet: Sheet) => {
                //現在のステートへ適用
                if (sheets) {
                  const newSheetState = sheets.concat();
                  newSheetState.push(newSheet)
                  newSheetState.sort(sortSheet);
                  setSheets(newSheetState);
                }
              }
              //レンダリング要素の追加
              addSheets(createdSheet);
              if (isSuccess) {
                console.log("シートの作成に成功しました", sheets);
              }
            } else {
              console.error("シートの作成に失敗しました");
            }
          }else{
            console.error("年度情報の取得に失敗しました")
          }

        }


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
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          style={performanceSidebarBackgroundColor}
        >
          <SidebarComponents />
        </Col>
        <Col
          xs={10}
          sm={10}
          md={10}
          lg={10}
          xl={10}
        >
          <h2>業績評価一覧</h2>
          {(sheets && sheets.find(sheet => {
            return sheet.year === targetYear
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
            <thead className={tableHeaderStyle}>
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

                return (
                  <tr key={sheet.sheetGroupLocalId}>
                    <td><Link to={`/reviewee/company/${sheet.companyID}/reviewee/${sheet.reviewee}/year/${sheet.year}`}>{editName}</Link></td>
                    <td>{sheet.year}</td>
                    <td>{sheet.secondEmployee ? sheet.secondEmployee.lastName : ""}{sheet.secondEmployee ? sheet.secondEmployee.firstName : ""}</td>
                    <td><DisplaySheetAverage sheet={sheet} /></td>
                    <td>{getStatusValue(sheet.statusValue || -1)}</td>
                    {sheet.statusValue === 10 ?
                      <td></td> :
                      <td>{sheet.overAllEvaluation}</td>}
                    <td><a href={`/preview/company/${sheet.companyID}/reviewee/${sheet.reviewee}/year/${sheet.year}`}>プレビュー</a></td>
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
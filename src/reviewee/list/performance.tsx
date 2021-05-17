import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { ErrorContext, HeaderContext, SidebarContext, UserContext } from "App";
import { ApprovalStatus, getStatusValue } from "lib/getStatusValue";
import * as APIt from "API";
import { SheetDao } from "lib/dao/sheetDao";
import { EmployeeDao } from "lib/dao/employeeDao";
import { CategoryDao } from "lib/dao/categoryDao";
import { SectionDao } from "lib/dao/sectionDao";
import { DisplaySheetAverage } from "./components/average";
import { tableHeaderStyle } from "common/globalStyle.module.scss";
import { getReviewers } from "lib/util";
import {
  Category,
  CreateSectionInput,
  ListCategorysCompanyQueryVariables,
  Sheet,
} from "API";
import LeftBox from "views/components/templates/LeftBox";
import RightBox from "views/components/templates/RightBox";
import Sidebar from "views/components/templates/Sidebar";
import Content from "views/components/templates/Content";
import Container from "views/components/templates/Container";
import Title from "views/components/molecules/Title";
import Header from "views/components/organisms/common/Header";
import { routeBuilder } from "router";
import {
  getEmployee,
  listCategorysCompany,
  listSheetsReviewee,
} from "graphql/queries";
import { createSection, createSheet } from "graphql/mutations";

const sortSheet = (a: Sheet, b: Sheet) => {
  if (a.year && b.year && a.year < b.year) {
    return 1;
  } else {
    return -1;
  }
};

//今日の日付を取得
const today: Date = new Date();
// const targetYear = today.getMonth() >= 0 && today.getMonth() <= 2 ? today.getFullYear() - 1 : today.getFullYear()

// const getEmployee = /* GraphQL */ `
//   query GetEmployee($companyID: ID!, $username: ID!) {
//     getEmployee(companyID: $companyID, username: $username) {
//       username
//       grade
//       employeeGroupLocalId
//       superior {
//         username
//         superior {
//           username
//         }
//       }
//       company {
//         id
//         name
//         startMonth
//       }
//       group {
//         name
//       }
//     }
//   }
// `;
// const listSheetReviewee = /* GraphQL */ `
//   query ListSheetReviewee(
//     $companyID: ID
//     $reviewee: ModelStringKeyConditionInput
//     $sortDirection: ModelSortDirection
//     $filter: ModelSheetFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listSheetReviewee(
//       companyID: $companyID
//       reviewee: $reviewee
//       sortDirection: $sortDirection
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         sub
//         companyID
//         year
//         grade
//         overAllEvaluation
//         statusValue
//         sheetGroupLocalId
//         reviewee
//         section {
//           items {
//             objective {
//               items {
//                 progress
//               }
//             }
//           }
//         }
//         secondEmployee {
//           firstName
//           lastName
//         }
//       }
//     }
//   }
// `;

// const listCategorys = /* GraphQL */ `
//   query ListCategorys(
//     $companyID: ID
//     $localID: ModelIDKeyConditionInput
//     $filter: ModelCategoryFilterInput
//     $limit: Int
//     $nextToken: String
//     $sortDirection: ModelSortDirection
//   ) {
//     listCategorys(
//       companyID: $companyID
//       localID: $localID
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//       sortDirection: $sortDirection
//     ) {
//       items {
//         localID
//         name
//       }
//     }
//   }
// `;

// const listEmployeesManager = /* GraphQL */ `
//   query ListEmployeesManager(
//     $companyID: ID
//     $managerIsDeleted: ModelEmployeeEmployee_managerCompositeKeyConditionInput
//     $sortDirection: ModelSortDirection
//     $filter: ModelEmployeeFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listEmployeesManager(
//       companyID: $companyID
//       managerIsDeleted: $managerIsDeleted
//       sortDirection: $sortDirection
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         username
//       }
//     }
//   }
// `;
// const createSheet = /* GraphQL */ `
//   mutation CreateSheet(
//     $input: CreateSheetInput!
//     $condition: ModelSheetConditionInput
//   ) {
//     createSheet(input: $input, condition: $condition) {
//       sub
//       companyID
//       year
//       grade
//       statusValue
//       revieweeUsername
//       secondUsername
//       sheetGroupLocalId
//       referencer
//       reviewee
//       topReviewers
//       secondReviewers
//     }
//   }
// `;

// const createSection = /* GraphQL */ `
//   mutation CreateSection(
//     $input: CreateSectionInput!
//     $condition: ModelSectionConditionInput
//   ) {
//     createSection(input: $input, condition: $condition) {
//       sheetKeys
//       sectionCategoryLocalId
//       sectionCategoryName
//       companyID
//       reviewee
//       topReviewers
//       secondReviewers
//       referencer
//     }
//   }
// `;

function ListPerformanceEvalution() {
  const [sheets, setSheets] = useState<Sheet[] | null>(null);
  const [targetYear, setTargetYear] = useState<number | null>(null);

  // ログインユーザを取得する
  const currentUser = useContext(UserContext);

  const setError = useContext(ErrorContext);

  const header = useContext(HeaderContext);
  const sidebar = useContext(SidebarContext);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const listQV: APIt.ListSheetsRevieweeQueryVariables = {
          sub: currentUser.attributes["sub"],
        };

        const items = await SheetDao.listReviewee(listSheetsReviewee, listQV);

        //降順でソートしてlistItemsに保存
        items?.sort(sortSheet);
        setSheets(items);
      }
    })();
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const emp = await EmployeeDao.get(getEmployee, {
          username: currentUser.username,
        });
        const startMonth = emp?.company?.startMonth;
        if (startMonth) {
          const dateMonth = startMonth - 1; //1月が0のため
          const targetYear =
            today.getMonth() < dateMonth
              ? today.getFullYear() - 1
              : today.getFullYear();
          setTargetYear(targetYear);
        } else {
          setError("会社の年度開始月を取得できませんでした");
        }
      }
    })();
  }, [currentUser, setError]);

  async function handleClickCreate() {
    if (currentUser) {
      const revieweeEmployee = await EmployeeDao.get(getEmployee, {
        username: currentUser.username,
      });
      if (!revieweeEmployee?.groupID) {
        throw new Error("GroupID is maybe undefined.");
      }

      if (revieweeEmployee) {
        //カテゴリを取得する
        const listI: ListCategorysCompanyQueryVariables = {
          companyID: revieweeEmployee.companyID,
        };
        const categorys = await CategoryDao.listCompany(
          listCategorysCompany,
          listI
        );
        if (categorys) {
          const reviewers = await getReviewers(
            currentUser.username,
            currentUser.attributes["custom:companyId"]
          );
          const managers = reviewers.referencer;
          const topReviewers = reviewers.topReviewers;
          const secondReviewers = reviewers.secondReviewers;

          const secondUsername = revieweeEmployee.superior?.username;
          const topUsername =
            revieweeEmployee.superior?.superior?.username || null;
          const companyId: string | null =
            currentUser.attributes["custom:companyId"] || null;

          if (!secondUsername) {
            throw new Error("所属長が見つかりませんでした");
          } else if (!companyId) {
            throw new Error("会社情報が登録されていません");
          }

          if (
            targetYear &&
            revieweeEmployee.username &&
            revieweeEmployee.superior?.username
          ) {
            //シートを作成
            const createdSheet = await SheetDao.create(createSheet, {
              sub: currentUser.attributes.sub,
              groupID: revieweeEmployee.groupID,
              grade: revieweeEmployee.grade || "",
              year: targetYear,
              statusValue: 1,
              revieweeUsername: revieweeEmployee.username,
              secondUsername: secondUsername,
              topUsername: topUsername,
              sheetGroupName: revieweeEmployee.group?.name || null,
              companyID: currentUser.attributes["custom:companyId"],
              reviewee: currentUser.username,
              secondReviewers: secondReviewers,
              topReviewers: topReviewers,
              referencer: managers,
            });
            if (createdSheet) {
              //取得したカテゴリを元にsectionを作成する
              let isSuccess = true;
              categorys.forEach(async (category: Category) => {
                const createI: CreateSectionInput = {
                  sheetID: createdSheet.id || "", // unsafe
                  no: category.no || "", // unsafe
                  referencer: managers,
                  reviewee: createdSheet.reviewee,
                  secondReviewers: createdSheet.secondReviewers,
                  sectionCategoryName: category.name,
                  topReviewers: createdSheet.topReviewers,
                };
                const createdSection = await SectionDao.create(
                  createSection,
                  createI
                );
                if (!createdSection) {
                  isSuccess = false;
                }
              });
              const addSheets = (newSheet: Sheet) => {
                //現在のステートへ適用
                if (sheets) {
                  const newSheetState = sheets.concat();
                  newSheetState.push(newSheet);
                  newSheetState.sort(sortSheet);
                  setSheets(newSheetState);
                }
              };
              //レンダリング要素の追加
              addSheets(createdSheet);
              if (isSuccess) {
                // console.log("シートの作成に成功しました", sheets);
              }
            } else {
              setError("シートの作成に失敗しました");
            }
          } else {
            if (!targetYear) {
              setError("年度情報の取得に失敗しました");
            } else if (!revieweeEmployee.username) {
              setError("ユーザー名が取得できませんでした");
            } else if (!revieweeEmployee.superior?.username) {
              setError(
                "所属長が設定されていないため目標シートを作成することができません"
              );
            }
          }
        }
      }
    }
  }

  if (sheets === undefined) return <div>Loading</div>;
  return (
    <>
      {/* ヘッダーの表示 */}
      <Header {...header} />
      <Container>
        <LeftBox>
          <Sidebar data={sidebar} />
        </LeftBox>
        <RightBox>
          <Content>
            <>
              <Title>業績評価一覧</Title>
              {sheets &&
              sheets.find((sheet) => {
                return sheet.year === targetYear;
              }) ? null : (
                <Button variant="primary" onClick={handleClickCreate}>
                  新規作成
                </Button>
              )}
              <Table bordered>
                <thead className={tableHeaderStyle}>
                  <tr>
                    <td></td>
                    <td>年度</td>
                    <td>所属長</td>
                    <td>平均達成率</td>
                    <td>ステータス</td>
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
                      <tr key={sheet.revieweeEmployee?.group?.no}>
                        <td>
                          <Link
                            to={routeBuilder.revieweeDetailPath(sheet.id || "")}
                          >
                            {editName}
                          </Link>
                        </td>
                        <td>{sheet.year}</td>
                        <td>
                          {sheet.secondEmployee
                            ? sheet.secondEmployee.lastName
                            : ""}
                          {sheet.secondEmployee
                            ? sheet.secondEmployee.firstName
                            : ""}
                        </td>
                        <td>
                          <DisplaySheetAverage sheet={sheet} />
                        </td>
                        <td>{getStatusValue(sheet.statusValue || -1)}</td>
                        <td>
                          <a
                            href={routeBuilder.previewPath(sheet.id || "")}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            プレビュー
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          </Content>
        </RightBox>
        {/* サイドバーコンポーネント 表示 */}
      </Container>
    </>
  );
}

export default ListPerformanceEvalution;

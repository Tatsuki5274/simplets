import { SheetDao } from "lib/dao/sheetDao";
import React, { useContext, useEffect, useState } from "react";
import { TableEvaluationListType } from "views/components/organisms/evaluation/reviewerList/TableEvaluationList"
import ReviewerEvaluationList from "views/components/templates/evaluation/reviewer/ReviewerEvaluationList";
import * as APIt from 'API';
import { EmployeeContext, HeaderContext, UserContext, SidebarContext } from "App";
import { getStatusValue } from "lib/getStatusValue";
import { routeBuilder } from "router";
import { getThisYear } from "lib/util";
import { GroupDao } from "lib/dao/groupDao";
import { listGroupsCompany, listSheetsCompany } from "graphql/queries";
import { SelectLabel } from "views/components/atoms/Types";
import { ListGroupsCompanyQueryVariables } from "API";

// const listSheets = /* GraphQL */ `
//   query listSheets(
//     $companyID: ID
//     $revieweeYear: ModelSheetPrimaryCompositeKeyConditionInput
//     $filter: ModelSheetFilterInput
//     $limit: Int
//     $nextToken: String
//     $sortDirection: ModelSortDirection
//   ) {
//     listSheets(
//       companyID: $companyID
//       revieweeYear: $revieweeYear
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//       sortDirection: $sortDirection
//     ) {
//       items {
//         companyID
//         year
//         grade
//         overAllEvaluation
//         revieweeUsername
//         secondUsername
//         statusValue
//         sheetGroupLocalId
//         sheetGroupName
//         referencer
//         reviewee
//         topReviewers
//         secondReviewers
//         revieweeEmployee {
//           companyID
//           username
//           localID
//           employeeGroupLocalId
//           superiorUsername
//           firstName
//           lastName
//           grade
//           email
//         }
//       }
//       nextToken
//     }
//   }
// `;

export default function () {
    const currentUser = useContext(UserContext);
    const [tableData, setTableData] = useState<(TableEvaluationListType | null)[] | null>(null);
    const [initTableData, setInitTableData] = useState<(TableEvaluationListType | null)[] | null>(null);

    // const [header, setHeader] = useState<HeaderProps | null>(null)
    const [years, setYears] = useState<number[] | null>(null)
    const [selectedYear, setSelectedYear] = useState<number | null>(null)
    const [groups, setGroups] = useState<SelectLabel[] | null>(null)
    const currentEmployee = useContext(EmployeeContext);
    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext)


    useEffect(()=>{
        if(currentUser && currentEmployee){
            (async ()=>{
                const listQV: APIt.ListSheetsCompanyQueryVariables = {
                  companyID: currentUser.attributes["custom:companyId"],
                };
                const sheets = await SheetDao.listCompany(listSheetsCompany, listQV)
                // console.log("sheets", sheets)
                if(sheets){
                    const obj: (TableEvaluationListType | null)[] = sheets.map(sheet => {
                        let ret: (TableEvaluationListType | null) = null
                        let preview = {
                            label: "",
                            dest: "",
                        }
                      if (sheet.revieweeEmployee?.username && sheet.section && sheet.section.items && sheet.section.items.length > 0) {
                            preview = {
                                label: "プレビュー",
                                dest: routeBuilder.previewPath(sheet.id || "") // unsafe
                            }
                        }
                        const lastYearsAgoOverAllEvaluation = sheets.find(comSheet => {
                            // console.log(sheet.year, comSheet.year)
                            if (!sheet.year) return false
                            return sheet.year - 1 === comSheet.year && sheet.reviewee === comSheet.reviewee
                        })?.overAllEvaluation || null
                        const twoYearsAgoOverAllEvaluation = sheets.find(comSheet => {
                            if (!sheet.year) return false
                            return sheet.year - 2 === comSheet.year && sheet.reviewee === comSheet.reviewee
                        })?.overAllEvaluation || null
                        if(sheet.year && sheet.statusValue && sheet.revieweeEmployee){
                            ret = {
                                data: {
                                    groupId: sheet.groupID || "", // unsafe
                                    groupNo: sheet.group?.no || "", // unsafe 参照するべきではない 埋め込んだ場合のid変更時の挙動の仕様を決める必要がある
                                    year: sheet.year,
                                    statusValue: sheet.statusValue,
                                    empNo: sheet.revieweeEmployee.no || "" // unsafe
                                },
                                groupName: sheet.sheetGroupName || "",
                                name: `${sheet.revieweeEmployee?.lastName} ${sheet.revieweeEmployee?.firstName}`,
                                status: sheet.statusValue ? getStatusValue(sheet.statusValue) : "",
                                preview: preview,
                                overAllEvaluation: sheet.overAllEvaluation || null,
                                lastYearsAgoOverAllEvaluation: lastYearsAgoOverAllEvaluation,
                                twoYearsAgoOverAllEvaluation: twoYearsAgoOverAllEvaluation
                            }
                        }
                        return ret
                    })

                    //ソート
                    obj.sort(function (a, b) {
                      if (a && b && a.data && b.data) {
                          if (a.data.groupNo > b.data.groupNo) return 1
                          if (a.data.groupNo < b.data.groupNo) return -1
                          if (a.data.empNo > b.data.empNo) return 1
                          if (a.data.empNo < b.data.empNo) return -1
                      }
                      return 0
                    })

                    //初期表示データをフィルター
                    const startMonth = currentEmployee?.company?.startMonth
                    const currentYear = getThisYear(startMonth)
                    const filteredObj = obj.filter(sheet => {
                      if(sheet) return sheet.data.year === currentYear
                    })
                    setSelectedYear(currentYear)

                    setInitTableData(obj)
                    setTableData(filteredObj)
                    // console.log("tableData", obj)
                }else{
                  // setError("シート情報の取得に失敗しました")
                  console.error("シート情報の取得に失敗しました")
                }
            })()
        }
    }, [currentUser, currentEmployee])


    useEffect(()=>{
      // ヘッダー用社員情報の取得
      if(currentEmployee){
        // const header: HeaderProps = {
        //   companyName: currentEmployee.company?.name,
        //   groupName: currentEmployee.group?.name,
        //   lastName: currentEmployee.lastName,
        //   firstName: currentEmployee.firstName
        // }
        // setHeader(header)

        const startMonth = currentEmployee.company?.startMonth
        if(startMonth){
          // const today: Date = new Date();
          // const dateMonth = startMonth - 1 //1月が0のため
          // const thisYear = today.getMonth() < dateMonth ? today.getFullYear() - 1 : today.getFullYear()
          const thisYear = getThisYear(startMonth)
          const yearList: number[] = []
          for(let i=0; i<5; i++){
            yearList.push(thisYear-i)
          }
          // console.log("years", yearList)
          setYears(yearList)
        }
      }
    }, [currentEmployee])

    useEffect(()=> {
      // 部署情報の取得
      (async ()=>{
        if(currentUser){
          const listI: ListGroupsCompanyQueryVariables = {
            companyID: currentUser.attributes["custom:companyId"],
          }
          const groups = await GroupDao.listCompany(listGroupsCompany, listI)
          if(groups){
            const groupAll: SelectLabel[] = [
              {
                label: "全て",
                value: "all"
              }
            ]
            const groupsLabel: SelectLabel[] = groups.map(group => {
              return {
                label: group.name || "",
                value: group.id || ""
              }
            })
            setGroups(groupAll.concat(groupsLabel))
          }
        }
      })()
    }, [currentUser])

    return (
        <ReviewerEvaluationList
            tableData={tableData}
            setTableData={setTableData}
            initTableData={initTableData}
            data={{
              header: header,
              sidebar: sidebar,
              years: years,
              groups: groups
            }}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
        />
        // <EvaluationFilter
        //     radioButtons={radioButtonMock}
        //     years={yearMock}
        //     status={statusMock}
        //     tableData={tableData}
        //     initTableData={initTableData}
        //     setInitTableData={setInitTableData}
        // />
    )
}
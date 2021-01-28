import { SheetDao } from "lib/dao/sheetDao";
import React, { useContext, useEffect, useState } from "react";
import { TableEvaluationListType } from "views/components/organisms/evaluation/reviewerList/TableEvaluationList"
import ReviewerEvaluationList from "views/components/templates/evaluation/reviewer/ReviewerEvaluationList";
import * as APIt from 'API';
import { EmployeeContext, UserContext } from "App";
import { getStatusValue } from "lib/getStatusValue";
import { routeBuilder } from "router";
import { HeaderProps } from "views/components/organisms/common/Header";
import { getThisYear } from "lib/util";
import { GroupDao } from "lib/dao/groupDao";
import { listGroups } from "graphql/queries";
import { SelectLabel } from "views/components/atoms/Types";

const listSheetReviewee = /* GraphQL */ `
  query ListSheetReviewee(
    $companyID: ID
    $revieweeYear: ModelSheetPrimaryCompositeKeyConditionInput
    $filter: ModelSheetFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSheets(
      companyID: $companyID
      revieweeYear: $revieweeYear
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        companyID
        year
        grade
        overAllEvaluation
        revieweeUsername
        secondUsername
        statusValue
        group {
          name
          localID
        }
        referencer
        reviewee
        topReviewers
        secondReviewers
        revieweeEmployee {
          companyID
          username
          localID
          employeeGroupLocalId
          superiorUsername
          firstName
          lastName
          grade
          email
        }
      }
      nextToken
    }
  }
`;

export default function () {
    const currentUser = useContext(UserContext);
    const [tableData, setTableData] = useState<(TableEvaluationListType | null)[] | null>(null);
    const [initTableData, setInitTableData] = useState<(TableEvaluationListType | null)[] | null>(null);

    const [header, setHeader] = useState<HeaderProps | null>(null)
    const [years, setYears] = useState<number[] | null>(null)
    const [groups, setGroups] = useState<SelectLabel[] | null>(null)
    const currentEmployee = useContext(EmployeeContext);


    useEffect(()=>{
        if(currentUser){
            (async ()=>{
                const companyID = currentUser.attributes["custom:companyId"]
                const listQV: APIt.ListSheetsQueryVariables = {
                    companyID: companyID,
                    filter: {
                      revieweeUsername: {
                        ne: currentUser.username
                      }
                    }
                  };
                const sheets = await SheetDao.list(listSheetReviewee, listQV)
                console.log("sheets", sheets)
                if(sheets){
                    const obj: (TableEvaluationListType | null)[] = sheets.map(sheet => {
                        let ret: (TableEvaluationListType | null) = null
                        let preview = {
                            label: "",
                            dest: "",
                        }
                        if(sheet.revieweeEmployee?.username){
                            preview = {
                                label: "プレビュー",
                                dest: routeBuilder.previewPath(sheet.companyID, sheet.revieweeEmployee?.username, sheet.year.toString())
                            }
                        }
                        const lastYearsAgoOverAllEvaluation = sheets.find(comSheet => {
                            console.log(sheet.year, comSheet.year)
                            return sheet.year - 1 === comSheet.year
                        })?.overAllEvaluation || null
                        const twoYearsAgoOverAllEvaluation = sheets.find(comSheet => {
                            return sheet.year - 2 === comSheet.year
                        })?.overAllEvaluation || null
                        if(sheet.group?.localID && sheet.year && sheet.statusValue){
                            ret = {
                                data: {
                                    groupLocalId: sheet.group?.localID,
                                    year: sheet.year,
                                    statusValue: sheet.statusValue
                                },
                                groupName: sheet.group?.name || "",
                                name: `${sheet.revieweeEmployee?.lastName} ${sheet.revieweeEmployee?.firstName}`,
                                status: sheet.statusValue ? getStatusValue(sheet.statusValue) : "",
                                preview: preview,
                                overAllEvaluation: sheet.overAllEvaluation,
                                lastYearsAgoOverAllEvaluation: lastYearsAgoOverAllEvaluation,
                                twoYearsAgoOverAllEvaluation: twoYearsAgoOverAllEvaluation
                            }
                        }
                        return ret
                    })
                    setInitTableData(obj)
                    setTableData(obj)
                    console.log("tableData", obj)
                }else{
                    console.error("シート情報の取得に失敗しました")
                }
            })()
        }
    }, [currentUser])


    useEffect(()=>{
      // ヘッダー用社員情報の取得
      if(currentEmployee){
        const header: HeaderProps = {
          companyName: currentEmployee.company?.name,
          groupName: currentEmployee.group?.name,
          lastName: currentEmployee.lastName,
          firstName: currentEmployee.firstName
        }
        setHeader(header)

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
          console.log("years", yearList)
          setYears(yearList)
        }
      }
    }, [currentEmployee])

    useEffect(()=> {
      // 部署情報の取得
      (async ()=>{
        if(currentUser){
          const groups = await GroupDao.list(listGroups, {companyID: currentUser.attributes["custom:companyId"]})
          if(groups){
            const groupsLabel: SelectLabel[] = groups.map(group => {
              return {
                label: group.name,
                value: group.localID
              }
            })
            setGroups(groupsLabel)
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
              years: years,
              groups: groups
            }}
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
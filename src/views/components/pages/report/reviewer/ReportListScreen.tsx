import { HeaderContext, SidebarContext, UserContext } from "App";
import { listEmployees, listGroups } from "graphql/queries";
import { EmployeeDao } from "lib/dao/employeeDao";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext, useEffect, useState } from "react";
import { SelectLabel } from "views/components/atoms/Types";
import { ReviewerReportFilterEmployeeType } from "views/components/organisms/report/reviewer/ReportListFilter";
import { ReviewerReportListEmployeeType } from "views/components/organisms/report/reviewer/TableReportList";
import ReportList from "views/components/templates/report/reviewer/ReportList";

const mockData = {
    revieweeName: "テスト テスト",
}


export default function () {
    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext)

    const currentUser = useContext(UserContext);
    const [groups, setGroups] = useState<SelectLabel[] | null>(null)
    const [reviewee, setReviewee] = useState<ReviewerReportFilterEmployeeType[] | null>(null)

    const[table,setTable] = useState<ReviewerReportListEmployeeType[] | null>(null)

    useEffect(()=> {
        // 部署情報の取得
        (async ()=>{
          if(currentUser){
            const groups = await GroupDao.list(listGroups, {companyID: currentUser.attributes["custom:companyId"]})
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
                  value: group.localID || ""
                }
              })
              setGroups(groupAll.concat(groupsLabel))
            }
          }
        })()
      }, [currentUser])

      useEffect(()=> {
        // 社員情報の取得
        (async ()=>{
          if(currentUser){
            const reviewees = await EmployeeDao.list(listEmployees, {companyID: currentUser.attributes["custom:companyId"]})
            if(reviewees){
              const revieweesLabel: ReviewerReportFilterEmployeeType[] = reviewees.map(reviewee => {
                return {
                  username: reviewee.username || "",
                  firlstName: reviewee.firstName || "",
                  lastName: reviewee.lastName || "",
                  groupLocalId: reviewee.employeeGroupLocalId || "",
                  groupName: reviewee.group?.name || ""
                  // label: `${reviewee.group?.name} ${reviewee.lastName} ${reviewee.firstName}` ||  "",
                }
              })
              setReviewee(revieweesLabel)
            }
          }
        })()
      }, [currentUser])


    
    return (
        <ReportList
            revieweeName={mockData.revieweeName}
            data={table}
            setTable={setTable}
            filter={{
                groups: groups,
                reviewee: reviewee
            }}
            header={header}
            sidebar={sidebar}
        />
    )
}
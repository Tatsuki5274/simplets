import {
  ListEmployeesCompanyQueryVariables,
  ListGroupsCompanyQueryVariables,
} from "API";
import { HeaderContext, SidebarContext, UserContext } from "App";
import { listEmployeesCompany, listGroupsCompany } from "graphql/queries";
import { EmployeeDao } from "lib/dao/employeeDao";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext, useEffect, useState } from "react";
import { SelectLabel } from "views/components/atoms/Types";
import { ReviewerReportFilterEmployeeType } from "views/components/organisms/report/reviewer/ReportListFilter";
import { ReviewerReportListEmployeeType } from "views/components/organisms/report/reviewer/TableReportList";
import ReportList from "views/components/templates/report/reviewer/ReportList";

export default function () {
  const header = useContext(HeaderContext);
  const sidebar = useContext(SidebarContext);

  const currentUser = useContext(UserContext);
  const [groups, setGroups] = useState<SelectLabel[] | null>(null);
  const [reviewee, setReviewee] =
    useState<ReviewerReportFilterEmployeeType[] | null>(null);

  const [table, setTable] =
    useState<ReviewerReportListEmployeeType[] | null>(null);

  useEffect(() => {
    // 部署情報の取得
    (async () => {
      if (currentUser) {
        const listI: ListGroupsCompanyQueryVariables = {
          companyID: currentUser.attributes["custom:companyId"],
        };
        const groups = await GroupDao.listCompany(listGroupsCompany, listI);
        if (groups) {
          const groupAll: SelectLabel[] = [
            {
              label: "全て",
              value: "all",
            },
          ];
          const groupsLabel: SelectLabel[] = groups.map((group) => {
            return {
              label: group.name || "",
              value: group.id || "",
            };
          });
          setGroups(groupAll.concat(groupsLabel));
        }
      }
    })();
  }, [currentUser]);

  useEffect(() => {
    // 社員情報の取得
    (async () => {
      if (currentUser) {
        const listI: ListEmployeesCompanyQueryVariables = {
          companyID: currentUser.attributes["custom:companyId"],
        };
        const reviewees = await EmployeeDao.listCompany(
          listEmployeesCompany,
          listI
        );
        if (reviewees) {
          const revieweesLabel: ReviewerReportFilterEmployeeType[] =
            reviewees.map((reviewee) => {
              return {
                username: reviewee.username || "",
                firlstName: reviewee.firstName || "",
                lastName: reviewee.lastName || "",
                groupNo: reviewee.group?.no || "",
                groupName: reviewee.group?.name || "",
                groupId: reviewee.groupID || "", // unsafe
                sub: reviewee.sub || "",
                empNo: reviewee.no || "",
              };
            });
          revieweesLabel.sort((a, b) => {
            if (a && b) {
              if (a.groupNo > b.groupNo) return 1;
              if (a.groupNo < b.groupNo) return -1;
              if (a.empNo > b.empNo) return 1;
              if (a.empNo < b.empNo) return -1;
            }
            return 0;
          });
          setReviewee(revieweesLabel);
        }
      }
    })();
  }, [currentUser]);

  return (
    <ReportList
      data={table}
      setTable={setTable}
      filter={{
        groups: groups,
        reviewee: reviewee,
      }}
      header={header}
      sidebar={sidebar}
    />
  );
}

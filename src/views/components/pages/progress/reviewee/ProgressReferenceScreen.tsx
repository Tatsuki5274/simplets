import {
  ListGroupsCompanyQueryVariables,
  ListSheetsCompanyQueryVariables,
} from "API";
import {
  EmployeeContext,
  HeaderContext,
  SidebarContext,
  UserContext,
} from "App";
import { listGroupsCompany, listSheetsCompany } from "graphql/queries";
import { GroupDao } from "lib/dao/groupDao";
import { SheetDao } from "lib/dao/sheetDao";
import { calcAvg, createGaugeId, getThisYear } from "lib/util";
import React, { useContext, useEffect, useState } from "react";
import { routeBuilder } from "router";
import { SelectLabel } from "views/components/atoms/Types";
import { ProgressReferenceType } from "views/components/organisms/progress/ProgressCard";
import ProgressReference from "views/components/templates/progress/reviewee/ProgressReference";

export default function () {
  const [cardData, setCardData] =
    useState<(ProgressReferenceType | null)[] | null>(null);
  const [initCardData, setInitCardData] =
    useState<(ProgressReferenceType | null)[] | null>(null);

  const [years, setYears] = useState<number[] | null>(null);
  const [groups, setGroups] = useState<SelectLabel[] | null>(null);

  const currentUser = useContext(UserContext);
  const currentEmployee = useContext(EmployeeContext);
  const header = useContext(HeaderContext);
  const sidebar = useContext(SidebarContext);

  useEffect(() => {
    // ヘッダー用社員情報の取得
    if (currentEmployee) {
      const startMonth = currentEmployee.company?.startMonth;
      if (startMonth) {
        const thisYear = getThisYear(startMonth);
        const yearList: number[] = [];
        for (let i = 0; i < 5; i++) {
          yearList.push(thisYear - i);
        }
        setYears(yearList);
      }
    }
  }, [currentEmployee]);

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
              value: group.no || "",
            };
          });
          setGroups(groupAll.concat(groupsLabel));
        }
      }
    })();
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      if (currentUser && years) {
        const listI: ListSheetsCompanyQueryVariables = {
          companyID: currentUser.attributes["custom:companyId"],
        };
        const sheets = await SheetDao.listCompany(listSheetsCompany, listI);
        if (sheets) {
          const result = sheets.map((sheet) => {
            const data: ProgressReferenceType = {
              groupId: sheet.revieweeEmployee?.group?.no || "", // unsafe
              year: sheet.year || -1, // unsafe
              employeeId:
                sheet.revieweeEmployee && sheet.revieweeEmployee.no
                  ? sheet.revieweeEmployee.no
                  : "",
              employeeName: sheet.revieweeEmployee
                ? `${sheet.revieweeEmployee.lastName} ${sheet.revieweeEmployee.firstName}`
                : "",
              groupName: sheet.sheetGroupName || "",
              avg: 1,
              gaugeId: sheet.revieweeEmployee?.group?.no
                ? createGaugeId(
                    `chart-${sheet.revieweeEmployee.group.no}-${sheet.id}`
                  )
                : null,
              statusValue: sheet.statusValue || 0,
              dest: routeBuilder.reviewerDetailPath(sheet.id || ""), // unsafe
              objective:
                sheet.section?.items?.map((sec) => {
                  if (sec) {
                    const data = {
                      categoryId: sec.no || "", // unsafe
                      categoryName: sec.sectionCategoryName || "",
                      avg:
                        sec && sec.objective && sec.objective.items
                          ? calcAvg(
                              sec.objective.items.map((obj) => {
                                return obj && obj.progress
                                  ? obj.progress
                                  : obj && obj.progress === 0
                                  ? 0
                                  : null;
                              })
                            )
                          : null,
                      gaugeId: createGaugeId(`chart-${sec.id}`),
                    };
                    return data;
                  }
                  return null;
                }) || null,
            };
            data.avg = data.objective
              ? calcAvg(
                  data.objective.map((objective) => {
                    return (objective && objective.avg !== 0) || objective
                      ? objective.avg
                      : null;
                  })
                )
              : null;
            return data;
          });
          result.sort(function (a, b) {
            // 部署コードの照準、社員番号の昇順にソート
            if (a.groupId > b.groupId) return 1;
            if (a.groupId < b.groupId) return -1;
            if (a.employeeId > b.employeeId) return 1;
            if (a.employeeId < b.employeeId) return -1;
            return 0;
          });
          result.map((data) => {
            if (data && data.objective) {
              data.objective.sort(function (a, b) {
                if (a && b && a.categoryId > b.categoryId) return 1;
                if (a && b && a.categoryId < b.categoryId) return -1;
                return 0;
              });
            }
          });
          setInitCardData(result);
          const filteredResult = result.filter((record) => {
            return record.year === years[0];
          });
          setCardData(filteredResult);
        }
      }
    })();
  }, [currentUser, years]);
  return (
    <ProgressReference
      cardData={cardData}
      setCardData={setCardData}
      initCardData={initCardData}
      data={{
        header: header,
        sidebar: sidebar,
        years: years,
        groups: groups,
      }}
    />
  );
}

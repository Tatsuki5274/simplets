import { EventInput } from "@fullcalendar/react";
import {
  ListGroupsCompanyQueryVariables,
  ListReportsCompanyDateQueryVariables,
} from "API";
import {
  EmployeeContext,
  HeaderContext,
  SidebarContext,
  UserContext,
} from "App";
import { listGroupsCompany, listReportsCompanyDate } from "graphql/queries";
import { GroupDao } from "lib/dao/groupDao";
import { ReportDao } from "lib/dao/reportDao";
import React, { useContext, useEffect, useState } from "react";
import { SelectLabel } from "views/components/common/atoms/Types";
import CalendarView from "views/components/report/reviewer/templates/CalendarView";

type Props = {
  match: {
    params: {
      date: string;
    };
  };
};

export default function (props: Props) {
  const header = useContext(HeaderContext);
  const sidebar = useContext(SidebarContext);
  const currentUser = useContext(UserContext);
  const currentEmployee = useContext(EmployeeContext);

  const [events, setEvents] = useState<EventInput[]>([]);
  const [initEvents, setInitEvents] = useState<EventInput[]>([]);
  const [groups, setGroups] = useState<SelectLabel[]>([]);
  const date = new Date(props.match.params.date);
  const employeeGroupId = currentEmployee?.groupID || "all";

  useEffect(() => {
    // 報告書情報の取得
    (async () => {
      if (currentUser) {
        const listI: ListReportsCompanyDateQueryVariables = {
          companyID: currentUser.attributes["custom:companyId"],
          date: {
            beginsWith: props.match.params.date,
          },
          limit: 1000,
        };
        const reports = await ReportDao.listCompanyDate(
          listReportsCompanyDate,
          listI
        );

        let eventItems: EventInput[];
        if (reports) {
          eventItems = reports.map((report) => {
            return {
              title: `${report.revieweeEmployee?.lastName}${report.revieweeEmployee?.firstName} ${report.revieweeEmployee?.group?.name}`,
              date: report.date,
              sub: report.sub,
              workStatus: report.workStatus,
              id: report.id,
              groupNo: report.revieweeEmployee?.group?.no, // ソートで使用
              employeeNo: report.revieweeEmployee?.no, // ソートで使用
              groupId: report.groupID,
            };
          });
          setInitEvents(eventItems);
          const filterdEvents = eventItems.filter(
            (eventItem) => eventItem.groupId === employeeGroupId
          );
          setEvents(filterdEvents);
        }
      }
    })();
  }, [currentUser, props.match.params.date, currentEmployee]);

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

  return (
    <CalendarView
      events={events}
      setEvents={setEvents}
      initEvents={initEvents}
      groups={groups}
      employeeGroupId={employeeGroupId}
      data={{
        header: header,
        sidebar: sidebar,
        initialDate: date,
      }}
    />
  );
}

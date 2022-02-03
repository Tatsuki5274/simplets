import { EventInput } from "@fullcalendar/react";
import { ListReportsSubQueryVariables } from "API";
import { HeaderContext, SidebarContext, UserContext } from "App";
import { listReportsSub } from "graphql/queries";
import { ReportDao } from "lib/dao/reportDao";
import React, { useContext, useEffect, useState } from "react";
import CalendarView from "views/components/report/reviewee/templates/CalendarView";

type Props = {
  match: {
    params: {
      date: string;
    };
  };
};

export default function (props: Props): JSX.Element {
  const header = useContext(HeaderContext);
  const sidebar = useContext(SidebarContext);
  const currentUser = useContext(UserContext);

  const [events, setEvents] = useState<EventInput[]>([]);
  const date = new Date(props.match.params.date);

  useEffect(() => {
    // 報告書情報の取得
    (async () => {
      if (currentUser) {
        const listI: ListReportsSubQueryVariables = {
          sub: currentUser.attributes.sub,
          date: {
            beginsWith: props.match.params.date,
          },
        };
        const reports = await ReportDao.listSub(listReportsSub, listI);
        let eventItems: EventInput[];
        if (reports) {
          eventItems = reports.map((report) => {
            return {
              title: `${report?.revieweeComments?.work}`,
              date: report?.date,
              workStatus: report?.workStatus,
              id: report?.id,
            };
          });
          setEvents(eventItems);
        }
      }
    })();
  }, [currentUser, props.match.params.date]);

  return (
    <CalendarView
      events={events}
      setEvents={setEvents}
      data={{
        header: header,
        sidebar: sidebar,
        initialDate: date,
      }}
    />
  );
}

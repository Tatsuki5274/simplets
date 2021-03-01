import { EventInput } from "@fullcalendar/react";
import { ListReportsCompanyDateQueryVariables } from "API";
import { HeaderContext, SidebarContext, UserContext, } from "App";
import { listReportsCompanyDate } from "graphql/queries";
import { ReportDao } from "lib/dao/reportDao";
import React, { useContext, useEffect, useState } from "react";
import CalendarView from "views/components/templates/report/reviewer/CalendarView";

type Props = {
    match: {
        params: {
            date: string
        }
    }
}

export default function(props: Props){
    
    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext)
    const currentUser = useContext(UserContext);

    const [events, setEvents] = useState<EventInput[]>([])
    const date = new Date(props.match.params.date)

    useEffect(() => {
        // 報告書情報の取得
        (async () => {
            if (currentUser) {
                const listI: ListReportsCompanyDateQueryVariables = {
                    companyID: currentUser.attributes["custom:companyId"],
                    date: {
                        beginsWith: props.match.params.date
                    }
                }
                const reports = await ReportDao.listCompanyDate(listReportsCompanyDate, listI);

                let eventItems: EventInput[]
                if (reports) {
                    eventItems = reports.map(report => {
                        return {
                            title: `${report.revieweeEmployee?.group?.name} ${report.revieweeEmployee?.lastName}${report.revieweeEmployee?.firstName}`,
                            date: report.date,
                            sub: report.sub,
                            workStatus: report.workStatus
                        }
                    })
                    setEvents(eventItems)
                }
            }
        })()
    }, [currentUser,props.match.params.date])

    return (
        <CalendarView
            events={events}
            setEvents={setEvents}
            data={{
                header: header,
                sidebar: sidebar,
                initialDate: date
            }}
        />
    )
}
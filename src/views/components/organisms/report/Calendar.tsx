import React, { useRef } from "react";
import FullCalendar, { EventClickArg, EventContentArg, EventInput } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import EventTask from "views/components/molecules/report/EventTask";
import dateFormat from "dateformat";
import CommandButton from "views/components/molecules/CommandButton";
import { ReportWorkingStatus } from "API";
import EventOK from "views/components/molecules/report/EventOK";
import EventProblem from "views/components/molecules/report/EventProblem";
import jaLocale from '@fullcalendar/core/locales/ja';
import styled from "styled-components";
// import CalendarEvent from 'views/components/organisms/report/CalendarEvent';

type Props = {
    events: EventInput[]
    handleDateClick?: ((arg: DateClickArg) => void)
    handleEventClick?: ((arg: EventClickArg) => void)
    handleNextMonthClick?: (target: Date) => void
    handlePrevMonthClick?: (target: Date) => void
    handleThisMonthClick?: (target: Date) => void
    initialDate: Date
    // calendarRef: React.MutableRefObject<FullCalendar | null>
}


function CalendarEvent(eventInfo: EventContentArg) {
    // console.log("event", eventInfo)
    const status: ReportWorkingStatus | undefined = eventInfo.event.extendedProps.workStatus
    // 色を変える分岐を作成する
    if (status) {
        if(status === ReportWorkingStatus.OK){
            return (
                <EventStyle>
                    <EventOK
                        title={eventInfo.event.title}
                    />
                </EventStyle>
            )
        }else if(status === ReportWorkingStatus.InTask){
            return (
                <EventStyle>
                    <EventTask
                        title={eventInfo.event.title}
                    />
                </EventStyle>
            )
        }else if(status === ReportWorkingStatus.InProblem){
            return (
                <EventStyle>
                    <EventProblem
                        title={eventInfo.event.title}
                    />
                </EventStyle>
            )
        }
    }
}

const EventStyle = styled.div({
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
})

export default function (props: Props) {
    const calendarRef = useRef<FullCalendar | null>(null)

    const dateStr = dateFormat(props.initialDate, "yyyy-mm-dd")
    const thisMonth = props.initialDate.getMonth()
    const thisYear = props.initialDate.getFullYear()

    const nextMonth = thisMonth + 1
    const prevMonth = thisMonth - 1

    const nextDate = new Date(thisYear, nextMonth)
    const prevDate = new Date(thisYear, prevMonth)

    return (
        <>
            <SpaceToolbar>
                <CommandButton
                    onClick={()=>{
                        if(props.handlePrevMonthClick){
                            props.handlePrevMonthClick(prevDate)
                        }
                        calendarRef.current?.getApi().prev()
                    }}
                >先月</CommandButton>
            </SpaceToolbar>
            <SpaceToolbar>
                <CommandButton
                    onClick={()=>{
                        if(props.handleThisMonthClick){
                            props.handleThisMonthClick(new Date())
                        }
                        calendarRef.current?.getApi().today()
                    }}
                >今月</CommandButton>
            </SpaceToolbar>
            <SpaceToolbar>
                <CommandButton
                    onClick={()=>{
                        if(props.handleNextMonthClick){
                            props.handleNextMonthClick(nextDate)
                        }
                        calendarRef.current?.getApi().next()
                    }}
                >来月</CommandButton>
            </SpaceToolbar>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={props.handleDateClick}
                eventClick={props.handleEventClick}
                events={props.events}
                eventContent={(CalendarEvent)}
                initialDate={dateStr}
                headerToolbar={{
                    start: "title",
                    end: ""
                }}
                ref={calendarRef}
                locale={jaLocale}
                dayMaxEventRows={true}
                views={{dayGridMonth: {
                    dayMaxEventRows: 5  //5件以上ある場合は「他x件」と表示する
                }}}
            />
        </>
    )
}

const SpaceToolbar = styled.div({
    display: "inline-block",
    margin: "0 10px",
})
import { DateClickArg } from '@fullcalendar/interaction'
import { EventClickArg, EventInput } from '@fullcalendar/react'
import React from 'react'
import { useHistory } from 'react-router-dom';
import { routeBuilder } from 'router';
import { LinkType } from 'views/components/atoms/Types';
import Header, { HeaderProps } from "views/components/organisms/common/Header";
import Calendar from 'views/components/organisms/report/Calendar'
import Container from '../../Container'
import Content from '../../Content'
import LeftBox from '../../LeftBox'
import RightBox from '../../RightBox'
import Sidebar from '../../Sidebar';

type Props = {
    events: EventInput[]
    setEvents: React.Dispatch<React.SetStateAction<EventInput[]>>
    data: {
        initialDate: Date
        header: HeaderProps | null
        sidebar: LinkType[][] | null
    }
}

export default function CalendarView(props: Props) {
    const history = useHistory();
    // const calendarRef = useRef<FullCalendar | null>(null)

    function handleDateClick(arg: DateClickArg) { // bind with an arrow function
        // console.log("arg", JSON.stringify(arg))
        // history.push(routeBuilder.reviewerReportCommentPath(arg.date, ""))
    }

    function handleEventClick(arg: EventClickArg){
        if(arg.event.start){
            history.push(routeBuilder.reviewerReportCommentPath(arg.event.start, arg.event.extendedProps.sub))
        }
    }

    function handleThisMonthClick(target: Date) {
        history.push(routeBuilder.reviewerReportCalendarPaht(target))
        // props.setEvents([])
    }

    function handleNextMonthClick(target: Date) {
        history.push(routeBuilder.reviewerReportCalendarPaht(target))
        // props.setEvents([])
    }

    function handlePrevMonthClick(target: Date) {
        history.push(routeBuilder.reviewerReportCalendarPaht(target))
        // props.setEvents([])
    }

    return (
        <>
            {/* <button
                onClick={()=>{
                    props.setEvents( [
                        { title: 'event 3', date: '2010-06-07' },
                        { title: 'event 4', date: '2010-06-08' }
                    ])
                }}
            >
                test
            </button> */}
            <Header
                {...props.data.header}
            />
            <Container>
                <LeftBox>
                    <Sidebar
                        data={props.data.sidebar}
                    />
                </LeftBox>
                <RightBox>
                    <Content>
                        <>
                            <Calendar
                                events={props.events}
                                handleDateClick={handleDateClick}
                                handleEventClick={handleEventClick}
                                initialDate={props.data.initialDate}
                                // calendarRef={calendarRef}
                                handleThisMonthClick={handleThisMonthClick}
                                handleNextMonthClick={handleNextMonthClick}
                                handlePrevMonthClick={handlePrevMonthClick}
                            />
                        </>
                    </Content>
                </RightBox>
            </Container>

        </>
    )
}
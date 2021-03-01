import { DateClickArg } from '@fullcalendar/interaction'
import { EventClickArg, EventInput } from '@fullcalendar/react'
import React from 'react'
import { useHistory } from 'react-router-dom';
import { routeBuilder } from 'router';
import styled from 'styled-components';
import { LinkType } from 'views/components/atoms/Types';
import Title from 'views/components/molecules/Title';
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
        console.log(JSON.stringify(arg.dateStr))
        history.push(routeBuilder.revieweeReportNewPath(arg.date))
    }

    function handleEventClick(arg: EventClickArg){
        if(arg.event.start){
            history.push(routeBuilder.revieweeReportEditPath(arg.event.start))
        }
    }

    function handleNextMonthClick(target: Date) {
        history.push(routeBuilder.revieweeReportCalendarPath(target))
        // props.setEvents([])
    }

    function handlePrevMonthClick(target: Date) {
        history.push(routeBuilder.revieweeReportCalendarPath(target))
        // props.setEvents([])
    }

    function handleThisMonthClick(target: Date) {
        history.push(routeBuilder.revieweeReportCalendarPath(target))
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
                            <TitleStyle>
                                <Title>{`作業報告 カレンダー`}</Title>
                            </TitleStyle>

                            <Calendar
                                events={props.events}
                                handleDateClick={handleDateClick}
                                handleEventClick={handleEventClick}
                                initialDate={props.data.initialDate}
                                // calendarRef={calendarRef}
                                handleNextMonthClick={handleNextMonthClick}
                                handlePrevMonthClick={handlePrevMonthClick}
                                handleThisMonthClick={handleThisMonthClick}
                            />
                        </>
                    </Content>
                </RightBox>
            </Container>

        </>
    )
}

const TitleStyle = styled.div({
    paddingBottom: "10px",
})
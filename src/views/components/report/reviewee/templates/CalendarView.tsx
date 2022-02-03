import { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg, EventInput } from "@fullcalendar/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { routeBuilder } from "router";
import styled from "styled-components";
import Header, { HeaderProps } from "views/components/common/organisms/Header";
import Calendar from "views/components/common/organisms/Calendar";
import Container from "../../../common/templates/Container";
import { LinkType } from "views/components/common/atoms/Types";
import Title from "views/components/common/molecules/Title";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";

type Props = {
  events: EventInput[];
  setEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
  data: {
    initialDate: Date;
    header: HeaderProps | null;
    sidebar: LinkType[][] | null;
  };
};

export default function CalendarView(props: Props): JSX.Element {
  const history = useHistory();
  // const calendarRef = useRef<FullCalendar | null>(null)

  function handleDateClick(arg: DateClickArg) {
    const id = props.events.find((event) => {
      return event.date === arg.dateStr;
    })?.id;
    if (id) {
      history.push(routeBuilder.revieweeReportEditPath(id));
    } else {
      history.push(routeBuilder.revieweeReportNewPath(arg.dateStr));
    }
  }

  function handleEventClick(arg: EventClickArg) {
    if (arg.event.id) {
      history.push(routeBuilder.revieweeReportEditPath(arg.event.id));
    } else {
      history.push(routeBuilder.revieweeReportNewPath(arg.event.startStr));
    }
  }

  function handleNextMonthClick(target: Date) {
    history.push(routeBuilder.revieweeReportCalendarPath(target));
  }

  function handlePrevMonthClick(target: Date) {
    history.push(routeBuilder.revieweeReportCalendarPath(target));
    // props.setEvents([])
  }

  function handleThisMonthClick(target: Date) {
    history.push(routeBuilder.revieweeReportCalendarPath(target));
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
      <Header {...props.data.header} />
      <Container>
        <LeftBox>
          <Sidebar data={props.data.sidebar} />
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
  );
}

const TitleStyle = styled.div({
  paddingBottom: "10px",
});

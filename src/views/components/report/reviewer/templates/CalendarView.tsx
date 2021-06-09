import { EventClickArg, EventInput } from "@fullcalendar/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { routeBuilder } from "router";
import styled from "styled-components";
import Header, { HeaderProps } from "views/components/common/organisms/Header";
import Calendar from "views/components/common/organisms/Calendar";
import Container from "../../../common/templates/Container";
import { LinkType, SelectLabel } from "views/components/common/atoms/Types";
import Title from "views/components/common/molecules/Title";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";
import { ReviewerReportFilter } from "../organisms/ReviewerReportFilter";

type Props = {
  events: EventInput[];
  setEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
  initEvents: EventInput[];
  groups: SelectLabel[];
  employeeGroupId: string;
  data: {
    initialDate: Date;
    header: HeaderProps | null;
    sidebar: LinkType[][] | null;
  };
};

export default function CalendarView(props: Props) {
  const history = useHistory();
  // const calendarRef = useRef<FullCalendar | null>(null)

  // function handleDateClick(arg: DateClickArg) {
  //   // bind with an arrow function
  //   // history.push(routeBuilder.reviewerReportCommentPath(arg.date, ""))
  // }

  function handleEventClick(arg: EventClickArg) {
    if (arg.event.id) {
      history.push(routeBuilder.reviewerReportCommentPath(arg.event.id));
    }
  }

  function handleThisMonthClick(target: Date) {
    history.push(routeBuilder.reviewerReportCalendarPaht(target));
    // props.setEvents([])
  }

  function handleNextMonthClick(target: Date) {
    history.push(routeBuilder.reviewerReportCalendarPaht(target));
    // props.setEvents([])
  }

  function handlePrevMonthClick(target: Date) {
    history.push(routeBuilder.reviewerReportCalendarPaht(target));
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
                <Title>{`報告参照 カレンダー`}</Title>
              </TitleStyle>

              {/* Todo 部署絞り込みの実装 一旦無効化 */}
              {/* <FilterStyle>
                <ReviewerReportFilter
                  groupId={props.employeeGroupId}
                  groups={props.groups}
                  initEvents={props.initEvents}
                  setEvents={props.setEvents}
                />
              </FilterStyle> */}

              <Calendar
                events={props.events}
                // handleDateClick={handleDateClick}
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
  );
}

const TitleStyle = styled.div({
  paddingBottom: "10px",
});

const FilterStyle = styled.div({
  paddingBottom: "30px",
  paddingLeft: "10px",
});

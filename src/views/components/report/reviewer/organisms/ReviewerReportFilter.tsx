import { EventInput } from "@fullcalendar/react";
import { Formik } from "formik";
import React from "react";
import styled from "styled-components";
import Text from "views/components/common/atoms/Text";
import { SelectLabel } from "views/components/common/atoms/Types";
import CommandButton from "views/components/common/molecules/CommandButton";
import PullDown from "views/components/common/molecules/PullDown";

type Props = {
  groups: SelectLabel[];
  groupId: string;
  initEvents: EventInput[];
  setEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
};

export function ReviewerReportFilter(props: Props) {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        group: props.groupId,
      }}
      onSubmit={async (values) => {
        if (values.group !== "all") {
          const filteredEvents = props.initEvents.filter(
            (initEvent) => initEvent.groupId === values.group
          );
          props.setEvents(filteredEvents);
        } else {
          props.setEvents(props.initEvents);
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <FilterStyle>
            <Text style={TextStyle}>部門</Text>
            <PullDown
              name="group"
              handleChange={formik.handleChange}
              options={props.groups}
              style={InputStyle}
              defaultIndex={props.groups.findIndex(
                (element) => element.value === props.groupId
              )}
            ></PullDown>
          </FilterStyle>

          <CommandButton type="submit">確認</CommandButton>
        </form>
      )}
    </Formik>
  );
}

const FilterStyle = styled.div({
  paddingBottom: "20px",
});

const TextStyle: React.CSSProperties = {
  marginRight: "10px",
};

const InputStyle: React.CSSProperties = {
  marginRight: "30px",
};

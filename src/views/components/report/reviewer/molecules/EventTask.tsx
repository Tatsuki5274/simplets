import React from "react";
import styled from "styled-components";
import CalendarEvent from "views/components/common/atoms/Event";

type Props = {
  title: string;
};

export default function (props: Props): JSX.Element {
  return (
    <Styled>
      <CalendarEvent title={props.title} />
    </Styled>
  );
}

const Styled = styled.div({
  backgroundColor: "yellow",
  color: "black",
});

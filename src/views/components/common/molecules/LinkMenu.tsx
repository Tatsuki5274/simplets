import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  data: {
    label: string;
    dest: string | null;
  };
};

const Styled = styled.div({});

export default function (props: Props) {
  if (!props.data.dest) {
    return null;
  }
  return (
    <Styled>
      <Link to={props.data.dest}>{props.data.label}</Link>
    </Styled>
  );
}

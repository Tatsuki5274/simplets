import React from "react";
import styled from "styled-components";

type Props = {
  children: JSX.Element;
};

export default function (props: Props): JSX.Element {
  return <Styled>{props.children}</Styled>;
}

const Styled = styled.div({
  display: "inline-block",
  width: "7.6%",
  verticalAlign: "top",
});

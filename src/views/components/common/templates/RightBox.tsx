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
  width: "92.4%",
  verticalAlign: "top",
});

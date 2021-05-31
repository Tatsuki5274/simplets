import React from "react";
import styled from "styled-components";

type Props = {
  children: JSX.Element[];
};

export default function (props: Props) {
  return <ContainerStyle>{props.children}</ContainerStyle>;
}

const ContainerStyle = styled.div({
  display: "flex",
  minHeight: "100vh",
});

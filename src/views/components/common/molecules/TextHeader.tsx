import React from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";

type Props = {
  children: string;
};

const Styled = styled.div({
  display: "inline",
});

export default function (props: Props): JSX.Element {
  return (
    <Styled>
      <Navbar.Text>{props.children}</Navbar.Text>
    </Styled>
  );
}

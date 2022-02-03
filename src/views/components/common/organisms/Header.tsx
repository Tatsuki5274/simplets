import { AmplifySignOut } from "@aws-amplify/ui-react";
import React from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";
import { onMobile } from "views/common/Responsive";
import TextHeader from "../molecules/TextHeader";
import HeaderLogo from "./HeaderLogo";

type Props = {
  companyName?: string;
  groupName?: string;
  lastName?: string;
  firstName?: string;
};

export type HeaderProps = Props;

const TextStyle = styled.div({
  marginRight: "10px",
});

export default function (props: Props): JSX.Element {
  return (
    <Styled>
      <Navbar bg="dark" variant="dark" sticky="top" style={{ zIndex: "auto" }}>
        <Navbar.Brand>
          <HeaderLogo />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <TextStyle>
            <TextHeader>{props.companyName || ""}</TextHeader>
          </TextStyle>
          <TextStyle>
            <TextHeader>{props.groupName || ""}</TextHeader>
          </TextStyle>
          <TextStyle>
            <TextHeader>
              {(props.lastName || "") + (props.firstName || "")}
            </TextHeader>
          </TextStyle>
          <AmplifySignOut buttonText="ログアウト"></AmplifySignOut>
        </Navbar.Collapse>
      </Navbar>
    </Styled>
  );
}

const Styled = styled.div({
  [onMobile]: {
    display: "none",
  },
});

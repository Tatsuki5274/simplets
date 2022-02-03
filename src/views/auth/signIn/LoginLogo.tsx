import React from "react";
import styled from "styled-components";
import Logo from "views/components/common/molecules/Logo";

export default function (): JSX.Element {
  return (
    <LogoStyle>
      <Logo />
    </LogoStyle>
  );
}

const LogoStyle = styled.div({
  width: "200px",
});

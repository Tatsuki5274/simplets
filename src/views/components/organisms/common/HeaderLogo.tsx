import React from "react";
import styled from "styled-components";
import Logo from "views/components/molecules/Logo";

export default function () {
  return (
    <LogoStyle>
      <Logo />
    </LogoStyle>
  );
}

const LogoStyle = styled.div({
  width: "150px",
});

import React from "react";
import Text from "views/components/common/atoms/Text";
import styled from "styled-components";

type Props = {
  children: string;
};

const Styled = styled.h2({});

export default function (props: Props): JSX.Element {
  return (
    <Styled>
      <Text>{props.children}</Text>
    </Styled>
  );
}

import React from "react";
import styled from "styled-components";
import Text from "views/components/common/atoms/Text";
import LinkMenu from "../molecules/LinkMenu";

type Props = {
  links: {
    label: string;
    dest: string | null;
  }[];
};

const Styled = styled.div({
  width: "100%",
  position: "sticky",
  top: "100px",
});

const Link = styled.div({
  paddingBottom: "10px",
});

export default function (props: Props) {
  return (
    <Styled>
      {props.links.map((link, index) => {
        return link.dest === null ? (
          <StyledText>
            <Text>{link.label}</Text>
          </StyledText>
        ) : (
          <Link key={index}>
            <LinkMenu data={link} />
          </Link>
        );
      })}
    </Styled>
  );
}

const StyledText = styled.div({
  fontSize: "10px",
});

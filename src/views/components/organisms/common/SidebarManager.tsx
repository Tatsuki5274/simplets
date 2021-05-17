import React from "react";
import styled from "styled-components";
import LinkMenu from "views/components/molecules/LinkMenu";

type Props = {
  links: {
    label: string;
    dest: string;
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
      {props.links.map((link) => {
        return (
          <Link>
            <LinkMenu data={link} />
          </Link>
        );
      })}
    </Styled>
  );
}

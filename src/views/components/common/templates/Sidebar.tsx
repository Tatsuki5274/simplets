import React from "react";
import styled from "styled-components";
import SidebarManager from "../organisms/SidebarManager";

type Props = {
  data:
    | {
        label: string;
        dest: string | null;
      }[][]
    | null;
};

export default function (props: Props): JSX.Element | null {
  return props.data ? (
    <Styled>
      {props.data.map((links, index) => {
        return (
          <SidebarContent key={index}>
            <SidebarManager links={links} />
          </SidebarContent>
        );
      })}{" "}
    </Styled>
  ) : null;
}

const Styled = styled.div({
  backgroundColor: "#8080804d",
  minHeight: "100%",
  padding: "20px 10px",
  paddingBottom: "30px",
});

const SidebarContent = styled.div({
  paddingBottom: "30px",
});

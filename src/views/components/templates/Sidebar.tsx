import React from "react";
import styled from "styled-components";

type Props = {
    children: JSX.Element
}

export default function (props: Props) {
    return (
        <Styled>
            {props.children}
        </Styled>
    )
}

const Styled = styled.div({
    backgroundColor: "#8080804d",
    minHeight: "100vh",
    padding: "20px 10px",
})
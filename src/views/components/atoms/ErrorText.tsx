import React from "react";
import styled from "styled-components";

type Props = {
    children: JSX.Element | string
}

export default function (props: Props) {
    return (
        <ErrorMessageStyle>
            {props.children}
        </ErrorMessageStyle>
    )
}

const ErrorMessageStyle = styled.div({
    color: "red"
})
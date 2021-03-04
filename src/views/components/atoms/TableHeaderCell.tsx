import React from "react";
import styled from "styled-components";

type Props = {
    children: string
}

export default function(props: Props){
    return <Styled>
        {props.children}
    </Styled>
}

const Styled = styled.td({
    backgroundColor: "#8080804d"
})
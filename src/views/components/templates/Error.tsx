import React from "react";
import styled from "styled-components";

type Props = {
    children: JSX.Element | string
}

export default function(props: Props){
    return (
        <MainStyle>
            {props.children}
        </MainStyle>
    )
}

const MainStyle = styled.div({

})
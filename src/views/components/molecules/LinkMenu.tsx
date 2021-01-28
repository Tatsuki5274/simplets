import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
    data: {
        label: string
        dest: string
    }
}

const Styled = styled.div ({

})

export default function(props:Props) {
    return (
        <Styled>
            <Link to={props.data.dest}>
                {props.data.label}
            </Link>
        </Styled>
    )
}
import { getStatusValue } from 'lib/getStatusValue';
import React from 'react';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';
type Props = {
    statusValue: number
}

export default function ApprovalStatusBox(props: Props){
    return (
        <Styled>
            <Badge variant="success">{getStatusValue(props.statusValue)}</Badge>
        </Styled>
    )
}

const Styled = styled.h2({
    display: "flex",
    justifyContent: "flex-end",
})
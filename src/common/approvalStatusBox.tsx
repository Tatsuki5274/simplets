import { getStatusValue } from 'lib/getStatusValue';
import React from 'react';
import { Badge } from 'react-bootstrap';
type Props = {
    statusValue: number
}

export default function ApprovalStatusBox(props: Props){
    return (
        <h2>
            <Badge variant="primary">{getStatusValue(props.statusValue)}</Badge>
        </h2>
    )
}
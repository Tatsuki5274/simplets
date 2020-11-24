import { getStatusValue } from 'lib/getStatusValue';
import React from 'react';
import { Badge } from 'react-bootstrap';
import { approvalStatusBoxStyle } from './globalStyle.module.scss';
type Props = {
    statusValue: number
}

export default function ApprovalStatusBox(props: Props){
    return (
        <h2>
            <Badge variant="success" className={approvalStatusBoxStyle}>{getStatusValue(props.statusValue)}</Badge>
        </h2>
    )
}
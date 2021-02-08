import React from "react";
import Gauge from "../atoms/Gauge";

type Props = {
    value: number
    id: string
}

export default function (props: Props) {
    return (
        <Gauge
            id={props.id}
            percent={props.value}
            style={{
                width: '50px',
                height: '50px',
                display: 'inline-block'
            }}
        />
    )
}
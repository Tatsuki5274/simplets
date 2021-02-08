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
            hideText={true}
            style={{
                width: '100px',
                height: '50px',
                display: 'inline-block'
            }}
        />
    )
}
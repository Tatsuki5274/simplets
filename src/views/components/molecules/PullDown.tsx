import React from "react";

type Props = {
    name: string
    handleChange: ((event: React.ChangeEvent<HTMLSelectElement>) => void) | undefined
    options: {
        value: string
        label: string
    }[]
    defaultIndex?: number
    style?: React.CSSProperties
}

export default function (props: Props) {
    const defaultIndex = props.defaultIndex || 0
    return (
        <select
            onChange={props.handleChange}
            name={props.name}
            style={props.style}
        >
            {props.options.map((option, index) => {
                return (
                    defaultIndex === index ?
                        <option value={option.value} selected>{option.label}</option>
                        : <option value={option.value}>{option.label}</option>
                )
            })}
        </select>
    )
}
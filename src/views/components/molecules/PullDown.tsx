import React from "react";

type Props =  {
    name: string
    handleChange : ((event: React.ChangeEvent<HTMLSelectElement>) => void) | undefined
    options: {
        value: string
        label: string
    }[]
}

export default function (props: Props) {
    return (
        <select
            onChange={props.handleChange}
            name={props.name}
        >
            {props.options.map(option => {
                return (
                    <option value={option.value}>{option.label}</option>
                )
            })}
        </select>
    )
}
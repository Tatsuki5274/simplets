import React from "react";
import styled from "styled-components";
import RadioButton from "views/components/atoms/RadioButton";

type Props = {
    radioButtons: {
        value: string
        label: string
    }[]
    name: string
    onChange : ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
    defaultIndex?: number
}

const Styled = styled.div({
})

export default function (props: Props) {
    const defaultIndex = props.defaultIndex || 0
    return (
        <Styled>
            {props.radioButtons.map((radioButton, index) => {
                return (
                    <>
                        <RadioButton 
                            name={props.name}
                            onChange={props.onChange}
                            defaultChecked={defaultIndex === index}
                        >{radioButton.value}</RadioButton>
                        <label>
                            {radioButton.label}
                        </label>
                    </>
                )
            })}
        </Styled>
    )

}
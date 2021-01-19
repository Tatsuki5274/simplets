import React from 'react'
import TextField from 'views/components/atoms/TextField'
import styled from 'styled-components'

type Props = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    defaultValue?: string
}

const Styled = styled.div({
})

export default function(props: Props){
    return (
        <Styled>
            <TextField
                name="title"
                onChange={props.onChange}
                defaultValue={props.defaultValue}
            >
            </TextField>
        </Styled>
    )
}

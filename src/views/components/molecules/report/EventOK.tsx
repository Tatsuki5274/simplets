import React from "react"
import styled from "styled-components"
import CalendarEvent from "views/components/atoms/Event"

type Props = {
    title: string
}

export default function(props: Props){
    return (
        <Styled>
            <CalendarEvent
                title={props.title}
            />
        </Styled>
    )
}

const Styled = styled.div({
    backgroundColor: "blue"
})
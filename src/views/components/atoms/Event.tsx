import React from "react";

type Props = {
    title: string
}

export default function(props: Props){
    return (
        <>
            <i>{props.title}</i>
        </>
    )
}
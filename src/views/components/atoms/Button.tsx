import React from "react";
import { Button, ButtonProps } from "react-bootstrap";

type Props = ButtonProps & {
    children: string
}

export default function(props: Props){
    return (
        <Button
            {...props}
        >
            {props.children}
        </Button>
    )
}
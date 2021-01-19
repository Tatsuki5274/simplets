import React from "react";
import { Badge } from "react-bootstrap";
import Text from "../atoms/Text";

export default function RequiredLabel(){
    return (
        <Badge
            variant="danger"
        >
            <Text>必須</Text>
        </Badge>
    )
}
import React from "react";
import { Table } from "react-bootstrap";
import Scroll from "../atoms/Scroll";

type Props = {
    children: JSX.Element[]
}

export default function(props: Props){
    return (
        <Scroll>
            <Table
                bordered
                style={StyledTable}    
            >
                {props.children}
            </Table>
        </Scroll>
    )
}

const StyledTable: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    whiteSpace: "pre",
}
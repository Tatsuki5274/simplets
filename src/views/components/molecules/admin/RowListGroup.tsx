import React from "react";
import { Link } from "react-router-dom";
import { LinkType } from "views/components/atoms/Types";

export type AdminListGroupRowType = {
    link: LinkType
    groupLocalId: string
    groupName: string
}

export default function(props: AdminListGroupRowType){
    return (
        <tr>
            <td><Link to={props.link.dest}>{props.link.label}</Link></td>
            <td>{props.groupLocalId}</td>
            <td>{props.groupName}</td>
        </tr>
    )
}
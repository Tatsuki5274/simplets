import React from "react";
import { Link } from "react-router-dom";

type Props = {
    link: { label: string, dest: string },
    mailAddress: string
    employeeName: string
    employeeLocalId: string
    groupName: string,
    superior: string
    admin: string,
    manager: string
}

export default function (props: Props) {
    return (
        <tr>
            <td>
                <Link to={props.link.dest}>
                    {props.link.label}
                </Link>
            </td>
            <td>{props.mailAddress}</td>
            <td>{props.employeeName}</td>
            <td>{props.employeeLocalId}</td>
            <td>{props.groupName}</td>
            <td>{props.superior}</td>
            <td>{props.admin}</td>
            <td>{props.manager}</td>
        </tr>
    )
}
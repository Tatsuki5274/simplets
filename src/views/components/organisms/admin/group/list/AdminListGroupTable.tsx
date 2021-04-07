import React from "react";
import RowListGroup, { AdminListGroupRowType } from "views/components/molecules/admin/RowListGroup";
import ScrollTable from "views/components/molecules/ScrollTable";

type Props = {
    data: AdminListGroupRowType[] | null
}

export default function(props: Props){
    return (
        <ScrollTable>
            <thead>
                <tr>
                    <td></td>
                    <td>部署ID</td>
                    <td>部署名</td>
                </tr>
            </thead>
            <tbody>
                {props.data?.map(row => {
                    return <RowListGroup
                        link={row.link}
                        groupLocalId={row.groupLocalId}
                        groupName={row.groupName}
                    />
                })}
            </tbody>
        </ScrollTable>
    )
}
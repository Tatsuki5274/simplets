import React from "react";
import RowListGroup, {
  AdminListGroupRowType,
} from "views/components/admin/group/molecules/RowListGroup";
import ScrollTable from "views/components/common/molecules/ScrollTable";

type Props = {
  data: AdminListGroupRowType[] | null;
};

export default function (props: Props) {
  return (
    <ScrollTable>
      <thead>
        <tr>
          <td></td>
          <td>部署番号</td>
          <td>部署名</td>
        </tr>
      </thead>
      <tbody>
        {props.data?.map((row) => {
          if (!row.id) {
            return null;
          }
          return (
            <RowListGroup
              link={row.link}
              groupLocalId={row.groupLocalId}
              groupName={row.groupName}
              key={row.id}
            />
          );
        })}
      </tbody>
    </ScrollTable>
  );
}

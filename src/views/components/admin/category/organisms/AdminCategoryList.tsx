import React from "react";
import RowListCategory, {
  AdminListCategoryRowType,
} from "views/components/admin/category/molecules/RowListCategory";
import ScrollTable from "views/components/common/molecules/ScrollTable";

type Props = {
  data: AdminListCategoryRowType[] | null;
};

export default function (props: Props) {
  return (
    <ScrollTable>
      <thead>
        <tr>
          <td></td>
          <td>カテゴリID</td>
          <td>カテゴリ内容</td>
        </tr>
      </thead>
      <tbody>
        {props.data?.map((row) => {
          return (
            <RowListCategory
              link={row.link}
              categoryLocalId={row.categoryLocalId}
              categoryName={row.categoryName}
              companyId={row.companyId}
              id={row.id}
              key={row.id}
            />
          );
        })}
      </tbody>
    </ScrollTable>
  );
}

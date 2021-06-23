import React from "react";
import { Link } from "react-router-dom";
import { LinkType } from "views/components/common/atoms/Types";

export type AdminListCategoryRowType = {
  link: LinkType;
  categoryLocalId: string;
  categoryName: string;
  companyId: string;
  id: string;
};

type Props = AdminListCategoryRowType;

export default function (props: Props) {
  if (!props.link.dest) {
    return null;
  }
  return (
    <tr>
      <td>
        <Link to={props.link.dest}>{props.link.label}</Link>
      </td>
      <td>{props.categoryLocalId}</td>
      <td>{props.categoryName}</td>
    </tr>
  );
}

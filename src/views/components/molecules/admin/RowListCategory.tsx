import { DeleteCategoryInput } from "API";
import { ErrorContext } from "App";
import { deleteCategory } from "graphql/mutations";
import { CategoryDao } from "lib/dao/categoryDao";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LinkType } from "views/components/atoms/Types";
import ButtonNegative from "../ButtonNegative";

export type AdminListCategoryRowType = {
    link: LinkType
    categoryLocalId: string
    categoryName: string
    companyId: string
    id: string
}

type Props = AdminListCategoryRowType

export default function (props: Props) {
    const setError = useContext(ErrorContext);
    return (
        <tr>
            <td><Link to={props.link.dest}>{props.link.label}</Link></td>
            <td>{props.categoryLocalId}</td>
            <td>{props.categoryName}</td>
            <td>
                <ButtonNegative onClick={async () => {
                    if (window.confirm("削除してよろしいですか？")) {
                        const deleteI: DeleteCategoryInput = {
                            id: props.id,
                            // companyID: props.companyId,
                            // localID: props.categoryLocalId,
                        }
                        const deleteItem = await CategoryDao.delete(deleteCategory, deleteI);

                        if (deleteItem) {
                            window.alert("カテゴリ内容の削除が完了しました")
                        } else {
                            setError("カテゴリ情報の取得に失敗しました")
                            console.error("カテゴリ情報の取得に失敗しました")
                        }

                    }
                }}>削除</ButtonNegative>
            </td>
        </tr>
    )
}
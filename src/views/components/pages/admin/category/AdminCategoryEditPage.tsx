import { GetCategoryQueryVariables } from "API";
import { ErrorContext, HeaderContext, SidebarContext, UserContext } from "App";
import { getCategory } from "graphql/queries";
import { CategoryDao } from "lib/dao/categoryDao";
import React, { useContext, useEffect, useState } from "react";
import AdminCategoryEdit from "views/components/templates/admin/category/AdminCategoryEdit";
import { AdminCategoryEditDataType } from "views/components/organisms/admin/category/AdminCategoryEditForm";

type Props = {
  match: {
    params: {
      categoryLocalId: string;
    };
  };
};

export default function (props: Props) {
  const header = useContext(HeaderContext);
  const sidebar = useContext(SidebarContext);
  const currentUser = useContext(UserContext);
  const setError = useContext(ErrorContext);

  const [category, setCategory] =
    useState<AdminCategoryEditDataType | null>(null);

  useEffect(() => {
    // カテゴリ情報の取得
    (async () => {
      if (currentUser) {
        const getI: GetCategoryQueryVariables = {
          id: props.match.params.categoryLocalId,
        };
        const category = await CategoryDao.get(getCategory, getI);

        if (
          category &&
          category.id &&
          category.companyID &&
          category.no &&
          category.name
        ) {
          const categoryItem: AdminCategoryEditDataType = {
            id: category.id,
            companyId: category.companyID,
            localId: category.no,
            name: category.name,
          };
          setCategory(categoryItem);
        } else {
          setError("カテゴリ情報の取得に失敗しました");
        }
      }
    })();
  }, [currentUser, props.match.params.categoryLocalId]);

  return category ? (
    <AdminCategoryEdit header={header} sidebar={sidebar} category={category} />
  ) : null;
}

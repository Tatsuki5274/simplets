import { ListCategorysCompanyQueryVariables } from "API";
import { ErrorContext, HeaderContext, SidebarContext, UserContext } from "App";
import { listCategorysCompany } from "graphql/queries";
import { CategoryDao } from "lib/dao/categoryDao";
import React, { useContext, useEffect, useState } from "react";
import { routeBuilder } from "router";
import { AdminListCategoryRowType } from "views/components/molecules/admin/RowListCategory";
import AdminCategoryList from "views/components/templates/admin/category/AdminCategoryList";

export default function () {
    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext);

    const currentUser = useContext(UserContext);
    const setError = useContext(ErrorContext)

    const [categorys, setCategorys] = useState<AdminListCategoryRowType[] | null>(null);

    useEffect(() => {
        // カテゴリ一覧情報の取得
        (async () => {
            if (currentUser) {
                const listI: ListCategorysCompanyQueryVariables = {
                    companyID: currentUser.attributes["custom:companyId"],
                }
                const categorys = await CategoryDao.listCompany(listCategorysCompany, listI);
                if (categorys) {
                    const categoryItems: AdminListCategoryRowType[] = categorys.map(category => {
                        return {
                            link: {
                                label: "変更",
                                dest: category.id ? routeBuilder.adminCategoryEditPath(category.id) : "",
                            },
                            categoryLocalId: category.no || "",
                            categoryName: category.name || "",
                            companyId: category.companyID || "",
                            id: category.id || "", // unsafe
                        }
                    })
                    setCategorys(categoryItems);
                } else {
                    setError("カテゴリ情報の取得に失敗しました")
                    console.error("カテゴリ情報の取得に失敗しました")
                }
            }
        })()
    }, [currentUser, setError,categorys])

    return (
        <>
            <AdminCategoryList
                header={header}
                sidebar={sidebar}
                data={categorys}
            />
        </>
    )
}
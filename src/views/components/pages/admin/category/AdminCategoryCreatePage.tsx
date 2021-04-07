import { HeaderContext, SidebarContext, UserContext } from "App";
import React, { useContext } from "react";
import AdminCategoryCreate from "views/components/templates/admin/category/AdminCategoryCreate";

export default function () {
    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext);
    const currentUser = useContext(UserContext);

    return (
        currentUser ?
            <AdminCategoryCreate
                header={header}
                sidebar={sidebar}
                companyId={currentUser?.attributes["custom:companyId"]}
            />
            : null
    )
}
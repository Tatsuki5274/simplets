import { HeaderContext, SidebarContext, UserContext } from "App";
import React, { useContext } from "react";
import AdminGroupCreate from "views/components/templates/admin/group/AdminGroupCreate";

export default function () {
    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext);

    const currentUser = useContext(UserContext);

    return (
        currentUser ?
            <AdminGroupCreate
                header={header}
                sidebar={sidebar}
                companyId={currentUser.attributes["custom:companyId"]}
            />
            : null
    )
}
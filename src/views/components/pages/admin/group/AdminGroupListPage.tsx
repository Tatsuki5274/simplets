import { ListGroupsQueryVariables } from "API";
import { HeaderContext, SidebarContext, UserContext } from "App";
import { listGroups } from "graphql/queries";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext, useEffect, useState } from "react";
import { routeBuilder } from "router";
import { AdminListGroupRowType } from "views/components/molecules/admin/RowListGroup";
import AdminGroupList from "views/components/templates/admin/group/AdminGroupList";

export default function () {
    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext);

    const currentUser = useContext(UserContext);

    const [groups,setGroups] =useState<AdminListGroupRowType[]>([]);

    useEffect(() => {
        (async () => {
            if (currentUser) {
                const listI: ListGroupsQueryVariables = {
                    companyID: currentUser.attributes["custom:companyId"],
                }
                const groups = await GroupDao.list(listGroups, listI);
                let groupItems: AdminListGroupRowType[]
                if (groups) {
                    groupItems = groups.map(group => {
                        return {
                            link: {
                                label: "変更",
                                dest: group.localID ? routeBuilder.adminGroupEditPath(group.localID) : "",
                            },
                            groupLocalId: group.localID || "",
                            groupName: group.name || "",
                        }
                    });

                    // 部署IDでソート
                    groupItems.sort(function (a, b) {
                        if (a && b) {
                            if (a.groupLocalId > b.groupLocalId) return 1
                            if (a.groupLocalId < b.groupLocalId) return -1
                        }
                        return 0
                    })

                    setGroups(groupItems)
                }
            }
        })()
    }, [currentUser])

    return (
        <AdminGroupList
            header={header}
            sidebar={sidebar}
            data={groups}
        />
    )
}
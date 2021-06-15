import { ListGroupsCompanyQueryVariables } from "API";
import { HeaderContext, SidebarContext, UserContext } from "App";
import { listGroupsCompany } from "graphql/queries";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext, useEffect, useState } from "react";
import { routeBuilder } from "router";
import { AdminListGroupRowType } from "views/components/admin/group/molecules/RowListGroup";
import AdminGroupList from "../templates/AdminGroupList";

export default function () {
  const header = useContext(HeaderContext);
  const sidebar = useContext(SidebarContext);

  const currentUser = useContext(UserContext);

  const [groups, setGroups] = useState<AdminListGroupRowType[]>([]);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const listI: ListGroupsCompanyQueryVariables = {
          companyID: currentUser.attributes["custom:companyId"],
        };
        const groups = await GroupDao.listCompany(listGroupsCompany, listI);
        let groupItems: AdminListGroupRowType[];
        if (groups) {
          groupItems = groups.map((group) => {
            return {
              link: {
                label: "変更",
                dest: group?.id
                  ? routeBuilder.adminGroupEditPath(group.id)
                  : "", // unsafe
              },
              groupLocalId: group?.no || "", // unsafe
              groupName: group?.name || "", // unsafe
              id: group?.id,
            };
          });

          // 部署IDでソート
          groupItems.sort(function (a, b) {
            if (a && b) {
              if (a.groupLocalId > b.groupLocalId) return 1;
              if (a.groupLocalId < b.groupLocalId) return -1;
            }
            return 0;
          });

          setGroups(groupItems);
        }
      }
    })();
  }, [currentUser]);

  return <AdminGroupList header={header} sidebar={sidebar} data={groups} />;
}

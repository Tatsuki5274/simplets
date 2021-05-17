import { GetGroupQueryVariables, Group } from "API";
import { ErrorContext, HeaderContext, SidebarContext, UserContext } from "App";
import { getGroup } from "graphql/queries";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext, useEffect, useState } from "react";
import AdminGroupChange from "views/components/templates/admin/group/AdminGroupChange";

type Props = {
  match: {
    params: {
      groupLocalId: string;
    };
  };
};

export default function (props: Props) {
  const header = useContext(HeaderContext);
  const sidebar = useContext(SidebarContext);
  const setError = useContext(ErrorContext);

  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    (async () => {
      const getI: GetGroupQueryVariables = {
        id: props.match.params.groupLocalId,
      };
      const groupItem = await GroupDao.get(getGroup, getI);
      if (groupItem) {
        setGroup(groupItem);
      } else {
        setError("部署情報が取得できません");
      }
    })();
  }, [props.match.params.groupLocalId, setError]);

  return (
    <>
      {group ? (
        <AdminGroupChange
          header={header}
          sidebar={sidebar}
          companyId={group.companyID || ""}
          groupLocalId={group.no || ""}
          groupName={group.name || ""}
          id={group.id || ""}
        />
      ) : null}
    </>
  );
}

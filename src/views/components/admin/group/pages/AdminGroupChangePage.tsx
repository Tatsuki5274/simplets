import { GetGroupQueryVariables, Group } from "API";
import { ErrorContext, HeaderContext, SidebarContext } from "App";
import { getGroup } from "graphql/queries";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext, useEffect, useState } from "react";
import AdminGroupChange from "views/components/admin/group/templates/AdminGroupChange";
import LoadingScreen from "views/components/common/templates/LoadingScreen";

type Props = {
  match: {
    params: {
      groupId: string;
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
        id: props.match.params.groupId,
      };
      const groupItem = await GroupDao.get(getGroup, getI);
      if (groupItem) {
        setGroup(groupItem);
      } else {
        setError("部署情報が取得できません");
      }
    })();
  }, [props.match.params.groupId, setError]);
  if (!group?.id) {
    return <LoadingScreen></LoadingScreen>;
  }
  return (
    <>
      {group ? (
        <AdminGroupChange
          header={header}
          sidebar={sidebar}
          companyId={group.companyID || ""}
          groupId={group.id}
          groupNo={group.no || ""}
          groupName={group.name || ""}
          id={group.id}
        />
      ) : null}
    </>
  );
}

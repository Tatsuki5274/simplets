import { HeaderContext, SidebarContext, UserContext } from "App";
import React, { useContext } from "react";
import AdminGroupCreate from "../templates/AdminGroupCreate";

export default function () {
  const header = useContext(HeaderContext);
  const sidebar = useContext(SidebarContext);

  const currentUser = useContext(UserContext);
  const companyId = currentUser?.attributes["custom:companyId"] || null;

  if (!companyId) {
    throw new Error("会社情報を取得することができませんでした");
  }

  return currentUser ? (
    <AdminGroupCreate header={header} sidebar={sidebar} companyId={companyId} />
  ) : null;
}

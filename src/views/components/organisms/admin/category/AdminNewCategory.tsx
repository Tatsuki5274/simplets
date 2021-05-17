import React from "react";
import { routeBuilder } from "router";
import CommandButton from "views/components/molecules/CommandButton";

export default function () {
  return (
    <CommandButton href={routeBuilder.adminCategoryNewPath()}>
      新規作成
    </CommandButton>
  );
}

import React from "react";
import { routeBuilder } from "router";
import CommandButton from "views/components/common/molecules/CommandButton";

export default function (): JSX.Element {
  return (
    <CommandButton href={routeBuilder.adminCategoryNewPath()}>
      登録
    </CommandButton>
  );
}

import React from "react";
import CommandButton from "views/components/common/molecules/CommandButton";

type Props = {
  link: {
    label: string;
    dest: string;
  };
};

export default function (props: Props) {
  return (
    <CommandButton href={props.link.dest}>{props.link.label}</CommandButton>
  );
}

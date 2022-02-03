import React from "react";

type Props = {
  title: string;
};

export default function (props: Props): JSX.Element {
  return (
    <>
      <i>{props.title}</i>
    </>
  );
}

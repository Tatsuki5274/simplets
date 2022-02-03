import React from "react";
import { Badge } from "react-bootstrap";

type Props = {
  children: string;
};

export default function (props: Props): JSX.Element {
  return <Badge variant="success">{props.children}</Badge>;
}

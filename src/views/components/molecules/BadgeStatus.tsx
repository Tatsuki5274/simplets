import React from "react";
import { Badge } from "react-bootstrap";

type Props = {
  children: string;
};

export default function (props: Props) {
  return <Badge variant="success">{props.children}</Badge>;
}

import React from "react";
import { Button, ButtonProps } from "react-bootstrap";

type Props = ButtonProps & {
  children: string;
};

export default function (props: Props): JSX.Element {
  return <Button {...props}>{props.children}</Button>;
}

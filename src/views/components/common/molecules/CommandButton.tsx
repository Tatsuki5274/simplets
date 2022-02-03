import React from "react";
import { ButtonProps } from "react-bootstrap";
import Button from "../atoms/Button";

type Props = ButtonProps & {
  children: string;
};

export default function (props: Props): JSX.Element {
  return (
    <Button variant="primary" {...props}>
      {props.children}
    </Button>
  );
}

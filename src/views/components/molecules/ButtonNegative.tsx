import React from "react";
import { ButtonProps } from "react-bootstrap";
import Button from "../atoms/Button";

type Props = ButtonProps & {
  children: string;
};

export default function (props: Props) {
  return (
    <Button variant="danger" {...props}>
      {props.children}
    </Button>
  );
}

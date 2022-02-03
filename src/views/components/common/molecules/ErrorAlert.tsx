import React from "react";
import { Alert } from "react-bootstrap";
import Text from "../atoms/Text";

type Props = {
  children: string;
};

export default function (props: Props): JSX.Element {
  return (
    <Alert variant="danger">
      <Text>{props.children}</Text>
    </Alert>
  );
}

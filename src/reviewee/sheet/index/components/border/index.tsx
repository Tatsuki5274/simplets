import React from "react";
import { Card } from "react-bootstrap";

export const BorderTable = (): JSX.Element => {
  return (
    <Card>
      <Card.Header>
        <h4>評価基準</h4>
      </Card.Header>
      <Card.Body>
        <p>5:非常に良い成果をあげた</p>
        <p>4:良い成果をあげた</p>
        <p>3:成果は普通の水準であった</p>
        <p>2:成果はやや物足りなかった</p>
        <p>1:成果は不十分であった</p>
      </Card.Body>
    </Card>
  );
};

import React from "react";

type RadioValue = {
  value: string;
  display: string;
};

type Props = {
  name: string;
  data: RadioValue[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function (props: Props) {
  return <div></div>;
}

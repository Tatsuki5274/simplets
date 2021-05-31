import React from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  children: string;
  // name: string
  // onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
};

export default function (props: Props) {
  return (
    <input
      type="radio"
      name={props.name}
      value={props.children}
      onChange={props.onChange}
      defaultChecked={props.defaultChecked}
    />
  );
}

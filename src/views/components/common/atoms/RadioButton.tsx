import React from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  children: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  defaultChecked?: boolean;
  // name: string
  // onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
};

export default function (props: Props): JSX.Element {
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

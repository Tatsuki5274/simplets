import React from "react";
import styled from "styled-components";
import RadioButton from "../atoms/RadioButton";

type Props = {
  radioButtons: {
    value: string;
    label: string;
  }[];
  name: string;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  defaultIndex?: number;
};

const Styled = styled.div({});

const Label = styled.label({
  marginRight: "10px",
});
export default function (props: Props): JSX.Element {
  const defaultIndex = props.defaultIndex || 0;
  return (
    <Styled>
      {props.radioButtons.map((radioButton, index) => {
        return (
          <>
            <RadioButton
              name={props.name}
              onChange={props.onChange}
              defaultChecked={defaultIndex === index}
            >
              {radioButton.value}
            </RadioButton>
            <Label>{radioButton.label}</Label>
          </>
        );
      })}
    </Styled>
  );
}

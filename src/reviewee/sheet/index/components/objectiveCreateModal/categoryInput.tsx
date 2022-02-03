import React, { CSSProperties } from "react";
import { Form } from "react-bootstrap";

type Props = {
  sectionKeys: string;
  categoryName: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  defaultCheck: boolean;
  style: CSSProperties;
};
function CategoryInput(props: Props): JSX.Element {
  return (
    <div>
      <Form.Check
        name="sectionKeys"
        type="radio"
        inline
        value={props.sectionKeys}
        onChange={props.handleChange}
        defaultChecked={props.defaultCheck}
      />
      <label style={props.style}>{props.categoryName}</label>
    </div>
  );
}

export default CategoryInput;

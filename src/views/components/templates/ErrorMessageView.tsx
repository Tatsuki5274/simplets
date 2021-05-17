import { ErrorContext } from "App";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import ErrorMessage from "../organisms/ErrorMessage";

type Props = {
  children?: string;
};

export default function (props: Props) {
  // const timerId = setTimeout(clearError, 2000 );
  const setError = useContext(ErrorContext);

  useEffect(() => {
    if (props.children) {
      setTimeout(() => setError(null), 5000);
      setError(props.children);
    }
  }, [props.children, setError]);

  // function clearError(){
  //     setError(null)
  // }

  function onClick() {
    setError(null);
  }

  if (props.children) {
    return (
      <Styled onClick={onClick}>
        <ErrorMessage>{props.children}</ErrorMessage>
      </Styled>
    );
  }
  return null;
}

const Styled = styled.div({
  position: "fixed",
  width: "100%",
  top: 0,
  left: 0,
  zIndex: 1021,
});

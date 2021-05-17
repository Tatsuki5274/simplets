import React from "react";
import styled from "styled-components";
import ErrorAlert from "../molecules/ErrorAlert";

type Props = {
  children?: string;
};

export default function (props: Props) {
  // const [timerId, setTimerId] = useState<NodeJS.Timeout>()

  // useEffect(()=>{
  //     const timerId = setTimeout(clearError, 5000 );
  //     setTimerId(timerId)
  // }, [props.message])

  // function clearError(){
  //     setTimerId(undefined)
  // }

  if (props.children) {
    return (
      <Styled>
        <ErrorAlert>{props.children}</ErrorAlert>
      </Styled>
    );
  }
  return null;
}

const Styled = styled.div({
  // width: "50%"
});

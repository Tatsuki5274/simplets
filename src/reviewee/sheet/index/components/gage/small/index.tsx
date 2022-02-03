import React from "react";
import GaugeChart from "react-gauge-chart";

type Props = {
  value: number;
  id: string;
};

export const SmallGage = (props: Props): JSX.Element => {
  return (
    <GaugeChart
      id={`chart-${props.id}`}
      nrOfLevels={10}
      colors={["#EA4228", "#F5CD19", "#5BE12C"]}
      percent={props.value >= 0 ? props.value / 100 : 0}
      // hideText={true}
      textColor={"#212529"}
      style={{
        width: "120px",
        height: "50px",
        display: "inline-block",
      }}
    />
  );
};

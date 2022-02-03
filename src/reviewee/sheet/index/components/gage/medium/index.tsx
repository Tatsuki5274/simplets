import React from "react";
import GaugeChart from "react-gauge-chart";

type Props = {
  value: number;
  id: string;
};

export const MediumGage = (props: Props): JSX.Element => {
  return (
    <GaugeChart
      id={`chart-${props.id}`}
      nrOfLevels={10}
      colors={["#EA4228", "#F5CD19", "#5BE12C"]}
      percent={props.value / 100}
      //hideText={true}
      textColor={"#212529"}
      style={{
        width: "200px",
        height: "100px",
        display: "inline-block",
      }}
    />
  );
};

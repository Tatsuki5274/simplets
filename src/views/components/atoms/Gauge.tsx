import React from "react";
import GaugeChart, { GaugeChartProps } from "react-gauge-chart";

type Props = GaugeChartProps;

export default function (props: Props) {
  return (
    <GaugeChart
      nrOfLevels={10}
      colors={["#EA4228", "#F5CD19", "#5BE12C"]}
      {...props}
    />
  );
}

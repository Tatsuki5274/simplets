import React from "react";
import Image from "../atoms/Image";

export default function (): JSX.Element {
  const path = `${process.env.PUBLIC_URL}/logo.png`;
  return <Image src={path} />;
}

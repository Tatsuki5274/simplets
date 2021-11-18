/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Props, PureComponent } from "react";
import PropTypes from "prop-types";
// import JsPdf from "jspdf";
import html2canvas from "html2canvas";
import "./style.css";
import { string } from "yup";
import { JsxAttributeLike } from "typescript";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const JsPdf = require("jspdf");

class ReactToPdf extends React.Component {
  targetRef: React.RefObject<HTMLDivElement>;
  constructor(props: propTypes) {
    super(props);
    this.props = props;
    this.toPdf = this.toPdf.bind(this);
    this.targetRef = React.createRef<HTMLDivElement>();
  }

  props: {
    targetRef: React.RefObject<HTMLDivElement>;
    filename: string;
    x: number;
    y: number;
    options: unknown;
    scale: number;
    children: ({
      toPdf,
      targetRef,
    }: {
      toPdf: React.MouseEventHandler<HTMLElement>;
      targetRef: React.LegacyRef<HTMLDivElement>;
    }) => JSX.Element;
  };
  static defaultProps: {
    filename: string;
    options: unknown;
    x: number;
    y: number;
    scale: number;
    targetRef: unknown;
  };

  toPdf() {
    const { targetRef, filename, x, y, options } = this.props;
    const source = targetRef || this.targetRef;
    const targetComponent = source.current;

    if (!targetComponent) {
      throw new Error(
        "Target ref must be used or informed. See https://github.com/ivmarcos/react-to-pdf#usage."
      );
    }
    html2canvas(targetComponent, {
      logging: false,
      useCORS: true,
      scale: this.props.scale,
    }).then((canvas) => {
      const imgData = canvas.toDataURL();
      const pdf = new JsPdf(options);
      const pageHeight = 500;
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      let position = 0;
      let heightleft = pdfHeight - pageHeight;
      pdf.addImage(imgData, "JPEG", x, y, pdfWidth, 0, "alias", "FAST");
      while (heightleft > 0) {
        position = heightleft - pdfHeight + 52;
        pdf.addPage();
        pdf.addImage(
          imgData,
          "JPEG",
          x,
          position,
          pdfWidth,
          0,
          "alias",
          "FAST"
        );
        heightleft -= pageHeight;
      }
      pdf.save(filename);
    });
  }

  render() {
    const { children } = this.props;
    return children({ toPdf: this.toPdf, targetRef: this.targetRef });
  }
}

ReactToPdf.defaultProps = {
  filename: "download.pdf",
  options: undefined,
  x: 0,
  y: 0,
  scale: 1,
  targetRef: undefined,
};

type propTypes = {
  filename: string;
  options: unknown;
  x: number;
  y: number;
  scale: number;
  children: ({
    toPdf,
    targetRef,
  }: {
    toPdf: React.MouseEventHandler<HTMLElement>;
    targetRef: React.LegacyRef<HTMLDivElement>;
  }) => JSX.Element;
  targetRef: React.RefObject<HTMLDivElement>;
};

export default ReactToPdf;

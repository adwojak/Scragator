// @flow
import * as React from "react";
import "./Label.scss";

type LabelType = $ReadOnly<{|
  children: string,
  htmlFor?: string,
  className?: string
|}>;

export default function Label(props: LabelType): React.Node {
  const { htmlFor, className, children } = props;
  return (
    <label htmlFor={htmlFor} className={className || "LabelBig"}>
      {children}
    </label>
  );
}

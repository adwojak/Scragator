// @flow
import * as React from "react";
import "./Button.scss";

type ButtonType = $ReadOnly<{|
  children: string,
  type?: string,
  disabled?: boolean,
  className?: string
|}>;

export default function Button(props: ButtonType): React.Node {
  const { children, disabled, type, className, ...properties } = props;
  return (
    <button
      disabled={disabled || false}
      type={type || "submit"}
      className={className || "ButtonBig"}
      {...properties}
    >
      {children}
    </button>
  );
}

// @flow
import * as React from "react";
import "./Button.scss";

type ButtonType = $ReadOnly<{|
  buttonText: string,
  disabled?: boolean,
  className?: string
|}>;

export default function Button(props: ButtonType): React.Node {
  const { buttonText, disabled, className } = props;
  return (
    <button disabled={disabled || false} className={className || "ButtonBig"}>
      {buttonText}
    </button>
  );
}

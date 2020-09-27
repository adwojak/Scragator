import * as React from "react";
import classNames from "classnames";
import "./BurgerButton.scss";

const BurgerButton = (props: {
  burgerMenuVisible: boolean,
  changeBurgerMenuVisibility: Function
}): React.Node => {
  return (
    <div
      id="BurgerButton"
      className={classNames({
        burgerButtonActive: props.burgerMenuVisible
      })}
      onClick={props.changeBurgerMenuVisibility}
    >
      <span class="BurgerBarLong"></span>
      <span class="BurgerBarShortGroup">
        <span class="BurgerBarShort"></span>
        <span class="BurgerBarShort"></span>
      </span>
      <span class="BurgerBarLong"></span>
    </div>
  );
};

export default BurgerButton;

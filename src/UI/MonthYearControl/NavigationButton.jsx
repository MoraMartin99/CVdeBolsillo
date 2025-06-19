import css from "./NavigationButton.module.css";
import BaseButton from "../BaseButton/BaseButton";
import UpIcon from "../../assets/images/fillArrowUp.svg?react";
import DownIcon from "../../assets/images/fillArrowDown.svg?react";

/**
 * @module  NavigationButton
 */

/**
 * This callbacks runs on click events
 * @callback onClickCallback
 * @param {*}
 */

/**
 * @typedef NavigationButtonProps
 * @property {object} props The component properties
 * @property {"up"|"down"} [props.iconDirection = "up"]
 * @property {Array<string>} [props.classArr = []] A list of CSS classes to apply to the Button
 * @property {onClickCallback} props.onClick The function that runs on click events
 * @property {boolean} [props.isDisable = false] If true sets the disable attribute as true, if false sets the opposite
 * @property {Object} [props.style = {}] An object that sets the inline style
 */

/**
 * The NavigationButton component represents a button that performs some kind of movement in an interface
 * @param {NavigationButtonProps} props The NavigationButton properties
 * @returns {JSX.Element}
 */
function NavigationButton({
  iconDirection = "up",
  classArr = [],
  style = {},
  isDisable = false,
  onClick,
}) {
  const DOWN_POSITION = "down";
  return (
    <BaseButton
      Icon={
        iconDirection === DOWN_POSITION ? (
          <DownIcon data-testid="downIcon" className={[css.icon]}></DownIcon>
        ) : (
          <UpIcon data-testid="upIcon" className={[css.icon]}></UpIcon>
        )
      }
      classArr={[css.main, ...classArr]}
      isDisable={isDisable}
      onClick={onClick}
      style={style}
    ></BaseButton>
  );
}

export default NavigationButton;

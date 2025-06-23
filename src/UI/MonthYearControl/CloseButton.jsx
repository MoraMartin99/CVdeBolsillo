import BaseButton from "../BaseButton/BaseButton";
import Icon from "../../assets/images/closeIcon.svg?react";
import css from "./CloseButton.module.css";

/**
 * @module  CloseButton
 */

/**
 * This callbacks runs on click events
 * @callback onClickCallback
 * @param {*}
 */

/**
 * @typedef CloseButtonProps
 * @property {object} props The component properties
 * @property {Array<string>} [props.classArr = []] A list of CSS classes to apply to the Button
 * @property {onClickCallback} props.onClick The function that runs on click events
 * @property {Object} [props.style = {}] An object that sets the inline style
 */

/**
 * The CloseButton component represents a button that closes a menu
 * @param {CloseButtonProps} props The component properties
 * @returns {JSX.Element}
 */
function CloseButton({ classArr = [], onClick, style = {} }) {
  return (
    <BaseButton
      {...{ onClick, style }}
      classArr={[css.main, ...classArr]}
      Icon={<Icon role="img" className={css.icon}></Icon>}
    ></BaseButton>
  );
}

export default CloseButton;

import { reduceToClassName } from "../../utils";
import css from "./BaseButton.module.css";
/**@module BaseButton */

/**
 * This callbacks runs on click events
 * @callback onClickCallback
 */

/**
 * @typedef BaseButtonProps
 * @property {object} props The component properties
 * @property {string} [props.children] The component children
 * @property {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @property {CurrentColorIcon} [props.Icon] The icon component that represents the button
 * @property {"left" | "right"} [props.iconPosition = "left"] The position of the icon
 * @property {onClickCallback} props.onClick The function that runs on click events
 * @property {boolean} [props.isDisable = false] If true sets the disable attribute as true, if false sets the opposite
 * @property {Object} [props.style = {}] An object that sets the inline style
 */

/**
 * The BaseButton component
 * @param {ButtonProps} props The BaseButton properties
 * @returns {JSX.Element}
 */
function BaseButton({
  children,
  classArr = [],
  Icon,
  iconPosition = "left",
  onClick,
  isDisable = false,
  style: initialStyle = {},
}) {
  const iconPositionClass =
    iconPosition.toLowerCase() === "right" ? css.right : "";

  return (
    <button
      disabled={isDisable}
      className={reduceToClassName([iconPositionClass, css.main, ...classArr])}
      onClick={onClick}
      style={{ ...initialStyle }}
    >
      {Icon}
      {children}
    </button>
  );
}

export default BaseButton;

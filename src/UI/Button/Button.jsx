import { reduceToClassName } from "../../utils";
import styles from "./Button.module.css";
/**@module Button */

/**
 * This callbacks runs on click events
 * @callback onClickCallback
 * @param {*}
 */

/**
 * @typedef ButtonProps
 * @property {object} props The Button properties
 * @property {string} [props.children] The visible text of the Button
 * @property {Array<string>} [props.classArr = []] A list of CSS classes to apply to the Button
 * @property {CurrentColorIcon} [props.Icon] The icon component that represents the button
 * @property {"left" | "right"} [props.iconPosition = "left"] The position of the icon
 * @property {onClickCallback} props.onClickCallback The function that runs on click events
 */

/**
 * The Button component
 * @param {ButtonProps} props The Button properties
 * @returns {JSX.Element}
 */
function Button({
  children,
  classArr = [],
  Icon,
  iconPosition = "left",
  onClickCallback,
}) {
  const iconPositionClass =
    iconPosition.toLowerCase() === "right" ? styles.right : "";
  return (
    <button
      className={reduceToClassName([
        iconPositionClass,
        styles.main,
        ...classArr,
      ])}
      onClick={onClickCallback}
    >
      {Icon ? <Icon className={styles.icon}></Icon> : undefined}
      {children}
    </button>
  );
}

export default Button;

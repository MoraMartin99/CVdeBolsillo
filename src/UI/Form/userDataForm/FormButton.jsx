import BaseButton from "../BaseButton/BaseButton";
import css from "./FormButton.module.css";
/**@module FormButton */

/**
 * This callbacks runs on click events
 * @callback onClickCallback
 * @param {*}
 */

/**
 * @typedef FormButtonProps
 * @property {object} props The component properties
 * @property {string} [props.children] The visible text of the Button
 * @property {Array<string>} [props.classArr = []] A list of CSS classes to apply to the Button
 * @property {CurrentColorIcon} [props.Icon] The icon component that represents the button
 * @property {"left" | "right"} [props.iconPosition = "left"] The position of the icon
 * @property {onClickCallback} props.onClick The function that runs on click events
 * @property {boolean} [props.isDisable = false] If true sets the disable attribute as true, if false sets the opposite
 * @property {Object} [props.style = {}] An object that sets the inline style
 */

/**
 * The FormButton component
 * @param {FormButtonProps} props The FormButton properties
 * @returns {JSX.Element}
 */
function FormButton({
  children,
  classArr = [],
  Icon,
  iconPosition = "left",
  onClick,
  isDisable = false,
  style: initialStyle = {},
}) {
  return (
    <BaseButton
      isDisable={isDisable}
      classArr={[css.main, ...classArr]}
      onClick={onClick}
      style={{ ...initialStyle }}
      Icon={Icon ? <Icon className={css.icon}></Icon> : undefined}
      iconPosition={iconPosition}
    >
      {children}
    </BaseButton>
  );
}

export default FormButton;

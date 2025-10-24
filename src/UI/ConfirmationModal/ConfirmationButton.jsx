import BaseButton from "../BaseButton/BaseButton";
import css from "./ConfirmationButton.module.css";
import ThumbsUpIcon from "../../assets/images/thumbsUp.svg?react";
import ThumbsDownIcon from "../../assets/images/thumbsDown.svg?react";

/**
 * This callbacks runs on click events
 * @callback onClickCallback
 * @param {*}
 */

/**
 * The ConfirmationButton component
 * @memberof module:ConfirmationModal
 * @param {object} props The component properties
 * @param  {string} [props.children] The visible text of the Button
 * @param  {Array<string>} [props.classArr = []] A list of CSS classes to apply to the Button
 * @param  {"accept"|"cancel"} [props.variant = "accept"] The purpose of the Button. This property dictates some styles properties like icon and icon position
 * @param  {onClickCallback} props.onClick The function that runs on click events
 * @returns {JSX.Element}
 */
function ConfirmationButton({ children, classArr = [], variant, onClick }) {
  const DEFAULT = "primary";
  const CANCEL = "cancel";
  const icons = {
    [DEFAULT]: ThumbsUpIcon,
    [CANCEL]: ThumbsDownIcon,
  };
  const iconPositions = { [CANCEL]: "left", [DEFAULT]: "right" };
  const Icon = variant ? icons[variant] : icons[DEFAULT];
  const iconPosition = variant
    ? iconPositions[variant]
    : iconPositions[DEFAULT];
  return (
    <BaseButton
      iconPosition={iconPosition}
      Icon={<Icon className={css.icon}></Icon>}
      classArr={[...classArr, css.base, "confirmationButton"]}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}
export default ConfirmationButton;

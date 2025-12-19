import WarningIcon from "../../../assets/images/warning.svg?react";
import { reduceToClassName } from "../../../utils";
import css from "./Tip.module.css";

/**@module Tip */

/**
 * The Tip component displays a message to the user that clarifies the constraints that makes a value valid
 * @param {object} props The component properties
 * @param {string} props.children The visible text
 * @param {boolean} [props.isVisible = false] If true styles the component as visible, if false styles the component as invisible (it reserve its space)
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @returns {JSX.Element}
 */
function Tip({ children, isVisible = false, classArr = [] }) {
  return (
    <span
      className={reduceToClassName([
        ...classArr,
        css.main,
        isVisible ? css.isVisible : "",
      ])}
    >
      <WarningIcon className={css.icon}></WarningIcon>
      {children}
    </span>
  );
}

export default Tip;

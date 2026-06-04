import WarningIcon from "../../../../assets/images/warning.svg?react";
import { reduceToClassName } from "../../../../utils";
import css from "./TipCard.module.css";
import baseCSS from "../field.module.css";

/**
 * An Icon component that inherits its fill/stroke color from its parent using [the currentColor keyword]{@link https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/color}
 * @typedef {JSX.Element} CurrentColorIcon
 */

/**
 * The TipCard component allows you to show and highlight some information
 * @param {object} props
 * @param {string} [props.tittle = "info"]
 * @param {string} props.children
 * @param {CurrentColorIcon} [props.Icon = WarningIcon]
 * @param {Array<string>} [props.classArr =[]] A list of CSS classes to apply to the component
 * @returns {JSX.Element}
 */
function TipCard({
  tittle = "info",
  children,
  Icon = WarningIcon,
  classArr = [],
}) {
  return (
    <div className={reduceToClassName([...classArr, css.main, baseCSS.main])}>
      <header className={css.header}>
        <Icon className={css.icon}></Icon>
        {tittle}
      </header>
      <div className={css.tip}>{children}</div>
    </div>
  );
}

export default TipCard;

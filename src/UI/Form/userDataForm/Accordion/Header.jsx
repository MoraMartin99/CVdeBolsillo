import VisibilityIcon from "../../../../assets/images/leftArrow.svg?react";
import { reduceToClassName } from "../../../../utils";
import css from "./Header.module.css";

/**
 * This callbacks runs on click events
 * @callback onClickCallback
 */

/**
 * The Header component lets you create a header that works with parents that uses the [useAccordion hook]{@link module:useAccordion~useAccordion}
 * @param {object} props The component properties
 * @param {string} props.children The title of the header
 * @param {CurrentColorIcon} [props.Icon] The icon component that represents the component
 * @param {Object} [props.style = {}] An object that sets the inline style
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {onClickCallback} props.onClick The function that runs on click events
 * @param {boolean} props.isExpanded If truthy rotates the visibility icon to represents that the parent component has been expanded, if falsy represents the opposite
 *
 *  @returns {JSX.Element}
 */
function Header({
  children,
  Icon,
  style = {},
  classArr = [],
  isExpanded,
  onClick,
}) {
  return (
    <header
      style={style}
      className={reduceToClassName([css.container, ...classArr])}
      onClick={onClick}
      data-testid="header"
    >
      <button type="button" className={css.button}>
        {Icon ? <Icon className={css.mainIcon}></Icon> : null}
        <span className={css.text}>{children}</span>
        {
          <VisibilityIcon
            data-testid="visibilityIcon"
            className={reduceToClassName([
              css.visibilityIcon,
              isExpanded ? css.expanded : "",
            ])}
          ></VisibilityIcon>
        }
      </button>
    </header>
  );
}

export default Header;

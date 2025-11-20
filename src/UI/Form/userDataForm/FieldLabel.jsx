import css from "./FieldLabel.module.css";
import { reduceToClassName } from "../../../utils";

/**@module FieldLabel */

/**
 * The FieldLabel component
 * @param {object} props The component properties
 * @param {string} props.children The text
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {string} props.htmlFor The [for]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/for} attribute of the label tag
 * @returns {JSX.Element}
 */
function FieldLabel({ children, classArr = [], htmlFor }) {
  return (
    <label
      className={reduceToClassName([...classArr, css.main])}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}
export default FieldLabel;

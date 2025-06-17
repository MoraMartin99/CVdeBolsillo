import { reduceToClassName } from "../../utils";
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
  onClick,
  isDisable = false,
  style: initialStyle = {},
}) {
  return (
    <button
      disabled={isDisable}
      className={reduceToClassName(classArr)}
      onClick={onClick}
      style={{ ...initialStyle }}
    >
      {children}
    </button>
  );
}

export default BaseButton;

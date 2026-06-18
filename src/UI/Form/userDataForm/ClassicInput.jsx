import { useEffect, useRef } from "react";
import { reduceToClassName } from "../../../utils";
import css from "./input.module.css";

/**@module ClassicInput */

/**
 *  A function that runs on change events
 * @callback onChange
 * @param {object} Event
 */

/**
 *  A function that runs on click events
 * @callback onClick
 * @param {object} Event
 */

/**
 * The ClassicInput component
 * @param {object} props The component properties
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {string} props.value The [value attribute]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#value}
 * @param {"email"|"number"|"tel"|"text"|"url"} [props.type = "text"] A subset of the [type attribute]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#type}
 * @param {string} props.id An identifier
 * @param {string} props.placeholder The [placeholder attribute]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#placeholder}
 * @param {boolean} [props.isReadOnly = false] The [readonly attribute]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#readonly}
 * @param {onChange} props.onChange A function that runs on change events
 * @param {onClick} props.onClick A function that runs on click events
 * @param {boolean} [props.isInvalid = false] if true sets the component as invalid, if false sets the component as valid. It uses the Constraint Validation API
 * @param {string} props.tip A message to the user that clarifies the constraints that makes a value valid. It has to be set in order to use the Constraint Validation API
 * @returns {JSX.Element}
 */
function ClassicInput({
  classArr = [],
  value,
  type = "text",
  id,
  placeholder,
  isReadOnly = false,
  onChange,
  onClick,
  isInvalid = false,
  tip,
}) {
  const inputRef = useRef(null);
  const hadFocusRef = useRef(false);

  const onFirstBlur = () => {
    if (hadFocusRef.current) return;
    hadFocusRef.current = true;
    onChange({ target: inputRef.current });
  };

  useEffect(() => {
    const errorMessage = isInvalid && hadFocusRef.current ? tip : "";
    inputRef.current.setCustomValidity(errorMessage);
  }, [isInvalid, tip]);

  return (
    <input
      {...{
        className: reduceToClassName([...classArr, css.main]),
        value,
        type,
        id,
        placeholder,
        readOnly: isReadOnly,
        onChange,
        ref: inputRef,
        onBlur: onFirstBlur,
        onClick,
      }}
    ></input>
  );
}

export default ClassicInput;

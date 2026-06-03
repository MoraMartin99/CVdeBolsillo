import ClassicInput from "../ClassicInput";
import BaseButton from "../../../BaseButton/BaseButton";
import { reduceToClassName } from "../../../../utils";
import TrashIcon from "../../../../assets/images/trashIcon.svg?react";
import css from "./ListInput.module.css";

/**
 *  A function that runs on change events
 * @callback onChange
 * @param {object} Event
 */

/**
 *  A function that runs on primary button clicks
 * @callback onPrimaryActionClick
 * @param {object} Event
 */

/**
 * The ListInput component
 * @param {object} props The component properties
 * @param {string} props.value
 * @param {onChange} props.onChange A function that runs on change events
 * @param {string} props.id An identifier
 * @param {string} props.placeholder The [placeholder attribute]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#placeholder}
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {onPrimaryActionClick} props.onPrimaryActionClick
 * @returns @returns {JSX.Element}
 */
function ListInput({
  value,
  onChange,
  id,
  placeholder,
  classArr = [],
  onPrimaryActionClick,
}) {
  return (
    <div className={reduceToClassName([...classArr, css.main])}>
      <ClassicInput
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
      ></ClassicInput>
      <BaseButton
        onClick={onPrimaryActionClick}
        Icon={<TrashIcon className={css.icon}></TrashIcon>}
        classArr={[css.button]}
      ></BaseButton>
    </div>
  );
}

export default ListInput;

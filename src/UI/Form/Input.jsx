import styles from "./Input.module.css";
import { reduceToClassName } from "../../utils";
import MonthAndYearIcon from "../../assets/images/calendarIcon.svg?react";

/**
 * A callback that runs on the value of the input and validates that is valid
 * @callback onValidation
 * @param {*} value The value of an Input component
 * @return {Boolean} true if value is valid, false if not
 */

/**
 * A callback that runs if the value change and is valid
 * @callback onChange
 * @param {string} id An identifier of the component
 * @param {*} value The value of the input/s
 */

/**
 * The Input component lets you create a variety of inputs
 * @memberof module:Form
 * @param {object} prop The component properties
 * @param {string} prop.id An identifier of the component use in the input element attribute
 * @param {"monthAndYear"|"email"|"image"|"number"|"tel"|"text"|"url"|"item"|"radio"|"range"} [prop.type = "text"] The type of input
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {object} [prop.attributes = {}] An object that sets the input attributes defined in the [react input component props]{@link https://react.dev/reference/react-dom/components/input#input} excluding the type
 * @param {onValidation} [prop.onValidation] A callback that runs on the value and validates that is valid
 * @param {onChange} prop.onChange A callback that runs if the value change and is valid
 * @returns {JSX.Element}
 */
function Input({
  id,
  type = "text",
  classArr = [],
  attributes,
  onValidation,
  onChange,
}) {
  const MONTHANDYEARTYPE = "monthAndYear";
  /* const input = (
    <input
      className={reduceToClassName([styles.base, styles[type], ...classArr])}
      id={id}
      {...{ ...attributes, type }}
    />
  );

  switch (true) {
    case type === MONTHANDYEARTYPE:
      return (
        <div>
          {input}
          <MonthAndYearIcon
            className={styles.monthAndYearIcon}
          ></MonthAndYearIcon>
        </div>
      );
    default:
      return input;
  } */

  return (
    <div className={styles.inputContainer}>
      <input
        className={reduceToClassName([styles.base, styles[type], ...classArr])}
        id={id}
        {...{ ...attributes, type }}
      />
      {type === MONTHANDYEARTYPE ? (
        <MonthAndYearIcon
          className={styles.monthAndYearIcon}
        ></MonthAndYearIcon>
      ) : undefined}
    </div>
  );
}

export default Input;

import { reduceToClassName } from "../../../utils";
import css from "./RadioField.module.css";

/**
 * The text show in the current badge
 */
const currentBadgeText = "Plantilla actual";

/**
 * The name attribute of the input radios
 * @type {string}
 */
const name = crypto.randomUUID();

/**
 * @typedef {object} option
 * @property {string} id
 * @property {string} thumbnail A path to an image
 * @property {string} label
 */

/**
 * A function run on change events of the inputs
 * @callback onChange
 * @param {string} value The selected option id
 */

/**
 * The RadioField component allows you to capture a user selected option from a list of options
 * @param {object} props
 * @param {Array<option>} props.options
 * @param {string} [props.value = options[0].id] An option id
 * @param {onChange} props.onChange
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @returns {JSX.Element}
 */
function RadioField({
  options = [],
  value = options[0].id,
  onChange,
  classArr = [],
}) {
  const addIsCurrent = (option) => {
    return {
      ...option,
      isCurrent: value === option.id,
    };
  };

  const addName = (option) => ({ ...option, name });

  const onRadioSelection = ({ target: { value: radioValue } }) => {
    if (radioValue !== value) onChange(radioValue);
  };

  const addOnRadioSelection = (option) => {
    return { ...option, onRadioSelection };
  };

  const buildRadio = (option) => {
    return (
      <div key={option.id}>
        <input
          onChange={option.onRadioSelection}
          id={option.id}
          type="radio"
          value={option.id}
          name={option.name}
          checked={option.isCurrent}
          className={css.input}
        ></input>
        <label htmlFor={option.id} className={css.label}>
          <div className={css.thumbnailContainer}>
            <img className={css.thumbnail} src={option.thumbnail}></img>
            {option.isCurrent ? (
              <span className={css.currentBadge}>{currentBadgeText}</span>
            ) : undefined}
          </div>
          {option.label}
        </label>
      </div>
    );
  };

  return (
    <fieldset className={reduceToClassName([...classArr, css.main])}>
      {options
        .map(addIsCurrent)
        .map(addName)
        .map(addOnRadioSelection)
        .map(buildRadio)}
    </fieldset>
  );
}

export default RadioField;

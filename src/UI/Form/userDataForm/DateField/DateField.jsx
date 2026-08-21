import FieldLabel from "../FieldLabel";
import DateInput from "../DateInput";
import { isEqual } from "lodash";
import { reduceToClassName } from "../../../../utils";
import baseCSS from "../field.module.css";
import css from "./DateField.module.css";

/**
 * @typedef {object} dateValue The value of the MonthYearControl component
 * @property {number} month A number from 1 - 12 that represents the corresponding month
 * @property {number} year A valid year
 */

/**
 * @typedef {object} currentlyValue The value of the MonthYearControl component
 * @property {Boolean} isCurrently If true it represents that the "currently" option was selected, if false represents the opposite
 */

/**
 * @typedef {object} value
 * @property {dateValue|currentlyValue} start
 * @property {dateValue|currentlyValue} finish
 */

/**
 * A function that report data changes to the form model
 * @callback submitData
 * @param {string} id The id of the component
 * @param {object} data The properties to change
 */

/**
 * The DateField is a field that collects dates
 * @param {object} props
 * @param {string} [props.label = "Fecha"]
 * @param {number} [props.finishYear = new Date().getFullYear()] The last value of the year selector interface
 * @param {number} [props.startYear = finishYear - 80] The first value of the year selector interface
 * @param {value} [props.value = { month: 1, year: finishYear }]
 * @param {string} props.id An identifier
 * @param {submitData} props.submitData
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {boolean} props.allowCurrentlyOption If true renders a checkbox that allow the user to report "currently" as the component value
 * @returns {JSX.Element}
 */
function DateField({
  label = "Fecha",
  finishYear = new Date().getFullYear(),
  startYear = finishYear - 80,
  value = { month: 1, year: finishYear },
  id,
  submitData,
  classArr = [],
  allowCurrentlyOption,
}) {
  const onChange = (date) => {
    if (!isEqual(date, value)) submitData(id, { value: date });
  };

  return (
    <div className={reduceToClassName([...classArr, baseCSS.main, css.main])}>
      <FieldLabel classArr={[css.label]} htmlFor={id}>
        {label}
      </FieldLabel>
      <DateInput
        id={id}
        value={value}
        onChange={onChange}
        startYear={startYear}
        finishYear={finishYear}
        allowCurrentlyOption={allowCurrentlyOption}
      ></DateInput>
    </div>
  );
}

export default DateField;

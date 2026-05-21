import baseCSS from "./field.module.css";
import css from "./DateRangeField.module.css";
import FieldLabel from "./FieldLabel";
import { reduceToClassName } from "../../../utils";
import DateInput from "./DateInput";
import { useCallback } from "react";
import { isEqual } from "lodash";

const defaultFinishYear = new Date().getFullYear();
const getDefaultValue = (defaultYear) => {
  const setEntry = (key) => [key, { month: 1, year: defaultYear }];
  return Object.fromEntries(["start", "finish"].map(setEntry));
};

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
 * The DateRangeField is a field that collects date ranges
 * @param {object} props
 * @param {string} props.id An identifier
 * @param {string} [props.startLabel = "Desde"] The label for the start date input
 * @param {string} [props.finishLabel = "Hasta"] The label for the finish date input
 * @param {number} [props.finishYear = defaultFinishYear] The last value of the year selector interface
 * @param {number} [props.startYear = finishYear - 80] The first value of the year selector interface
 * @param {value} [props.value = getDefaultValue(finishYear)]
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {submitData} props.submitData
 * @returns {JSX.Element}
 */
function DateRangeField({
  id,
  startLabel = "Desde",
  finishLabel = "Hasta",
  finishYear = defaultFinishYear,
  startYear = finishYear - 80,
  value = getDefaultValue(finishYear),
  classArr = [],
  submitData,
}) {
  const startInputId = id + "StartInput";
  const finishInputId = id + "FinishInput";

  const onStartDateChange = useCallback(
    (start) => {
      if (isEqual(start, value["start"])) return;
      if (start.isCurrently) {
        return submitData(id, { value: { start, finish: start } });
      }
      submitData(id, { value: { ...value, start } });
    },
    [id, submitData, value],
  );

  const onFinishDateChange = useCallback(
    (finish) => {
      if (isEqual(finish, value["finish"])) return;
      submitData(id, { value: { ...value, finish } });
    },
    [id, submitData, value],
  );

  return (
    <div className={reduceToClassName([...classArr, baseCSS.main, css.main])}>
      <FieldLabel classArr={[css.label, css.startLabel]} htmlFor={startInputId}>
        {startLabel}
      </FieldLabel>
      <DateInput
        id={startInputId}
        value={value.start}
        onChange={onStartDateChange}
        classArr={[css.startControl]}
        startYear={startYear}
        finishYear={finishYear}
      ></DateInput>
      <FieldLabel
        classArr={[css.label, css.finishLabel]}
        htmlFor={finishInputId}
      >
        {finishLabel}
      </FieldLabel>
      <DateInput
        id={finishInputId}
        value={value.finish}
        onChange={onFinishDateChange}
        classArr={[css.finishControl]}
        startYear={startYear}
        finishYear={finishYear}
      ></DateInput>
    </div>
  );
}

export default DateRangeField;

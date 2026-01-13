import css from "./MonthYearControl.module.css";
import TileSelector from "./TileSelector";
import CloseButton from "./CloseButton";
import { reduceToClassName } from "../../utils";
import { useEffect, useState } from "react";
import months from "../../months";
/**
 * @module MonthYearControl
 */

/**
 * A callback that runs if the value change and is valid
 * @callback onChange
 * @param {string} id An identifier of the component
 * @param {*} value The value of the input/s
 */

/**
 * A callback that runs on closeButton click
 * @callback onCloseButtonClick
 */

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
 * The MonthYearControl component lets you indicate a month and year (and optionally the "currently" value) using a GUI
 * @param {object} props The component properties
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {(dateValue|currentlyValue)} [props.value = {month: 1, year: new Date().getFullYear()}] The value of the component
 * @param {onChange} props.onChange A callback that runs if the value change and is valid
 * @param {number} [props.firstYear = new Date().getFullYear() - 120] The first value of the year selector interface
 * @param {number} [props.lastYear = new Date().getFullYear()] The last value of the year selector interface
 * @param {boolean} [props.allowCurrentlyOption = true] If true display the currently checkbox, if false the opposite
 * @param {boolean} [props.isDisable = false] If truthy sets the component as readonly, if falsy sets the opposite
 * @param {onCloseButtonClick} props.onCloseButtonClick A callback that runs on closeButton click
 * @param {Object} [props.style = {}] An object that sets the inline style
 * @returns {JSX.Element}
 */
function MonthYearControl({
  classArr = [],
  value: initialValue = { month: 1, year: new Date().getFullYear() },
  onChange,
  firstYear = new Date().getFullYear() - 60,
  lastYear = new Date().getFullYear(),
  allowCurrentlyOption = true,
  isDisable = false,
  onCloseButtonClick,
  style = {},
}) {
  const [value, setValue] = useState(initialValue);
  const isCurrently = Boolean(value.isCurrently);
  const { month, year } = value;

  const years = Array.from(
    { length: lastYear - firstYear + 1 },
    (_, index) => ({
      value: firstYear + index,
      label: firstYear + index,
      key: firstYear + index,
    }),
  );

  const getIndexByValue = (list, item) => {
    return list.findIndex(({ value }) => value === item);
  };

  const monthSetter = (month) => {
    if (value.month !== month) setValue(({ year }) => ({ year, month }));
  };
  const yearSetter = (year) => {
    if (value.year !== year) setValue(({ month }) => ({ month, year }));
  };
  const onInputChange = (e) => {
    const isChecked = Boolean(e.target.checked);

    if (isChecked) {
      setValue({ isCurrently: isChecked });
    } else {
      setValue(() => ({}));
    }
  };

  useEffect(() => {
    const entries = Object.entries(value).filter(([, value]) => value != null);
    const data = Object.fromEntries(entries);
    if (!entries.length) return;
    onChange(data);
  }, [onChange, value]);

  return (
    <div
      data-testid="MonthYearControl"
      className={reduceToClassName([css.main, ...classArr])}
      style={style}
    >
      <CloseButton
        classArr={[css.closeButton]}
        onClick={onCloseButtonClick}
      ></CloseButton>
      <TileSelector
        itemArr={months}
        isDisable={isDisable || isCurrently}
        onChange={monthSetter}
        currentIndex={getIndexByValue(months, month)}
        label="Mes"
        classArr={[css.selector]}
      ></TileSelector>
      <TileSelector
        itemArr={years}
        isDisable={isDisable || isCurrently}
        onChange={yearSetter}
        currentIndex={getIndexByValue(years, year)}
        label="Año"
        classArr={[css.selector]}
      ></TileSelector>
      {allowCurrentlyOption ? (
        <label className={css.checkBox}>
          <input
            onChange={onInputChange}
            type="checkbox"
            checked={isCurrently}
            disabled={isDisable}
          />
          <span>Actualidad</span>
        </label>
      ) : undefined}
    </div>
  );
}

export default MonthYearControl;

import css from "./MonthYearControl.module.css";
import TileSelector from "./TileSelector";
import CloseButton from "./CloseButton";
import { reduceToClassName } from "../../utils";
import { useEffect, useState } from "react";
import months from "../../months";
/**
 * @module MonthYearControl
 */

const defaultFinishYear = new Date().getFullYear();

/**
 * getDefaultStartYear
 * @param {number} [finishYear = defaultFinishYear]
 * @returns {number}
 */
const getDefaultStartYear = (finishYear = defaultFinishYear) => {
  return finishYear - 60;
};

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
 * @param {(dateValue|currentlyValue)} [props.value = {month: months[0].value, finishYear}] The value of the component
 * @param {onChange} props.onChange A callback that runs if the value change and is valid
 * @param {number} [props.startYear = getDefaultStartYear(props.finishYear)] The first value of the year selector interface
 * @param {number} [props.finishYear = defaultFinishYear] The last value of the year selector interface
 * @param {boolean} [props.allowCurrentlyOption = true] If true display the currently checkbox, if false the opposite
 * @param {boolean} [props.isDisable = false] If truthy sets the component as readonly, if falsy sets the opposite
 * @param {onCloseButtonClick} props.onCloseButtonClick A callback that runs on closeButton click
 * @param {Object} [props.style = {}] An object that sets the inline style
 * @param {boolean} [props.isInView = true] If true represents that the component is expected to be visible, if false represents the opposite. This property does not sets the visibility state of the component.
 * @returns {JSX.Element}
 */
function MonthYearControl({
  classArr = [],
  finishYear = defaultFinishYear,
  startYear = getDefaultStartYear(finishYear),
  value: { month: monthProp, year: yearProp, isCurrently: isCurrentlyProp } = {
    month: 1,
    year: finishYear,
  },
  onChange,
  allowCurrentlyOption = true,
  isDisable = false,
  onCloseButtonClick,
  style = {},
  isInView = true,
}) {
  const [month, setMonth] = useState(monthProp);
  const [year, setYear] = useState(yearProp);
  const [isCurrently, setIsCurrently] = useState(Boolean(isCurrentlyProp));

  const years = Array.from(
    { length: finishYear - startYear + 1 },
    (_, index) => ({
      value: startYear + index,
      label: startYear + index,
      key: startYear + index,
    }),
  );

  const getIndexByValue = (list, item) => {
    return list.findIndex(({ value }) => value === item);
  };

  const onMonthChange = (month) => {
    const stateSetter = (currentValue) => {
      return currentValue === month ? currentValue : month;
    };
    setMonth(stateSetter);
  };

  const onYearChange = (year) => {
    const stateSetter = (currentValue) => {
      return currentValue === year ? currentValue : year;
    };
    setYear(stateSetter);
  };

  const onIsCurrentlyChange = (value) => {
    const isCurrently = Boolean(value);
    const stateSetter = (currentValue) => {
      return currentValue === isCurrently ? currentValue : isCurrently;
    };
    setIsCurrently(stateSetter);
  };

  const onInputChange = (e) => {
    const isChecked = e.target.checked;
    onIsCurrentlyChange(isChecked);
  };

  useEffect(() => {
    if (isCurrently) {
      onChange({ isCurrently });
    } else {
      onChange({ month, year });
    }
  }, [isCurrently, month, onChange, year]);

  useEffect(() => {
    onMonthChange(monthProp);
    onYearChange(yearProp);
    onIsCurrentlyChange(isCurrentlyProp);
  }, [monthProp, yearProp, isCurrentlyProp]);

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
        items={months}
        isDisable={isDisable || isCurrently}
        onChange={onMonthChange}
        currentIndex={getIndexByValue(months, month)}
        label="Mes"
        classArr={[css.selector]}
        isInView={isInView}
      ></TileSelector>
      <TileSelector
        items={years}
        isDisable={isDisable || isCurrently}
        onChange={onYearChange}
        currentIndex={getIndexByValue(years, year)}
        label="Año"
        classArr={[css.selector]}
        isInView={isInView}
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

import baseCSS from "./input.module.css";
import css from "./DateInput.module.css";
import MonthYearControl from "../../MonthYearControl/MonthYearControl";
import months from "../../../months";
import { reduceToClassName } from "../../../utils";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import CalendarIcon from "../../../assets/images/calendarIcon.svg?react";

/**@module DateInput */

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
 * A callback that runs if the value change
 * @callback onChange
 * @param {*} value The value of the component
 */

/**
 * The DateInput component allows you to enter dates using a date picker
 * @param {object} props
 * @param {string}  props.id An identifier
 * @param {(dateValue|currentlyValue)} [props.value] The value of the component
 * @param {onChange} props.onChange
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {number} [props.startYear] The first value of the year selector interface
 * @param {number} [props.finishYear] The last value of the year selector interface
 * @param {boolean} props.allowCurrentlyOption If true renders a checkbox that allow the user to report "currently" as the component value
 * @returns {JSX.Element}
 */
function DateInput({
  id,
  value = {},
  onChange,
  classArr = [],
  startYear,
  finishYear,
  allowCurrentlyOption,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const getInputText = () => {
    const getMonthLabel = ({ value: item }) => item === value.month;
    return value.isCurrently
      ? "Actualmente"
      : `${months.find(getMonthLabel).label}/${value.year}`;
  };

  const closeControl = () => setIsOpen(false);

  const showControl = () => setIsOpen(true);

  const onOutsideClick = () => closeControl();

  const onCloseButtonClick = () => closeControl();

  return (
    <div className={reduceToClassName([...classArr, css.main])}>
      <div
        className={reduceToClassName([baseCSS.main, css.display])}
        onClick={showControl}
      >
        <span className={css.text}>{getInputText()}</span>
        <CalendarIcon className={css.icon}></CalendarIcon>
        <input type="text" className={css.hide} id={id}></input>
      </div>
      <Modal onOutsideClick={onOutsideClick} isOpen={isOpen}>
        <MonthYearControl
          onCloseButtonClick={onCloseButtonClick}
          value={value}
          onChange={onChange}
          startYear={startYear}
          finishYear={finishYear}
          isInView={isOpen}
          allowCurrentlyOption={allowCurrentlyOption}
        ></MonthYearControl>
      </Modal>
    </div>
  );
}

export default DateInput;

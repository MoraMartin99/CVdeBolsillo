import Button from "../Button/Button";
import styles from "./TileSelector.module.css";
import DecreaseIcon from "../../assets/images/fillArrowUp.svg?react";
import IncreaseIcon from "../../assets/images/fillArrowDown.svg?react";
import { reduceToClassName } from "../../utils";
/**
 * A callback that runs if the value change and is valid AAAA
 * @memberof module:MonthYearControl
 * @callback onChange
 * @param {string} id An identifier of the component
 * @param {*} value The value of the input/s
 */

/**
 * @memberof module:MonthYearControl
 * @typedef {object} item An object that represents an option and is required to build a tile
 * @property {*} value The value of the item
 * @property {string|number} [label] A text to display in the corresponding tile
 */

/**
 *The TileSelector component lets you create a slidable interface to select a value represented as a tile
 @memberof module:MonthYearControl
 * @param {object} props The component properties
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {Array<item>} [props.itemArr = []] A list of items to display as tiles
 * @param {number} [props.currentIndex = 0] The index of the current tile
 * @param {onChange} props.onChange A callback that runs if the value change and is valid
 * @param {boolean} [props.isDisable = false] If true sets the component as readonly, if false sets the opposite
 * @param {3|5} [visibleTiles = 5] The total number of tiles that are visible to the user
 */
function TileSelector({
  label,
  classArr = [],
  itemArr = [],
  currentIndex = 0,
  onChange,
  isDisable = false,
  visibleTiles = 5,
}) {
  const tileMapper = ({ label }, index) => {
    return (
      <li
        onClick={(e) => {
          e.currentTarget.classList.toggle(styles.current);
        }}
        data-index={index}
        className={styles.tile}
      >
        {label}
      </li>
    );
  };
  return (
    <div
      className={reduceToClassName([
        "TileSelector",
        styles.TileSelector,
        isDisable ? styles.disable : "",
        ...classArr,
      ])}
    >
      <div className={reduceToClassName(["TileControl", styles.TileControl])}>
        <Button classArr={[styles.Button]} Icon={DecreaseIcon}></Button>
        <ol className={styles.tileContainer}>{itemArr.map(tileMapper)}</ol>
        <Button classArr={[styles.Button]} Icon={IncreaseIcon}></Button>
      </div>
      {label ? <p className={styles.label}>{label}</p> : undefined}
    </div>
  );
}

export default TileSelector;

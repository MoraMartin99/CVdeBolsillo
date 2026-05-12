import { useEffect, useRef } from "react";
import { reduceToClassName } from "../../utils";
import css from "./Tile.module.css";
import BaseButton from "../BaseButton/BaseButton";

/**
 * A function that sets how the tile must move on click events
 * @memberof module:MonthYearControl
 * @callback moveHandler
 * @param {MouseEvent}
 */

/**
 * The Tile components represents a selectable item of [TileSelector]{@link module:MonthYearControl~TileSelector}
 * @memberof module:MonthYearControl
 * @param {object} props The component properties
 * @param {string} props.children The component label
 * @param {number} props.index The component index relative to its siblings. It starts from zero (0)
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {boolean} [props.isDisable = false] If true the component displays a special style and doesn't handle click events
 * @param {boolean} [props.isCurrent = false] If true sets the component as current, displaying a special style and moving the component to the trigger area of [TileSelector]{@link module:MonthYearControl~TileSelector} if require
 * @param {moveHandler} props.moveHandler
 * @returns {JSX.Element}
 */
function Tile({
  children,
  index,
  classArr = [],
  isDisable = false,
  isCurrent = false,
  moveHandler,
}) {
  const tileRef = useRef(null);

  useEffect(() => {
    const target = tileRef.current;
    if (isCurrent && target && !isDisable) target.click();
  }, [isCurrent, isDisable]);

  const cssClases = [
    css.button,
    isDisable ? css.disable : "",
    isCurrent ? css.current : "",
  ];

  return (
    <li
      ref={tileRef}
      data-index={index}
      className={reduceToClassName([...classArr, css.main])}
      onClick={moveHandler}
    >
      <BaseButton classArr={cssClases} isDisable={isDisable}>
        {children}
      </BaseButton>
    </li>
  );
}

export default Tile;

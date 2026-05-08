import { useEffect, useRef } from "react";
import { reduceToClassName } from "../../utils";
import css from "./Tile.module.css";
import BaseButton from "../BaseButton/BaseButton";
import useIsInitialRender from "../../hooks/useIsInitialRender";

const defaultOption = { behavior: "smooth", block: "center" };
const instantOption = { behavior: "instant", block: "center" };

/**
 * The Tile components represents a selectable item of [TileSelector]{@link module:MonthYearControl~TileSelector}
 * @memberof module:MonthYearControl
 * @param {object} props The component properties
 * @param {string} props.children The component label
 * @param {number} props.index The component index relative to its siblings. It starts from zero (0)
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {boolean} [props.isDisable = false] If true the component displays a special style and doesn't handle click events
 * @param {boolean} [props.isCurrent = false] If true sets the component as current, displaying a special style and moving the component to the trigger area of [TileSelector]{@link module:MonthYearControl~TileSelector} if require
 * @returns {JSX.Element}
 */
function Tile({
  children,
  index,
  classArr = [],
  isDisable = false,
  isCurrent = false,
}) {
  const isInitialRender = useIsInitialRender();
  const tileRef = useRef(null);
  const buttonRef = useRef(null);

  const defaultMove = () => {
    tileRef.current.scrollIntoView(defaultOption);
  };
  const instantMove = () => {
    tileRef.current.scrollIntoView(instantOption);
  };

  const onClick = () => {
    if (isInitialRender.current) return instantMove();
    defaultMove();
  };

  useEffect(() => {
    const target = buttonRef.current;
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
    >
      <BaseButton
        ref={buttonRef}
        classArr={cssClases}
        onClick={onClick}
        isDisable={isDisable}
      >
        {children}
      </BaseButton>
    </li>
  );
}

export default Tile;

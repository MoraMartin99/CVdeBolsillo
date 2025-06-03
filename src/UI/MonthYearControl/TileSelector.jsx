import Button from "../Button/Button";
import styles from "./TileSelector.module.css";
import DecreaseIcon from "../../assets/images/fillArrowUp.svg?react";
import IncreaseIcon from "../../assets/images/fillArrowDown.svg?react";
import { reduceToClassName } from "../../utils";
import { useEffect, useRef } from "react";
/**
 * A callback that runs if the value change and is valid
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
 * @param {Array<item>} props.itemArr A list of items to display as tiles
 * @param {number} [props.currentIndex = 0] The index of the current tile
 * @param {onChange} props.onChange A callback that runs if the value change and is valid
 * @param {boolean} [props.isDisable = false] If true sets the component as readonly, if false sets the opposite
 * @param {3|5} [visibleTiles = 5] The total number of tiles that are visible to the user
 */
function TileSelector({
  label,
  classArr = [],
  itemArr,
  currentIndex = 0,
  onChange,
  isDisable = false,
  visibleTiles = 5,
}) {
  const requiredProps = { itemArr, onChange };
  const hasAllRequiredProps = Object.values(requiredProps).every(
    (item) => item,
  );
  const getErrorMessage = () => {
    const filter = ([, value]) => !value;
    const list = Object.entries(requiredProps).filter(filter);
    const reducer = (total, [key], index, arr) => {
      const lastIndex = arr.length - 1;
      if (index === 0 && index !== lastIndex) return `${key} prop`;
      if (index === 0 && index === lastIndex) return `${key} prop was omitted`;
      if (index > 0 && index !== lastIndex) return `${total}, ${key} prop`;
      return `${total} and ${key} prop were omitted`;
    };
    return list.reduce(reducer, "");
  };
  if (!hasAllRequiredProps) throw new TypeError(getErrorMessage());

  const tileContainerRef = useRef(null);
  const MIN_TILE_INDEX = 0;
  const MAX_TILE_INDEX = itemArr.length - 1;
  const tileMarginMultiplier = (visibleTiles - 1) / 2;

  const getIndex = (element) => Number(element.getAttribute("data-index"));
  const getBoundedIndex = (index) => {
    return index < MIN_TILE_INDEX
      ? MIN_TILE_INDEX
      : index > MAX_TILE_INDEX
        ? MAX_TILE_INDEX
        : index;
  };

  const setCurrentTile = (element) => {
    const index = getIndex(element);
    element.classList.add(styles.current);
    onChange(itemArr[index].value);
  };

  const scrollTo = (target) => {
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const tileMapper = ({ label, key }, index) => {
    const onClick = ({ target }) => scrollTo(target);

    return (
      <li
        key={key}
        onClick={isDisable ? undefined : onClick}
        data-index={index}
        className={styles.tile}
      >
        {label}
      </li>
    );
  };

  const getElementBy = (filterCallback) => {
    return Array.from(tileContainerRef.current.children).filter(
      filterCallback,
    )[0];
  };

  const getCurrentElement = () => {
    const filter = (item) => item.classList.contains(styles.current);
    return getElementBy(filter);
  };

  const getElementByIndex = (index) => {
    const filter = (item) => getIndex(item) === index;
    return getElementBy(filter);
  };

  const nextTile = () => {
    scrollTo(Object(getCurrentElement()).nextElementSibling);
  };

  const previousTile = () => {
    scrollTo(Object(getCurrentElement()).previousElementSibling);
  };

  useEffect(() => {
    const margin = ` -${(tileMarginMultiplier * 100) / visibleTiles}%`;
    const options = {
      root: tileContainerRef.current,
      rootMargin: `${margin} 0px ${margin}`,
      threshold: 0.95,
    };
    const callback = (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        isIntersecting && !isDisable
          ? setCurrentTile(target)
          : target.classList.remove(styles.current);
      });
    };

    const observer = new IntersectionObserver(callback, options);
    Array.from(tileContainerRef.current.children).forEach((item) =>
      observer.observe(item),
    );

    scrollTo(getElementByIndex(getBoundedIndex(currentIndex)));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      data-testid="parent"
      style={{
        "--visibleTiles": visibleTiles,
        "--tileMarginMultiplier": tileMarginMultiplier,
      }}
      className={reduceToClassName([
        "TileSelector",
        styles.TileSelector,
        isDisable ? styles.disable : "",
        ...classArr,
      ])}
    >
      <div className={reduceToClassName(["TileControl", styles.TileControl])}>
        <Button
          classArr={[
            styles.Button,
            styles.previousTileButton,
            "previousTileButton",
          ]}
          Icon={DecreaseIcon}
          onClick={previousTile}
          disabled={isDisable}
        ></Button>
        <ol ref={tileContainerRef} className={styles.tileContainer}>
          {itemArr.map(tileMapper)}
        </ol>
        <Button
          classArr={[styles.Button, styles.nextTileButton, "nextTileButton"]}
          Icon={IncreaseIcon}
          onClick={nextTile}
          disabled={isDisable}
        ></Button>
      </div>
      {label ? <p className={styles.label}>{label}</p> : undefined}
    </div>
  );
}

export default TileSelector;

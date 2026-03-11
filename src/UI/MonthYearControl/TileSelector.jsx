import NavigationButton from "./NavigationButton";
import styles from "./TileSelector.module.css";
import { reduceToClassName } from "../../utils";
import { useCallback, useEffect, useRef } from "react";
import { Debouncer } from "../../utils";

const scrollDelay = 150;

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
 * @property {string|number} label A text to display in the corresponding tile
 */

/**
 *The TileSelector component lets you create a slidable interface to select a value represented as a tile
 @memberof module:MonthYearControl
 * @param {object} props The component properties
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {Array<item>} props.items A list of items to display as tiles
 * @param {number} [props.currentIndex = 0] The index of the current tile
 * @param {onChange} props.onChange A callback that runs if the value change and is valid and id isDisable prop changes from true to false
 * @param {boolean} [props.isDisable = false] If true sets the component as readonly, if false sets the opposite
 * @param {3|5} [props.visibleTiles = 5] The total number of tiles that are visible to the user
 *  @param {boolean} [props.isInView = true] If true represents that the component is expected to be visible, if false represents the opposite. This property does not sets the visibility state of the component.
 */
function TileSelector({
  label,
  classArr = [],
  items,
  currentIndex = 0,
  onChange,
  isDisable = false,
  visibleTiles = 5,
  isInView = true,
}) {
  const tileContainerRef = useRef(null);
  const tileMarginMultiplier = (visibleTiles - 1) / 2;

  const getIndex = (element) => Number(element.getAttribute("data-index"));

  const getTiles = () => {
    const tileContainer = tileContainerRef.current;
    return tileContainer ? [...tileContainer.children] : [];
  };

  const scrollTo = useCallback(
    (target, options = { behavior: "smooth", block: "center" }) => {
      if (target) target.scrollIntoView(options);
    },
    [],
  );

  const createTile = ({ label, key }, index) => {
    const onClick = ({ target }) => {
      if (!isDisable) scrollTo(target);
    };

    return (
      <li
        key={key}
        onClick={onClick}
        data-index={index}
        className={styles.tile}
      >
        {label}
      </li>
    );
  };

  const getElementBy = useCallback(
    (filterCallback) => getTiles().find(filterCallback),
    [],
  );

  const getCurrentElement = useCallback(() => {
    const filter = (item) => item.classList.contains(styles.current);
    return getElementBy(filter);
  }, [getElementBy]);

  const nextTile = () => {
    const currentTile = getCurrentElement();
    if (isDisable || !currentTile) return;

    scrollTo(currentTile.nextElementSibling);
  };

  const previousTile = () => {
    const currentTile = getCurrentElement();
    if (isDisable || !currentTile) return;

    scrollTo(currentTile.previousElementSibling);
  };

  const setTileAsCurrent = useCallback(
    (target) => {
      const removeClass = (target) => {
        target.classList.remove(styles.current);
      };
      getTiles().forEach(removeClass);
      target.classList.add(styles.current);
      const index = getIndex(target);
      onChange(items[index].value);
    },
    [items, onChange],
  );

  const getElementByIndex = useCallback(
    (index) => {
      const boundedIndex = Math.min(Math.max(index, 0), items.length - 1);
      const filter = (item) => getIndex(item) === boundedIndex;
      return getElementBy(filter);
    },
    [getElementBy, items.length],
  );

  useEffect(() => {
    if (isDisable || !isInView) return;
    const target = getElementByIndex(currentIndex);
    const debouncer = new Debouncer(scrollDelay);

    const margin = ` -${(tileMarginMultiplier * 100) / visibleTiles}%`;
    const observerOptions = {
      root: tileContainerRef.current,
      rootMargin: `${margin} 0px ${margin}`,
      threshold: 0.95,
    };
    const scrollOptions = { behavior: "instant", block: "center" };

    const callback = (entries) => {
      const cleanEntries = ({ isIntersecting }) => isIntersecting;
      const setState = ({ target }) => {
        debouncer.run(() => setTileAsCurrent(target));
      };
      entries.filter(cleanEntries).forEach(setState);
    };

    scrollTo(target, scrollOptions);
    const observer = new IntersectionObserver(callback, observerOptions);
    getTiles().forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [
    currentIndex,
    getElementByIndex,
    isDisable,
    setTileAsCurrent,
    tileMarginMultiplier,
    visibleTiles,
    isInView,
    scrollTo,
  ]);

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
        <NavigationButton
          classArr={[
            styles.Button,
            styles.previousTileButton,
            "previousTileButton",
          ]}
          onClick={previousTile}
          isDisable={isDisable}
        ></NavigationButton>
        <ol ref={tileContainerRef} className={styles.tileContainer}>
          {items.map(createTile)}
        </ol>
        <NavigationButton
          iconDirection="down"
          classArr={[styles.Button, styles.nextTileButton, "nextTileButton"]}
          onClick={nextTile}
          isDisable={isDisable}
        ></NavigationButton>
      </div>
      {label ? <p className={styles.label}>{label}</p> : undefined}
    </div>
  );
}

export default TileSelector;

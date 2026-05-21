import NavigationButton from "./NavigationButton";
import css from "./TileSelector.module.css";
import { Debouncer, reduceToClassName, clamp } from "../../utils";
import { useCallback, useRef, useEffect } from "react";
import Tile from "./Tile";

const scrollDelay = 300;

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
  const getBoundedIndex = useCallback(
    (index) => clamp(0, index, items.length - 1),
    [items.length],
  );

  const tileContainerRef = useRef(null);

  const hasToSkipEffect = useCallback(
    () => isDisable || !isInView,
    [isDisable, isInView],
  );

  const getTiles = () => {
    const tileContainer = tileContainerRef.current;
    return tileContainer ? [...tileContainer.children] : [];
  };

  const createTile = ({ label, key }, index) => {
    const isCurrent = () => getBoundedIndex(currentIndex) === index && isInView;
    const moveToCenter = ({ currentTarget }) => {
      currentTarget.scrollIntoView(
        isCurrent()
          ? { behavior: "instant", block: "center" }
          : { behavior: "smooth", block: "center" },
      );
    };
    return (
      <Tile
        key={key}
        index={index}
        isDisable={isDisable}
        isCurrent={isCurrent()}
        classArr={[css.tile]}
        moveHandler={moveToCenter}
      >
        {label}
      </Tile>
    );
  };

  const previousTile = () => {
    tileContainerRef.current.scrollBy({
      top: getTiles()[0].offsetHeight * -1,
      behavior: "smooth",
    });
  };

  const nextTile = () => {
    tileContainerRef.current.scrollBy({
      top: getTiles()[0].offsetHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (hasToSkipEffect()) return;
    const debouncer = new Debouncer(scrollDelay);
    const options = {
      root: tileContainerRef.current,
      threshold: 0.95,
      rootMargin: `-${((visibleTiles - 1) / visibleTiles) * 50}% 0px`,
    };

    const callback = (entries) => {
      const cleanEntries = ({ isIntersecting }) => isIntersecting;
      const getValue = ({ target }) => {
        return items[Number(target.getAttribute("data-index"))].value;
      };
      const setState = (value) => debouncer.run(() => onChange(value));
      entries.filter(cleanEntries).map(getValue).forEach(setState);
    };

    const observer = new IntersectionObserver(callback, options);
    getTiles().forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [hasToSkipEffect, items, onChange, visibleTiles]);

  return (
    <div
      className={reduceToClassName([
        ...classArr,
        css.main,
        isDisable ? css.disable : "",
      ])}
      style={{ "--visibleTiles": visibleTiles }}
    >
      <div className={css.TileControl}>
        <NavigationButton
          classArr={(css.button, css.previousTileButton)}
          onClick={previousTile}
          isDisable={isDisable}
        ></NavigationButton>
        <ol ref={tileContainerRef} className={css.tileContainer}>
          {items.map(createTile)}
        </ol>
        <NavigationButton
          iconDirection="down"
          classArr={(css.button, css.nextTileButton)}
          onClick={nextTile}
          isDisable={isDisable}
        ></NavigationButton>
      </div>
      {label ? <p className={css.label}>{label}</p> : undefined}
    </div>
  );
}

export default TileSelector;

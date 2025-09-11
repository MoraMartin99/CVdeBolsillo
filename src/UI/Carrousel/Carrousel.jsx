import styles from "./Carrousel.module.css";
import Tab from "./Tab";
import Track from "./Track";
import { reduceToClassName } from "../../utils";
import { useState } from "react";

/**
 * @module Carrousel
 */

/**
 * @typedef {object} screen The data required to display a screen in the Carrousel
 * @property {string} label The visible text of the Tab component that represents the screen component
 * @property {JSX.Element} component The component to display
 * @property {string} id An identifier that differentiates screens from each other
 */

/**
 * The Carousel component lets you create slidable interfaces
 * @param {object} props The Carrousel properties
 * @param {Array<screen>} props.screens The list of data required to display the screens
 * @example
 * const screens = [
  {
    label: "tab1",
    component: <div>component1</div>,
    id: 1
  },
  {
    label: "tab2",
    component: <div>component2</div>,
    id: 2
  },
]
  <Carrousel screens={screens}></Carrousel>
 * @return {JSX.Element}
 */
function Carrousel({ screens = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const onClickCallback = (value) => setCurrentIndex(value);
  const buildTab = ({ label, id: key, index }) => {
    const isCurrentTab = index === currentIndex;
    return (
      <Tab
        label={label}
        key={key}
        value={index}
        onClickCallback={onClickCallback}
        isCurrentTab={isCurrentTab}
      ></Tab>
    );
  };
  const screenReducer = (result, { label, component, id }, index) => {
    result[0].push(buildTab({ label, id, index }));
    result[1].push({ component, id });
    return result;
  };

  const [tabs, componentData] = screens.reduce(screenReducer, [[], []]);

  return (
    <div
      data-testid="carrousel"
      className={reduceToClassName([styles.Carrousel, "carrousel"])}
    >
      <nav className={styles.tabContainer}>{tabs}</nav>
      <Track currentIndex={currentIndex} componentsData={componentData}></Track>
    </div>
  );
}

export default Carrousel;

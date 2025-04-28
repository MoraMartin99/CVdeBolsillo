import styles from "./Carrousel.module.css";
import Tab from "./Tab";
import Track from "./Track";
import { reduceToClassName } from "../../utils";
import { useState } from "react";

/**
 * @module Carrousel
 */

/**
 * @typedef {object} screenData The data required to build a screen in the Carrousel
 * @property {string} label The visible text of the Tab component that represents the screen component
 * @property {JSX.Element} component The component to display
 * @property {string} id An identifier that differentiates objects from each other
 */

/**
 * The Carousel component lets you create slidable interfaces
 * @param {object} props The Carrousel properties
 * @param {Array<screenData>} props.screenDataList The list of data required to build the screens
 * @return {JSX.Element}
 */
function Carrousel({ screenDataList = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const onClickCallback = (value) => setCurrentIndex(value);

  const tabMapper = ({ label, id: key }, index) => {
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

  return (
    <div className={reduceToClassName([styles.Carrousel, "carrousel"])}>
      <nav className={styles.tabContainer}>{screenDataList.map(tabMapper)}</nav>
      <Track
        currentIndex={currentIndex}
        componentDataList={screenDataList.map(({ component, id }) => {
          return { component, id };
        })}
      ></Track>
    </div>
  );
}

export default Carrousel;

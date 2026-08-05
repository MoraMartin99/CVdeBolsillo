import Tab from "./Tab/Tab";
import css from "./ScreenNav.module.css";

/**@module ScreenNav */

/**
 * The setCurrentSlot callback is call on tab`s click events
 * @callback setCurrentSlot
 * @param {number} value The index of the clicked tab
 */

/**
 * A collection of required props to build a Tab component
 * @typedef {object} Tab
 * @property {string} label The visible text of the Tab
 * @property {string} id
 * @property {boolean} isCurrentTab If true, sets the visual state as current
 */

/**
 * The ScreenNav component manages a collection of [tabs]{@link module:Tab~Tab}
 * @param {Object} props The component props
 * @param {setCurrentSlot} props.setCurrentSlot A callback that runs on tab`s click events
 * @param {Array<Tab>} props.tabs A collection of props required to build Tab components
 * @returns {JSX.Element}
 */
function ScreenNav({ setCurrentSlot, tabs = [] }) {
  const buildTab = ({ label, id, isCurrentTab }, index) => {
    return (
      <Tab
        key={id}
        onClick={setCurrentSlot}
        value={index}
        isCurrentTab={isCurrentTab}
      >
        {label}
      </Tab>
    );
  };
  return <nav className={css.main}>{tabs.map(buildTab)}</nav>;
}

export default ScreenNav;

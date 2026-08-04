import css from "./Tab.module.css";

/**
 * This callback must mutate [Carrousel]{@link module:Carrousel~Carrousel} state on click events
 * @callback onClick
 * @param {*} value The value of the tab
 */

/**
 * The Tab component lets you go to a screen in [Carrousel]{@link module:Carrousel~Carrousel}
 * @param {Object} props  The Tab props
 * @param {string} props.children The visible text of the Tab
 * @param {*} props.value The value that is pass to on onClick calls
 * @param {onClick} props.onClick The callback that is run on click events
 * @param {boolean} props.isCurrentTab If true, sets the visual state as current
 * @returns {JSX.Element}
 */
function Tab({ children, value, onClick: onClickCallback, isCurrentTab }) {
  return (
    <button
      className={[css.main, isCurrentTab ? css.isCurrent : ""].join(" ")}
      onClick={() => onClickCallback(value)}
    >
      {children}
    </button>
  );
}

export default Tab;

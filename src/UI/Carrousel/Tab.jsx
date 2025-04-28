import styles from "./Tab.module.css";
import { reduceToClassName } from "../../utils";

/**
 * This callback must mutate [Carrousel]{@link module:Carrousel~Carrousel} state on click events
 * @callback onClickCallback
 * @param {*}value The value of the tab
 */

/**
 * The Tab component lets you go to a screen in [Carrousel]{@link module:Carrousel~Carrousel}
 * @memberof module:Carrousel
 * @param {Object} props  The Tab props
 * @param {string} props.label The visible text of the Tab
 * @param {*} props.value The value of the Tab that is use on click events
 * @param {onClickCallback} props.onClickCallback The callback that is run on click events
 * @param {boolean} props.isCurrentTab If true, sets the visual state as current
 * @returns {JSX.Element}
 */
function Tab({ label = "", value, onClickCallback, isCurrentTab }) {
  const classArr = [styles.container];
  if (isCurrentTab) classArr.push(styles.current);
  const onClick = () => onClickCallback(value);
  const classNames = reduceToClassName(classArr);

  return (
    <button className={classNames} onClick={onClick}>
      {typeof label === "string" ? label : ""}
    </button>
  );
}

export default Tab;

import styles from "./Track.module.css";
import { reduceToClassName } from "../../utils";
/**
 * @typedef {object} componentData The data required to insert a component in the Track component
 * @property {JSX.Element} component The component to insert
 * @property {string} id An identifier that differentiates objects from each other
 */

/**
 * The Track component is the element that contain the slots and manage the actual moves of the screens
 * @memberof module:Carrousel
 * @param {object} props The Track properties
 * @param {Array<componentData>} props.componentDataList The list of components data to display
 * @param {number} props.currentIndex The index of the screen that must be the current
 * @returns {JSX.Element}
 */
function Track({ componentDataList = [], currentIndex = 0 }) {
  const restrainedIndex =
    currentIndex <= 0 || componentDataList.length === 0
      ? 0
      : currentIndex >= componentDataList.length
        ? componentDataList.length - 1
        : currentIndex;
  const transform = `translateX(-${restrainedIndex * 100}%)`;

  const setWrapper = ({ component, id }) => {
    return (
      <div key={id} className={styles.slot}>
        {component}
      </div>
    );
  };

  return (
    <div
      style={{ transform }}
      className={reduceToClassName([styles.main, "track"])}
    >
      {componentDataList.map(setWrapper)}
    </div>
  );
}

export default Track;

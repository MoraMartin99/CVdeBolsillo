import Accordion from "../Accordion/Accordion";
import styles from "./SubSection.module.css";
/**
 * The SubSection component lets you create a collapsible group of inputs
 * @memberof module:Form
 * @property {object} prop The SubSection prop
 * @property {string} prop.name The name and label of the SubSection
 * @property {CurrentColorIcon} prop.Icon The icon component that represents the SubSection
 * @property {Array<JSX.Element>} prop.children An ordered group of children to render as content
 * @returns {JSX.Element}
 */
function SubSection({ name, Icon, children }) {
  return (
    <fieldset className="SubSection">
      <Accordion name={name} Icon={Icon} userStyleClass={styles.main}>
        {children}
      </Accordion>
    </fieldset>
  );
}

export default SubSection;

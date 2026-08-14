import Accordion from "./Accordion/Accordion";
import { reduceToClassName } from "../../../utils";

/**@module Section */

/**
 * The Section component is a collapsible container use to group form elements
 * @param {object} props The component properties
 * @param {string} props.id An identifier of the component within its siblings and descendants
 * @param {name} props.name The visible text of the header
 * @param {CurrentColorIcon} props.Icon The icon component that represents the section and is visible in the header
 * @param {boolean} [props.isExpanded = false] The visibility state of the content
 * @param {JSX.Element} props.children The form elements intended to get or display information to the user
 * @param {JSX.Element} props.actions The form elements intended to modify the structure or behavior of the section
 * @param {Array<string>} [props.classArr =[]] A list of CSS classes to apply to the component
 * @returns {JSX.Element}
 */
function Section({
  id,
  name,
  Icon,
  isExpanded = false,
  children,
  actions,
  classArr = [],
}) {
  return (
    <fieldset id={id} className={reduceToClassName([...classArr])}>
      <Accordion {...{ name, Icon, isExpanded, actions }}>{children}</Accordion>
    </fieldset>
  );
}

export default Section;

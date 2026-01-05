import { reduceToClassName } from "../../../utils";
import Accordion from "./Accordion";

/**@module  Form */

/**
 * The Form component represents a collapsable generic form
 * @param {object} props The component properties
 * @param {string} props.id An identifier of the component within its siblings and descendants
 * @param {name} props.name The visible text of the header
 * @param {CurrentColorIcon} props.Icon The icon component that represents the form and is visible in the header
 * @param {boolean} [props.isExpanded = false] The visibility state of the content
 * @param {JSX.Element} props.children The form elements intended to get or display information to the user
 * @param {JSX.Element} props.actions The form elements intended to modify the structure or behavior of the form
 * @param {Array<string>} [props.classArr =[]] A list of CSS classes to apply to the component
 * @returns {JSX.Element}
 */
function Form({
  id,
  name,
  Icon,
  isExpanded = false,
  children,
  actions,
  classArr = [],
}) {
  const variant = "main";

  return (
    <form className={reduceToClassName([...classArr])} id={id} action="">
      <Accordion {...{ name, Icon, isExpanded, actions, variant }}>
        {children}
      </Accordion>
    </form>
  );
}

export default Form;

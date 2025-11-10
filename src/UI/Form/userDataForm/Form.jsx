import useAccordion from "../../../hooks/useAccordion";
import Header from "./Header";
import css from "./Forms.module.css";
import { reduceToClassName } from "../../../utils";

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
  isExpanded: isExpandedProp = false,
  children,
  actions,
  classArr = [],
}) {
  const [isExpanded, setIsExpanded, parentStyle, contentStyle] =
    useAccordion(isExpandedProp);
  const toggleIsExpanded = () => setIsExpanded(!isExpanded);

  return (
    <form
      className={reduceToClassName([...classArr, css.main])}
      id={id}
      style={{ ...parentStyle }}
      action=""
    >
      <Header
        classArr={[css.header]}
        isExpanded={isExpanded}
        Icon={Icon}
        onClick={toggleIsExpanded}
      >
        {name}
      </Header>
      <div className="collapsableContainer" style={{ ...contentStyle }}>
        <div className={css.content}>
          <div className={css.elementContainer}>{children}</div>
          <div className={css.actionsContainer}>{actions}</div>
        </div>
      </div>
    </form>
  );
}

export default Form;

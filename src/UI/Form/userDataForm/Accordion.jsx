import useAccordion from "../../../hooks/useAccordion";
import Header from "./Header";
import css from "./Accordion.module.css";
import { reduceToClassName } from "../../../utils";

/**@module Accordion */

/**
 * The Accordion component is a collapsible element that serves as the main structure for the [Form]{@link module:Form} and [Section]{@link module:Section} component
 * @param {object} props The component properties
 * @param {string} props.name The visible text of the header
 * @param {CurrentColorIcon} props.Icon The icon component that represents the accordion and is visible in the header
 * @param {boolean} [props.isExpanded = false] The visibility state of the content
 * @param {JSX.Element} props.children The form elements intended to get or display information to the user
 * @param {JSX.Element} [props.actions = []] The form elements intended to modify the structure or behavior of the accordion
 * @param {"main"|"child"} [props.variant = "child"] The visual theme of the component
 * @param {Array<string>} [props.classArr =[]] A list of CSS classes to apply to the component
 * @returns {JSX.Element}
 */
function Accordion({
  name,
  Icon,
  isExpanded: isExpandedProp = false,
  children,
  actions = [],
  variant = "child",
  classArr = [],
}) {
  const [isExpanded, setIsExpanded, parentStyle, contentStyle] =
    useAccordion(isExpandedProp);
  const toggleIsExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={reduceToClassName([
        ...classArr,
        css.base,
        css[variant],
        "section",
      ])}
      style={{ ...parentStyle }}
    >
      <Header
        isExpanded={isExpanded}
        Icon={Icon}
        onClick={toggleIsExpanded}
        classArr={[css.header]}
      >
        {name}
      </Header>
      <div className="collapsableContainer" style={{ ...contentStyle }}>
        <div className={css.content}>
          <div className={css.elementContainer}>{children}</div>
          {actions.length ? (
            <div className={css.actionsContainer}>{actions}</div>
          ) : undefined}
        </div>
      </div>
    </div>
  );
}

export default Accordion;

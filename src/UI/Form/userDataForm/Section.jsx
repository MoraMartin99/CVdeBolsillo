import Accordion from "../Accordion/Accordion";
/**
 * The Section component lets you create a collapsible group of inputs and subsections
 * @memberof module:Form
 * @property {object} prop The section prop
 * @property {string} prop.name The name and label of the section
 * @property {CurrentColorIcon} prop.Icon The icon component that represents the section
 * @property {Array<JSX.Element>} prop.children An ordered group of children to render as content
 * @returns {JSX.Element}
 */
/* function Section({ name, Icon, children }) {
  return (
    <fieldset className="section">
      <Accordion name={name} Icon={Icon}>
        {children}
      </Accordion>
    </fieldset>
  );
}

export default Section; */

function Section({ id, name, Icon, templates, onChange, structure }) {
  return (
    <fieldset className="section">
      <Accordion name={name} Icon={Icon}>
        {children}
      </Accordion>
    </fieldset>
  );
}

export default Section;

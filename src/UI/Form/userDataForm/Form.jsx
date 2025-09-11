import Section from "./Section";
import SubSection from "./SubSection";
import Button from "../Button/Button";
import { reduceToClassName } from "../../utils";

/**
 * A callback that runs on form data if it changes
 * @callback onChange
 * @param {*} data The form data including the form id
 */

/**
 * The Form component lets you gather information using its inputs
 * @module Form
 * @param {object} props
 * @param {string} [props.id = ""] The id of the form
 * @param {Array<string>} [prop.classArr = []] A list of CSS classes to apply to the component
 * @param {Array<sectionData>} props.sectionDataList An ordered list that contains the data necessary to build one or more sections
 * @param {Array<formActionsData>} props.formActionsDataList An ordered list that contains the data necessary to build one or more buttons for performing action on the form
 * @param {onChange} props.onChange A callback that runs on form data if changes
 */
function Form({
  sectionDataList = [],
  formActionsDataList = [],
  id = "",
  onChange,
  classArr = [],
}) {
  const buildElements = (item) => {
    const buildElement = (data) => {
      const SECTIONTYPE = "section";
      const SUBSECTIONTYPE = "subsection";
      const BUTTONTYPE = "button";
      const type = typeof data.type === "string" ? data.type.toLowerCase() : "";

      const buildSection = ({ name, Icon, contentList = [] }) => {
        return (
          <Section name={name} Icon={Icon}>
            {contentList.map(buildElements)}
          </Section>
        );
      };

      const buildSubSection = ({ name, Icon, contentList = [] }) => {
        return (
          <SubSection name={name} Icon={Icon}>
            {contentList.map(buildElements)}
          </SubSection>
        );
      };

      const buildButton = ({
        children,
        classArr,
        Icon,
        iconPosition,
        onClickCallback,
      }) => {
        return (
          <Button
            classArr={classArr}
            Icon={Icon}
            iconPosition={iconPosition}
            onClickCallback={onClickCallback}
          >
            {children}
          </Button>
        );
      };

      if (type === SECTIONTYPE) return buildSection(data);
      if (type === SUBSECTIONTYPE) return buildSubSection(data);
      if (type === BUTTONTYPE) return buildButton(data);
      return <></>;
    };

    return buildElement(item);
  };

  return (
    <form action="" id={id} className={reduceToClassName(classArr)}>
      <div>{sectionDataList.map(buildElements)}</div>

      {buttonDataList ? (
        <div>{buttonDataList.map(buildElements)}</div>
      ) : undefined}
    </form>
  );
}

export default Form;

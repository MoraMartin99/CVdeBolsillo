import baseCSS from "./field.module.css";
import css from "./ClassicField.module.css";
import FieldLabel from "./FieldLabel";
import FieldInput from "./FieldInput";
import Tip from "./Tip";
import { reduceToClassName } from "../../../utils";

/**
 * A function that evaluates if a value is valid or invalid
 * @callback validator
 * @param {*} value
 * @returns {boolean} true if the value is valid, false if it is invalid
 */

/**
 * A function that report data changes to the form model
 * @callback submitData
 * @param {object} data
 * @param {string} data.id The id of the component
 */

/**
 * The ClassicField component represents a field with a label, an input and a warning
 * @param {object} props The component properties
 * @param {string} props.id An identifier of the component
 * @param {"email"|"number"|"tel"|"text"|"url"} [props.type = "text"] A subset of the [type attribute]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#type}
 * @param {string} props.label The field tittle
 * @param {string} props.value The [value attribute]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#value}
 * @param {string} props.placeholder The [placeholder attribute]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#placeholder}
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {string} [props.tip] A message to the user that clarifies the constraints that makes a value valid. It has to be set in order to use the Constraint Validation API
 * @param {validator} [props.validator] A function that runs on change events and evaluates if a value is valid or invalid
 * @param {submitData} props.submitData A function that report data changes to the form model
 * @param {boolean} [props.isInvalid = false] if true sets the component as invalid, if false sets the component as valid.
 * @returns {JSX.Element}
 */
function ClassicField({
  id,
  type = "text",
  label,
  value = "",
  placeholder,
  classArr = [],
  tip,
  validator,
  submitData,
  isInvalid: isInvalidProp = false,
}) {
  const isInvalid = (value) => (validator ? !validator(value) : false);

  const onChange = ({ target }) => {
    const value = target.value;
    submitData({ id, isInvalid: isInvalid(value), value });
  };

  return (
    <div className={reduceToClassName([...classArr, baseCSS.main, css.main])}>
      <FieldLabel classArr={[css.label]} htmlFor={id}>
        {label}
      </FieldLabel>
      <FieldInput
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        classArr={[css.input]}
        isInvalid={isInvalidProp}
        tip={tip}
      ></FieldInput>
      <Tip classArr={[css.tip]} isVisible={isInvalidProp}>
        {tip}
      </Tip>
    </div>
  );
}

export default ClassicField;

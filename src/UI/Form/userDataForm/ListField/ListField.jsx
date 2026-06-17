import FieldLabel from "../FieldLabel";
import ClassicInput from "../ClassicInput";
import FormButton from "../FormButton";
import ListInput from "./ListInput";
import { reduceToClassName } from "../../../../utils";
import css from "./ListField.module.css";
import baseCSS from "../field.module.css";
import Icon from "../../../../assets/images/plus.svg?react";

/**
 * A function that report data changes to the form model
 * @callback submitData
 * @param {string} id The id of the component
 * @param {object} data The properties to change
 */

/**
 * @typedef {Object} item
 * @property {string} value
 * @property {string} id
 */

/**
 * The buildItem function builds a value item
 * @param {string} [value = ""]
 * @returns {item}}
 */
const buildItem = (value = "") => ({ value, id: self.crypto.randomUUID() });

/**
 * The ListField componente represents a field that contains a list of items
 * @param {object} props The component properties
 * @param {string} props.id An identifier of the component
 * @param {string} [props.label = "Lista"] The field tittle
 * @param {string} [props.placeholder = "item"] The [placeholder attribute]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#placeholder} for all inputs
 * @param {Array<item>} [props.value = [buildItem()]]
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {submitData} props.submitData A function that report data changes to the form model
 * @param {string} [props.primaryActionLabel = "Agregar item"]
 *
 * @returns {JSX.Element}
 */
function ListField({
  id,
  label = "Lista",
  placeholder = "item",
  value = [buildItem()],
  classArr = [],
  submitData,
  primaryActionLabel = "Agregar item",
}) {
  const buildListInput = (item, index) => {
    const onChange = ({ target: { value: inputValue } }) => {
      const newValue = value.map((item) => ({ ...item }));
      newValue[index].value = inputValue;
      submitData(id, { value: newValue });
    };

    const onPrimaryActionClick = () => {
      submitData(id, {
        value: value
          .map((item) => ({ ...item }))
          .filter((_, currentIndex) => currentIndex !== index),
      });
    };

    return (
      <ListInput
        value={item.value}
        key={item.id}
        id={index === value.length - 1 ? id : undefined}
        onChange={onChange}
        index={index}
        placeholder={placeholder}
        classArr={[css.input]}
        onPrimaryActionClick={onPrimaryActionClick}
      ></ListInput>
    );
  };

  const addItem = () => {
    submitData(id, {
      value: [...value.map((item) => ({ ...item })), buildItem()],
    });
  };

  return (
    <div className={reduceToClassName([...classArr, baseCSS.main, css.main])}>
      <FieldLabel classArr={[css.label]} htmlFor={id}>
        {label}
      </FieldLabel>
      {value.map(buildListInput)}
      <FormButton
        classArr={[css.button]}
        Icon={Icon}
        variant={"borderless"}
        onClick={addItem}
      >
        {primaryActionLabel}
      </FormButton>
    </div>
  );
}

export default ListField;

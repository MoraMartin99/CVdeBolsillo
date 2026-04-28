import Template from "./Template";

const defaultLabel = "Label";
const defaultPlaceholder = "Escribe aquí";

/**
 * A function that evaluates if the field's value is valid
 * @callback validator
 * @param {*} value
 * @returns {boolean} true if the value is valid, false if it is invalid
 */

/**
 * The ClassicFieldTemplate class defines the properties of the simplest fields that capture information using a classic input-text-like interface
 */
class ClassicFieldTemplate extends Template {
  /**
   * Creates the properties that defines a simple field element
   * @param {object} settings
   * @param {string} [settings.label = "Label"] The visible tittle
   * @param {string} [settings.placeholder = "Escribe aquí"]
   * @param {string} [settings.tip] The aid text that is display if the value of the field is invalid
   * @param {string|number} settings.value
   * @param {string} settings.templateId
   * @param {validator} [settings.validator]
   * @param {"text"|"number"|"email"|"tel"|"url"} [settings.type = "text"]
   * @param {string|number} settings.exampleValue
   */
  constructor({
    label = defaultLabel,
    placeholder = defaultPlaceholder,
    tip,
    value,
    templateId,
    validator,
    type,
    exampleValue,
  }) {
    super({ component: "field", templateId });
    Object.assign(this, {
      label,
      placeholder,
      tip,
      value,
      validator,
      type,
      exampleValue,
    });
  }

  get type() {
    return this.type;
  }
  get validator() {
    return this.validator;
  }

  get label() {
    return this.label;
  }

  get placeholder() {
    return this.placeholder;
  }

  get tip() {
    return this.tip;
  }

  get value() {
    return this.value;
  }

  get exampleValue() {
    return this.exampleValue;
  }
}

export default ClassicFieldTemplate;

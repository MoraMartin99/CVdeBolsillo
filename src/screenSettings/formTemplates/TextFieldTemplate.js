import ClassicFieldTemplate from "./ClassicFieldTemplate";
import { containsText } from "../../validators";

/**
 * A function that evaluates if the field's value is valid
 * @callback validator
 * @param {*} value
 * @returns {boolean} true if the value is valid, false if it is invalid
 */

/**
 * The TextFieldTemplate class defines the properties of the text field
 */
class TextFieldTemplate extends ClassicFieldTemplate {
  /**
   * Creates the properties of a text field
   * @param {object} settings
   * @param {string} [settings.label = "Label"] The visible tittle
   * @param {string} [settings.placeholder = "Escribe aquí"]
   * @param {string} [settings.tip] The aid text that is display if the value of the field is invalid
   * @param {string} settings.value
   * @param {string} settings.templateId
   * @param {validator} [settings.validator = containsText]
   * @param {string|number} settings.exampleValue
   */
  constructor({
    label,
    placeholder,
    tip = "Este campo debe contener palabras",
    value,
    templateId,
    validator = containsText,
    exampleValue,
  }) {
    super({
      templateId,
      type: "text",
      validator,
      label,
      placeholder,
      tip,
      value,
      exampleValue,
    });
  }
}

export default TextFieldTemplate;

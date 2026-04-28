import ClassicFieldTemplate from "./ClassicFieldTemplate";
import { isValidURL } from "../../validators";

/**
 * A function that evaluates if the field's value is valid
 * @callback validator
 * @param {*} value
 * @returns {boolean} true if the value is valid, false if it is invalid
 */

/**
 * The URLFieldTemplate class defines the properties of the url field
 */
class URLFieldTemplate extends ClassicFieldTemplate {
  /**
   * Creates the properties of a text field
   * @param {object} settings
   * @param {string} [settings.label = "URL"] The visible tittle
   * @param {string} [settings.placeholder = "https://www.google.com"]
   * @param {string} [settings.tip = "Escriba una dirección web válida, por ejemplo: https://www.google.com"] The aid text that is display if the value of the field is invalid
   * @param {string} settings.value
   * @param {string} settings.templateId
   * @param {validator} [settings.validator = isValidURL]
   * @param {string|number} settings.exampleValue
   */
  constructor({
    label = "URL",
    placeholder = "https://www.google.com",
    tip = "Escriba una dirección web válida, por ejemplo: https://www.google.com",
    value,
    templateId,
    validator = isValidURL,
    exampleValue,
  }) {
    super({
      label,
      placeholder,
      tip,
      value,
      templateId,
      validator,
      type: "url",
      exampleValue,
    });
  }
}

export default URLFieldTemplate;

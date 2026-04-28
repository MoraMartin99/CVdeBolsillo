import ClassicFieldTemplate from "./ClassicFieldTemplate";
import { isValidMail } from "../../validators";

const defaultTip = "Escriba un mail valido. Por ejemplo: nombre@dominio.com";
const type = "email";
const defaultPlaceholder = "nombre@dominio.com";
const defaultLabel = "Email";

/**
 * A function that evaluates if the field's value is valid
 * @callback validator
 * @param {*} value
 * @returns {boolean} true if the value is valid, false if it is invalid
 */

/**
 * The EmailFieldTemplate class defines the properties of an email field
 */
class EmailFieldTemplate extends ClassicFieldTemplate {
  /**
   * Creates the properties that defines an email field
   * @param {object} settings
   * @param {string} [settings.label = "Email"] The visible tittle
   * @param {string} [settings.placeholder = "nombre@dominio.com"]
   * @param {string} [settings.tip = "Escriba un mail valido. Por ejemplo: nombre@dominio.com"] The aid text that is display if the value of the field is invalid
   * @param {string} settings.value
   * @param {string} settings.templateId
   * @param {validator} [settings.validator = isValidMail]
   */
  constructor({
    label = defaultLabel,
    placeholder = defaultPlaceholder,
    tip = defaultTip,
    value,
    templateId,
    validator = isValidMail,
    exampleValue,
  }) {
    super({
      label,
      placeholder,
      tip,
      value,
      templateId,
      validator,
      type,
      exampleValue,
    });
  }
}

export default EmailFieldTemplate;

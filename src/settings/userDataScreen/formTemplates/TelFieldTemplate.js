import ClassicFieldTemplate from "./ClassicFieldTemplate";
import { isValidTelNumber } from "../../../validators";

/**
 * The TelFieldTemplate class defines the properties of the telephone field
 */
class TelFieldTemplate extends ClassicFieldTemplate {
  /**
   * Creates the properties that defines a telephone field
   * @param {object} settings
   * @param {string} [settings.label = "Numero de teléfono"] The visible tittle
   * @param {string} [settings.placeholder = "88888888"]
   * @param {string} [settings.tip = "Escriba un numero telefónico de 8 dígitos"] The aid text that is display if the value of the field is invalid
   * @param {string} settings.value
   * @param {string} settings.templateId
   * @param {validator} [settings.validator = isValidTelNumber]
   * @param {string|number} settings.exampleValue
   */
  constructor({
    label = "Numero de teléfono",
    placeholder = "88888888",
    tip = "Escriba un numero telefónico de 8 dígitos",
    value,
    templateId,
    validator = isValidTelNumber,
    exampleValue,
  }) {
    super({
      label,
      placeholder,
      tip,
      value,
      templateId,
      validator,
      type: "tel",
      exampleValue,
    });
  }
}

export default TelFieldTemplate;

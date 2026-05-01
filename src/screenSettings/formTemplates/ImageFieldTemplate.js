import Template from "./Template";
import { hasSource } from "../../validators";

/**
 * A function that evaluates if the field's value is valid
 * @callback validator
 * @param {*} value
 * @returns {boolean} true if the value is valid, false if it is invalid
 */

/**
 * The value of the field
 * @typedef {object} value
 * @property {string} source A path to an image
 * @property {number} positionX The horizontal offset of the image relative to the left upper corner of the wrapper
 * @property {number} positionY The vertical offset of the image relative to the left upper corner of the wrapper
 * @property {number} scale The ratio of the computed size to the size defined in the styles
 */

/**
 * The ImageFieldTemplate class defines the properties of the image field
 */
class ImageFieldTemplate extends Template {
  /**
   * Creates the properties that defines an image field
   * @param {object} settings
   * @param {string} settings.templateId
   * @param {value} settings.value
   * @param {string} [settings.primaryActionLabel = "Subir imagen"]
   * @param {string} [settings.destructiveActionLabel = "Eliminar imagen"]
   * @param {string} [settings.alt = "imagen"]
   * @param {string} [settings.label = "Imagen"] The visible title
   * @param {string} [settings.tip = "Seleccione una imagen"]
   * @param {value} settings.exampleValue
   * @param {validator} [settings.validator = hasSource]
   */
  constructor({
    templateId,
    value,
    primaryActionLabel = "Subir imagen",
    destructiveActionLabel = "Eliminar imagen",
    alt = "imagen",
    label = "Imagen",
    tip = "Seleccione una imagen",
    exampleValue,
    validator = hasSource,
  }) {
    super({ templateId, component: "field" });
    Object.assign(this, {
      type: "image",
      label,
      validator,
      primaryActionLabel,
      destructiveActionLabel,
      value: { ...value },
      alt,
      tip,
      exampleValue: { ...exampleValue },
    });
  }
}

export default ImageFieldTemplate;

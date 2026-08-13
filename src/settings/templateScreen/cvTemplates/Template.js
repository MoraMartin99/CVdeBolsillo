import imagePlaceholder from "../../../assets/images/imagePlaceholder.svg";

/**
 * A CV template
 * @typedef {object} template
 * @property {string} id
 * @property {string} thumbnail
 * @property {JSX.Element} Component
 * @property {string} label
 */

/**
 * The Template class defines the properties of a CV template
 */
class Template {
  /**
   * Creates a CV template
   * @param {object} settings
   * @param {string} settings.id
   * @param {string} [settings.thumbnail = imagePlaceholder]
   * @param {JSX.Element} settings.Component
   * @param {string} settings.label
   */
  constructor({ id, thumbnail = imagePlaceholder, Component, label }) {
    return Object.assign(this, { id, thumbnail, Component, label });
  }
}

export default Template;

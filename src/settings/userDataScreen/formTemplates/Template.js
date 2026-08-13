/**
 * The Template class defines the properties of a base form element
 */
class Template {
  /**
   * Creates the properties of the most basic form element
   * @param {object} settings
   * @param {string} settings.templateId
   * @param {"field"|"form"|"action"|"section"|"tipCard"} settings.component The component type
   */
  constructor({ templateId, component }) {
    Object.assign(this, { templateId, component });
  }
}

export default Template;

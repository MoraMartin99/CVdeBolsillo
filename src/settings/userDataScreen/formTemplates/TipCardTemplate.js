import Template from "./Template";

/**
 * The TipCardTemplate class defines the properties of the tip card element
 */
class TipCardTemplate extends Template {
  /**
   * Creates the properties that defines a tip card element
   * @param {object} settings
   * @param {string} settings.templateId
   * @param {string} [settings.title = "info"]
   * @param {string} settings.tip
   */
  constructor({ templateId, title = "info", tip }) {
    super({ templateId, component: "tipCard" });
    Object.assign(this, { tip, title });
  }
}

export default TipCardTemplate;

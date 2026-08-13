import Template from "./Template";

/**
 * The ActionTemplate defines the properties of the base action element
 */
class ActionTemplate extends Template {
  /**
   * Creates the properties that defines a base action element
   * @param {object} settings
   * @param {string} [settings.label] The visible text
   * @param {string} settings.templateId
   * @param {"addItem"|"removeItem"} [settings.action]
   * @param {CurrentColorIcon} settings.Icon
   */
  constructor({ templateId, action, label, Icon }) {
    super({ templateId, component: "action" });
    this.action = action;
    this.label = label;
    this.Icon = Icon;
  }
}

export default ActionTemplate;

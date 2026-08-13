import ActionTemplate from "./ActionTemplate";

/**
 * The AddItemTemplate class defines the properties of the add item action
 */
class AddItemTemplate extends ActionTemplate {
  /**
   * Creates the properties that defines an add item action
   * @param {object} settings
   * @param {string} settings.templateId
   * @param {string} settings.targetId The id of the element you want to add
   * @param {CurrentColorIcon} settings.Icon
   * @param {string} [settings.label = "Agregar elemento"] The visible text
   */
  constructor({ templateId, targetId, Icon, label = "Agregar elemento" }) {
    super({ templateId, action: "addItem", label, Icon });
    this.targetId = targetId;
  }
}

export default AddItemTemplate;

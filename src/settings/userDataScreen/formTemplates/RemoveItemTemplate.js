import ActionTemplate from "./ActionTemplate";
import TrashIcon from "../../../assets/images/trashIcon.svg?react";

/**
 * The RemoveItemTemplate class defines the properties of the remove item action
 */
class RemoveItemTemplate extends ActionTemplate {
  /**
   * Creates the properties that defines a remove item action
   * @param {object} settings
   * @param {string} settings.templateId
   * @param {string} [settings.label = "Agregar elemento"] The visible text
   * @param {CurrentColorIcon} [settings.Icon = TrashIcon]
   */
  constructor({ templateId, label = "Eliminar elemento", Icon = TrashIcon }) {
    super({ templateId, action: "removeItem", label, Icon });
  }
}

export default RemoveItemTemplate;

import Template from "./Template";
import TaskIcon from "../../assets/images/TaskIcon.svg?react";

const defaultPrimaryAction = { label: "Agregar item", Icon: TaskIcon };

/**
 * @typedef {object} listItem
 * @property {string|number} value
 * @property {string} id
 */

/**
 * The ListFieldTemplate class defines the properties of the list field
 */
class ListFieldTemplate extends Template {
  /**
   * Creates the properties of a list field
   * @param {object} settings
   * @param {string} settings.templateId
   * @param {string} [settings.label = "Lista"] The visible tittle
   * @param {string} [settings.placeholder = "item"]
   * @param {Array<listItem>} [settings.value = [{ value: "", id: self.crypto.randomUUID() }]]
   * @param {Array<listItem>} [settings.exampleValue]
   */
  constructor({
    templateId,
    label = "Lista",
    placeholder = "item",
    primaryAction = defaultPrimaryAction,
    value = [{ value: "", id: self.crypto.randomUUID() }],
    exampleValue,
  }) {
    super({ templateId, component: "field" });
    Object.assign(this, {
      label,
      placeholder,
      primaryAction: { ...defaultPrimaryAction, ...primaryAction },
      value: [...value],
      exampleValue: exampleValue ? [...exampleValue] : undefined,
      type: "list",
    });
  }
}

export default ListFieldTemplate;

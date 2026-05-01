import Template from "./Template";
import TaskIcon from "../../assets/images/TaskIcon.svg?react";

const defaultPrimaryAction = { label: "Agregar item", Icon: TaskIcon };

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
   * @param {Array<string|number>} [settings.value = [""]]
   * @param {Array<string|number>} settings.exampleValue
   */
  constructor({
    templateId,
    label = "Lista",
    placeholder = "item",
    primaryAction = defaultPrimaryAction,
    value = [""],
    exampleValue,
  }) {
    super({ templateId, component: "field" });
    Object.assign(this, {
      label,
      placeholder,
      primaryAction: { ...defaultPrimaryAction, primaryAction },
      value: { ...value },
      exampleValue: { ...exampleValue },
      type: "list",
    });
  }
}

export default ListFieldTemplate;

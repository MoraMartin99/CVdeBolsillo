import Template from "./Template";
import TaskIcon from "../../assets/images/TaskIcon.svg?react";

const defaultPrimaryAction = { label: "Agregar item", Icon: TaskIcon };

/**
 * The ListFieldTemplate class defines the properties of the list field
 */
class ListFieldTemplate extends Template {
  #value;
  #exampleValue;
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
      value,
      exampleValue,
      type: "list",
    });
  }

  get label() {
    return this.label;
  }

  get placeholder() {
    return this.placeholder;
  }

  get primaryAction() {
    return this.primaryAction;
  }

  get value() {
    return this.value;
  }

  get exampleValue() {
    return this.exampleValue;
  }

  get type() {
    return this.type;
  }
}

export default ListFieldTemplate;

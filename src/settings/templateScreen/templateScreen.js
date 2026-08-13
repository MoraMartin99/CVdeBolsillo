import Screen from "../Screen";
import templates from "./templates/index";

/**@module TemplateScreen */

/**
 * The TemplateScreen defines the properties of a template screen component
 */
class TemplateScreen extends Screen {
  /**
   * Creates a template screen component
   * @param {object} settings
   * @param {Array<import("./templates/Template")>} settings.templates A collection of templates
   * @param {string} [settings.label = "Plantillas"] The visible name of the screen
   */
  constructor({ templates, label = "Plantillas" }) {
    super({ label, id: "templateForm" });
    this.templates = templates;
  }
}

export default new TemplateScreen({ templates });

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
   * @param {string} settings.cvTemplateId The id of the current template
   */
  constructor({ templates, label = "Plantillas", cvTemplateId }) {
    super({ label, id: "templateForm" });
    this.templates = templates;
    this.cvTemplateId = cvTemplateId;
  }
}

export default new TemplateScreen({ templates, cvTemplateId: templates[0].id });

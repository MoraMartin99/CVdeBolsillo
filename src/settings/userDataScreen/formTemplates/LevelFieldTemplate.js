import Template from "./Template";

/**
 * The LevelFieldTemplate class defines the properties of the level field
 */
class LevelFieldTemplate extends Template {
  /**
   * Creates the properties of a level field
   * @param {object} settings
   * @param {string} settings.templateId
   * @param {string} [settings.label = "Nivel"] The visible tittle
   * @param {string} [settings.minMark = "Mínimo"] The label for the minimum value
   * @param {string} [settings.maxMark = "Máximo"] The label for the maximum value
   * @param {number} [settings.min = 1] The minimum value
   * @param {number} [settings.max = 10] The maximum value
   * @param {number} [settings.step = 1] The distance between the snapping points relative to the maximum value
   * @param {number} [settings.value = settings.min]
   * @param {number} settings.exampleValue
   */
  constructor({
    templateId,
    label = "Nivel",
    minMark = "Mínimo",
    maxMark = "Máximo",
    min = 1,
    max = 10,
    step = 1,
    value = min,
    exampleValue,
  }) {
    super({ templateId, component: "field" });
    Object.assign(this, {
      type: "level",
      label,
      minMark,
      maxMark,
      value,
      exampleValue,
      min,
      max,
      step,
    });
  }
}

export default LevelFieldTemplate;

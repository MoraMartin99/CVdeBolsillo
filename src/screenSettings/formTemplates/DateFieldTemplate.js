import Template from "./Template";

/**
 * The date value
 * @typedef {object} Date
 * @property {number} month
 * @property {number} year
 */

/**
 * The DateFieldTemplate class defines the properties of the date field
 */
class DateFieldTemplate extends Template {
  /**
   * Creates the properties of a date field
   * @param {object} settings
   * @param {string} settings.templateId
   * @param {string} [settings.label = "Fecha"] The visible tittle
   * @param {Date} settings.value
   * @param {number} settings.startYear
   * @param {number} settings.finishYear
   * @param {Date} settings.exampleValue
   */
  constructor({
    templateId,
    label = "Fecha",
    value,
    startYear,
    finishYear,
    exampleValue,
  }) {
    super({ templateId, component: "field" });
    this.type = "date";
    this.label = label;
    this.value = { ...value };
    this.startYear = startYear;
    this.finishYear = finishYear;
    this.exampleValue = { ...exampleValue };
  }
}

export default DateFieldTemplate;

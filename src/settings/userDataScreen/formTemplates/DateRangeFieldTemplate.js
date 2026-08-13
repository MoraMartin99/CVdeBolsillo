import Template from "./Template";

/**
 * The date value
 * @typedef {object} Date
 * @property {number} month
 * @property {number} year
 */

/**
 * The dateRange value
 * @typedef {object} dateRange
 * @property {Date} start
 * @property {Date} finish
 */

/**
 * The DateRangeFieldTemplate class defines the properties of the dateRange field
 */
class DateRangeFieldTemplate extends Template {
  /**
   * Creates the properties of a dateRange field
   * @param {object} settings
   * @param {string} settings.templateId
   * @param {string} [settings.startLabel = "Desde"] The label of the start date control
   * @param {string} [settings.finishYear = "Hasta"] The label of the finish date control
   * @param {dateRange} [settings.value = { start: {}, finish: {} }]
   * @param {number} settings.startYear
   * @param {number} settings.finishYear
   * @param {dateRange} [settings.exampleValue]
   */
  constructor({
    templateId,
    startLabel = "Desde",
    finishLabel = "Hasta",
    value = { start: {}, finish: {} },
    startYear,
    finishYear,
    exampleValue,
  }) {
    super({ templateId, component: "field" });
    this.type = "dateRange";
    this.value = this.#copyDateRange(value);
    this.startYear = startYear;
    this.finishYear = finishYear;
    this.startLabel = startLabel;
    this.finishLabel = finishLabel;
    this.exampleValue = exampleValue
      ? this.#copyDateRange(exampleValue)
      : undefined;
  }

  #copyDateRange(value) {
    return { start: { ...value.start }, finish: { ...value.finish } };
  }
}

export default DateRangeFieldTemplate;

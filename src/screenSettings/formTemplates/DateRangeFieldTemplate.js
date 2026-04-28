import Template from "./Template";
import Date from "./DateFieldTemplate";

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
   * @param {dateRange} settings.value
   * @param {number} settings.startYear
   * @param {number} settings.finishYear
   * @param {dateRange} settings.exampleValue
   */
  constructor({
    templateId,
    startLabel = "Desde",
    finishLabel = "Hasta",
    value,
    startYear,
    finishYear,
    exampleValue,
  }) {
    super({ templateId, component: "field" });
    this.type = "date";
    this.value = value;
    this.startYear = startYear;
    this.finishYear = finishYear;
    this.startLabel = startLabel;
    this.finishLabel = finishLabel;
    this.exampleValue = exampleValue;
  }

  get type() {
    return this.type;
  }

  get value() {
    return this.value;
  }

  get startYear() {
    return this.startYear;
  }

  get finishYear() {
    return this.finishYear;
  }

  get startLabel() {
    return this.startLabel;
  }

  get finishLabel() {
    return this.finishLabel;
  }

  get exampleValue() {
    return this.exampleValue;
  }
}

export default DateRangeFieldTemplate;

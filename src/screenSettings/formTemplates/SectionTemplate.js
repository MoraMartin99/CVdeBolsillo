import Template from "./Template";

/**
 * An Icon component that inherits its fill/stroke color from its parent using [the currentColor keyword]{@link https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/color}
 * @typedef {JSX.Element} CurrentColorIcon
 */

/**
 * @typedef {object} template
 * @property {string} templateId
 */

/**
 * The SectionTemplate class defines the properties of the section element
 */
class SectionTemplate extends Template {
  /**
   * Creates the properties of a section element
   * @param {object} settings
   * @param {string} settings.templateId
   * @param {string} [settings.name = "Sección"] The visible tittle
   * @param {Array<template>} settings.value
   * @param {CurrentColorIcon} settings.Icon
   * @param {Array<template>} settings.exampleValue
   * @param {Array<template>} settings.actions
   */
  constructor({
    templateId,
    name = "Sección",
    Icon,
    value,
    actions,
    exampleValue,
  }) {
    super({ templateId, component: "section" });
    Object.assign(this, {
      templateId,
      name,
      Icon,
      value,
      actions,
      exampleValue,
    });
  }

  get name() {
    return this.name;
  }

  get Icon() {
    return this.Icon;
  }

  get value() {
    return this.value;
  }

  get actions() {
    return this.actions;
  }
}

export default SectionTemplate;

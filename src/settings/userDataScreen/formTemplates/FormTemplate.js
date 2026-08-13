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
 * The FormTemplate class defines the properties of the form element
 */
class FormTemplate extends Template {
  /**
   * Creates the properties of a form element
   * @param {object} settings
   * @param {string} settings.templateId
   * @param {string} [settings.name = "formulario"] The visible tittle
   * @param {Array<template>} [settings.value = []]
   * @param {CurrentColorIcon} settings.Icon
   * @param {Array<template>} [settings.exampleValue]
   * @param {Array<template>} [settings.actions = []]
   */
  constructor({
    templateId,
    value = [],
    name = "formulario",
    Icon,
    actions = [],
    exampleValue,
  }) {
    super({ templateId, component: "form" });
    this.value = [...value];
    this.name = name;
    this.Icon = Icon;
    this.actions = [...actions];
    this.exampleValue = exampleValue ? [...exampleValue] : undefined;
  }
}

export default FormTemplate;

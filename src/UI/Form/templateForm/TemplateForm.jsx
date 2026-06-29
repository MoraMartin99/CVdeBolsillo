import { reduceToClassName } from "../../../utils";
import RadioField from "./RadioField";

/**@module TemplateForm */

/**
 * A function that runs on CV template selection
 * @callback onChange
 * @param {string} value The selected option id
 */

/**
 * A CV template
 * @typedef {object} template
 * @property {string} id
 * @property {string} thumbnail
 * @property {JSX.Element} Component
 * @property {string} label
 */

/**
 *  The TemplateForm is a form for capturing the selected CV template
 * @param {object} props
 * @param {string} props.id
 * @param {Array<template>} props.templates The CV templates
 * @param {Array<string>} [props.classArr = []] A list of CSS classes to apply to the component
 * @param {onChange} props.onChange
 * @param {string} [props.cvTemplateId = templates[0].id] The selected CV template id
 * @returns {JSX.Element}
 */
function TemplateForm({
  id,
  templates,
  classArr = [],
  onChange,
  cvTemplateId = templates[0].id,
}) {
  const submitCVTemplateId = (cvTemplateId) => onChange({ cvTemplateId });

  return (
    <form className={reduceToClassName([...classArr])} id={id} action="">
      {
        <RadioField
          options={templates}
          onChange={submitCVTemplateId}
          value={cvTemplateId}
        ></RadioField>
      }
    </form>
  );
}
export default TemplateForm;

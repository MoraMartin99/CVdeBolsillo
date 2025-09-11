/**
 * @typedef {object} radioOption The data required to build a radio input
 * @property {string} id An identifier of the option
 * @property {string} label The visible text of the option
 * @property {string} [thumbnailSrc] A url to an image that represents the option
 * @property {Boolean} [isDefault] If truthy the option is the default, if falsy is not the default unless is the first object within an array. In case multiple radioOption had a truthy value only the first encounter object is the default
 */

/**
 * @typedef {object} fieldProps The Field component properties
 * @property {string} id An identifier of the component. In most of the cases is also use as the id of the input element
 * @property {"monthAndYear"|"monthAndYearRange"|"email"|"image"|"number"|"tel"|"text"|"url"|"item"|"radio"|"range"} [type = "text"] The type of input
 * @property {string} [label = ""] The name and title text of the field. The Label is ignore if type is "dateRange"|"item"
 * @property {*} [value] The value of the input/s
 * @property {Array<string>} [classArr = []] A list of CSS classes to apply to the component
 * @property {string} [tipMessage] A text that is display if the input contains an invalid value
 * @property {onValidation} [onValidation] A callback that runs on fields value and validates that is valid
 * @property {onChange} [onChange] A callback that runs on fields value if the value change and is valid
 * @property {string} [placeholder = ""] A text that is display inside the input as a hint to the user if it doesn't have a value
 * @property {Array<radioOption>} [optionList = []] A list of data required to build related option inputs. Currently works with "radio" type
 */

/**
 * The Field component lets you create inputs with labels, warnings, validations and controls
 * @memberof module:Form
 * @param {fieldProps} prop The Field properties
 * @return {JSX.Element}
 */
function Field({
  id,
  type,
  label,
  value,
  classArr,
  tipMessage,
  onValidation,
  onChange,
  placeholder,
  optionList = [],
}) {}

export default Field;

/**@module validators */

/**
 * The matchRegex function test if a regular expression matches a string
 * @param {string} value
 * @param {RegExp} regex
 * @returns true if value is an string and matches the regex, false if not
 */
const matchRegex = (value, regex) => {
  if (typeof value !== "string") return false;
  return regex.test(value);
};

/**
 * The containsText function validates that a string contains at least 1 letter
 * @param {string} value
 * @returns {boolean} true if value contains at least 1 letter , false if value its not a string or doesn't contain a letter
 */
const containsText = (value) => {
  const regex = /[a-z]/i;
  return matchRegex(value, regex);
};

/**
 * The isImagePath function validates that a valid path points to an image that can be display inside an [image tag]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#supported_image_formats}
 * @param {string} value
 * @returns {boolean} true if the path points to a valid image, false if not
 */
const isImagePath = (value) => {
  const regex = /\.(png|svg|jpeg|webp|jpg|pjpeg|pjp)$/;
  return matchRegex(value, regex);
};

/**
 * The hasSource function validates that an object contains a valid source property
 * @param {object} value
 * @returns {Boolean} true if value is an object that contains a source property that is a string with a length > 0, false if not
 */
const hasSource = (value) => {
  if (typeof value !== "object" || value === null) return false;
  const { source } = value;
  return Boolean(source) && typeof source === "string";
};

/**
 * isValidMail validates that a value is a valid mail
 * @param {string} value
 * @returns {boolean} true if value is a valid mail, false if not
 */
const isValidMail = (value) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  return matchRegex(value, regex);
};

/**
 * The isValidTelNumber validates that a value is a valid phone number
 * @param {string} value
 * @returns {boolean} true if value is a valid phone number, false if not
 */
const isValidTelNumber = (value) => {
  const regex = /^((\+[ ]?)?(\d{1,4}[ -]|\(\d{1,4}\)[ -]))?\d+([ -]\d+)*$/;
  return matchRegex(value, regex);
};

/**
 * The isValidURL validates that a value is a valid URL
 * @param {string} value
 * @returns {boolean} true if value is a valid URL, false if not
 */
const isValidURL = (value) => {
  if (typeof value !== "string") return false;
  try {
    new URL(value);
  } catch {
    return false;
  }
  return true;
};

export {
  containsText,
  isImagePath,
  hasSource,
  isValidMail,
  matchRegex,
  isValidTelNumber,
  isValidURL,
};

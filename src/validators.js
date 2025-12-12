/**@module validators */

/**
 * The containsText function validates that a string contains at least 1 letter
 * @param {string} value
 * @returns {boolean} true if value contains at least 1 letter , false if value its not a string or doesn't contain a letter
 */
const containsText = (value) => {
  if (typeof value !== "string") return false;
  const regex = /[a-z]/i;
  return regex.test(value);
};

/**
 * The isImagePath function validates that a valid path points to an image that can be display inside an [image tag]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#supported_image_formats}
 * @param {string} value
 * @returns {boolean} true if the path points to a valid image, false if not
 */
const isImagePath = (value) => {
  if (typeof value !== "string") return false;
  const regex = /\.(png|svg|jpeg|webp|jpg|pjpeg|pjp)$/;
  return regex.test(value);
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

export { containsText, isImagePath, hasSource };

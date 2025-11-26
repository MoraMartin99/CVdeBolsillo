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

export { containsText, isImagePath };

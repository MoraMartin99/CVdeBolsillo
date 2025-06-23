/**
 * @module utils
 */

/**
 * reduceToClassName function lets you reduce an array to a string format compatible with the react prop className
 * @param {Array<string>} arr An array of css clases
 * @returns {String} A string that represents the reduction of the array input
 */
const reduceToClassName = (arr) => arr.join(" ");

export { reduceToClassName };
export default { reduceToClassName };

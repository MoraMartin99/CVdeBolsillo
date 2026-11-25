/**
 * Converts pixels to points
 * @param {number} length A pixel value
 * @returns {number} A point value
 */
const convertPxToPt = (length) => length * (72 / 96);

export default convertPxToPt;

/**@module  PageSettings*/

/**
 * The settings that represents a letter size paper
 * @typedef {object} letterPageSettings
 * @property {number} width
 * @property {number} height
 * @property {number} marginTop
 * @property {number} marginBottom
 */
const letterPageSettings = {
  width: 816,
  height: 1056,
  marginTop: 40,
  marginBottom: 40,
};

/**
 * The PageSettings represents the properties of a single print page of the CV.
 */
class PageSettings {
  /**
   * Creates the properties of a single print page
   * @param {object} [settings = letterPageSettings]
   * @param {number} settings.width The width of the paper in px
   * @param {number} settings.height The height of the paper in px
   * @param {number} settings.marginTop The margin top of the paper in px
   * @param {number} settings.marginBottom The margin bottom of the paper in px
   */
  constructor({ width, height, marginTop, marginBottom } = letterPageSettings) {
    Object.assign(this, { width, height, marginTop, marginBottom });
  }
}

export default PageSettings;

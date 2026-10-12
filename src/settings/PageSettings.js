/**@module  PageSettings*/

/**
 * The settings that represents a letter size paper
 * @typedef {object} letterPageSettings
 * @property {string} size
 * @property {number} marginTop
 * @property {number} marginBottom
 */
const letterPageSettings = { size: "LETTER", marginTop: 40, marginBottom: 40 };

/**
 * The PageSettings represents the properties of a single print page of the CV.
 */
class PageSettings {
  /**
   * Creates the properties of a single print page
   * @param {object} [settings = letterPageSettings]
   * @param {"LETTER"} settings.size The page size
   * @param {number} settings.marginTop The margin top of the paper in px
   * @param {number} settings.marginBottom The margin bottom of the paper in px
   */
  constructor({ marginTop, marginBottom, size } = letterPageSettings) {
    Object.assign(this, { marginTop, marginBottom, size });
  }
}

export default PageSettings;

/**
 * The ScreenData class defines the properties of a generic screen component
 */
class ScreenData {
  /**
   * Creates a generic screen component
   * @param {object} settings
   * @param {string} settings.label The visible name of the screen
   * @param {string} settings.id
   *
   */
  constructor({ label, id }) {
    Object.assign(this, { label, id });
  }
}

export default ScreenData;

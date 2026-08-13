/**@module Screen */

/**
 * The Screen class defines the properties of a generic screen.
 *A screen is a main interface the user interacts, has its own scroll state and can be access using a navigation system (like tabs)
 */
class Screen {
  /**
   * Creates a generic screen
   * @param {object} settings
   * @param {string} settings.label The visible name of the screen
   * @param {string} settings.id
   *
   */
  constructor({ label, id }) {
    Object.assign(this, { label, id });
  }
}

export default Screen;

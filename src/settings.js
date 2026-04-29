import ScreenData from "./screenSettings/ScreenData";
import userDataScreen from "./screenSettings/userDataScreen";
import templateScreen from "./screenSettings/templateScreen";
import previewScreen from "./screenSettings/previewScreen";

/**
 * The AppSettings class defines the main parameters for the app
 */
class AppSettings {
  /**
   * Creates a setting for the app
   * @param {Object} properties
   * @param {string} [properties.name = "CVdeBolsillo"] The visible name of the app
   * @param {string} [properties.repoUrl = "https://github.com/MoraMartin99/CVdeBolsillo"] The url to the source code of the project
   * @param {Array<ScreenData>} properties.screens
   * @param {number} [properties.minDualPanelScreenWidth = 700] The minimum viewport size in pixels at which the app must show the preview screen at all times
   */
  constructor({
    name = "CVdeBolsillo",
    repoLabel = "Oscar Mora",
    repoUrl = "https://github.com/MoraMartin99/CVdeBolsillo",
    screens,
    minDualPanelScreenWidth = 700,
  }) {
    Object.assign(this, {
      name,
      repoLabel,
      repoUrl,
      screens,
      minDualPanelScreenWidth,
    });
  }

  get name() {
    return this.name;
  }

  get repoLabel() {
    return this.repoLabel;
  }

  get repoUrl() {
    return this.repoUrl;
  }

  get screens() {
    return [...this.screens];
  }

  get minDualPanelScreenWidth() {
    return this.minDualPanelScreenWidth;
  }
}

export default new AppSettings({
  screens: [userDataScreen, templateScreen, previewScreen],
});

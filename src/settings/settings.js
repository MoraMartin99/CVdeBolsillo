import ScreenData from "./ScreenData";
import userDataScreen from "./userDataScreen/userDataScreen";
import templateScreen from "./templateScreen/templateScreen";
import previewScreen from "./previewScreen/previewScreen";
import cvTemplates from "./templateScreen/cvTemplates/index";

/**
 * The AppSettings class defines the main parameters for the app
 */
class AppSettings {
  /**
   * Creates a setting for the app
   * @param {Object} properties
   * @param {string} [properties.name = "CVdeBolsillo"] The visible name of the app
   * @param {string} [properties.repoUrl = "https://github.com/MoraMartin99/CVdeBolsillo"] The url to the source code of the project
   * @param {Array<ScreenData>} [properties.screens = []]
   * @param {number} [properties.minDualPanelScreenWidth = 700] The minimum viewport size in pixels at which the app must show the preview screen at all times
   */
  constructor({
    name = "CVdeBolsillo",
    repoLabel = "Oscar Mora",
    repoUrl = "https://github.com/MoraMartin99/CVdeBolsillo",
    screens = [],
    minDualPanelScreenWidth = 700,
    cvTemplates = [],
  }) {
    Object.assign(this, {
      name,
      repoLabel,
      repoUrl,
      screens: [...screens],
      minDualPanelScreenWidth,
      cvTemplates,
    });
  }
}

export default new AppSettings({
  screens: [userDataScreen, templateScreen, previewScreen],
  cvTemplates,
});

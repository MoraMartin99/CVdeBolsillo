import UserFormsManager from "../Form/userDataForm/FormsManager";
import TemplateForm from "../Form/templateForm/TemplateForm";
import Preview from "../Preview/Preview";

/**
 * A functions to report changes from the screen to the parent
 * @memberof module:Main
 * @callback onChange
 */

/** The data required to build a screen
 * @memberof module:Main
 * @typedef {object} screenData
 * @property {string} label The name of the screen
 * @property {object} data The data required to build the screen component
 * @property {string} id The screen identifier
 */

/**
 *  The data required to build the screens
 * @memberof module:Main
 * @typedef {object} settings
 * @property {Array<screenData>} screensData A list containing the data required to build the screens
 * @property {onChange} onChange A function passed to the screens that reports value's changes to the parent
 * @property {object} userData The data recollected from the forms
 */

/**
 * The buildScreens factory builds the main screens
 * @memberof module:Main
 * @param {settings} settings
 * @returns {Array<JSX.Element>|Array<JSX.Element, JSX.Element>} An array with 2 Carrousel components if hasIndependentLastPanel is truthy or 1 if it's falsy
 */
function buildScreens({ screensData, userData, onChange }) {
  const COMPONENT_1 = "UserFormsManager";
  const COMPONENT_2 = "TemplateForm";
  const COMPONENT_3 = "Preview";

  const buildComponent = (data) => {
    const { component: componentId } = data;
    switch (componentId) {
      case COMPONENT_1:
        return <UserFormsManager {...{ ...data, onChange }}></UserFormsManager>;
      case COMPONENT_2:
        return <TemplateForm {...{ ...data, onChange }}></TemplateForm>;
      case COMPONENT_3:
        return <Preview {...{ ...data, userData }}></Preview>;
    }
  };

  const buildScreen = ({ label, data, id }) => {
    return { label, component: buildComponent(data), id };
  };
  return screensData.map(buildScreen);
}

export default buildScreens;

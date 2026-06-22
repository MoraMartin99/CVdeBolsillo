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
 * isUserFormsManager
 * @param {string} id
 * @returns {boolean}
 */
const isUserFormsManager = (id) => id === "userForm";

/**
 * buildUserFormsManager
 * @param {object} props
 * @returns {JSX.Element}
 */
const buildUserFormsManager = ({ content, templates, onChange }) => {
  return (
    <UserFormsManager {...{ content, templates, onChange }}></UserFormsManager>
  );
};

/**
 * isTemplateForm
 * @param {string} id
 * @returns {boolean}
 * @returns {boolean}
 */
const isTemplateForm = (id) => id === "templateForm";

/**
 * buildTemplateForm
 * @param {object} [props = {}]
 * @returns {JSX.Element}
 */
const buildTemplateForm = (props = {}) => {
  return <TemplateForm {...props}></TemplateForm>;
};

/**
 * isPreview
 * @param {string} id
 * @returns {boolean}
 */
const isPreview = (id) => id === "preview";

/**
 * buildPreview
 * @param {object} [props = {}]
 * @returns {JSX.Element}
 */
const buildPreview = (props = {}) => {
  return <Preview {...props}></Preview>;
};

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
  const buildComponent = (data) => {
    if (isUserFormsManager(data.id)) {
      return buildUserFormsManager({ ...data, onChange });
    }
    if (isTemplateForm(data.id)) return buildTemplateForm(data);
    if (isPreview(data.id)) return buildPreview(data);
  };

  const buildScreen = (data) => {
    return {
      id: data.id,
      label: data.label,
      component: buildComponent(data),
    };
  };

  return screensData.map(buildScreen);
}

export default buildScreens;

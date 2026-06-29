import UserFormsManager from "../Form/userDataForm/FormsManager";
import TemplateForm from "../Form/templateForm/TemplateForm";
import Preview from "../Preview/Preview";

/**
 * A functions to report changes from the screen to the parent
 * @memberof module:Main
 * @callback onChange
 */

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
 * buildTemplateForm
 * @param {object} [props = {}]
 * @returns {JSX.Element}
 */
const buildTemplateForm = ({ id, cvTemplates, onChange, userData }) => {
  return (
    <TemplateForm
      {...{
        id,
        templates: cvTemplates,
        onChange,
        cvTemplateId: userData.cvTemplateId,
      }}
    ></TemplateForm>
  );
};

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
 * @property {Array<object>} cvTemplates The list of CV templates
 */

/**
 * The buildScreens factory builds the main screens
 * @memberof module:Main
 * @param {settings} settings
 * @returns {Array<JSX.Element>|Array<JSX.Element, JSX.Element>} An array with 2 Carrousel components if hasIndependentLastPanel is truthy or 1 if it's falsy
 */
function buildScreens({ screensData, userData, onChange, cvTemplates }) {
  const addUserData = (data) => ({ ...data, userData });

  const addOnChange = (data) => ({ ...data, onChange });

  const addCVTemplates = (data) => ({ ...data, cvTemplates });

  const addComponent = (data) => {
    const builders = {
      userForm: buildUserFormsManager,
      templateForm: buildTemplateForm,
      preview: buildPreview,
    };

    return {
      ...data,
      component: builders[data.id]?.(data),
    };
  };

  const buildScreen = ({ id, label, component }) => {
    return {
      id,
      label,
      component,
    };
  };

  return screensData
    .map(addUserData)
    .map(addOnChange)
    .map(addCVTemplates)
    .map(addComponent)
    .map(buildScreen);
}

export default buildScreens;

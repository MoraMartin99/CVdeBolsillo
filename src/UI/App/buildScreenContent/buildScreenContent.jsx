import UserFormsManager from "../../Form/userDataForm/FormsManager";
import TemplateForm from "../../Form/templateForm/TemplateForm";
import Preview from "../../Preview/Preview";

/**@module buildScreenContent*/

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
 *  The data required to build the screens content
 * @typedef {object} settings
 * @property {Array<import("../../../screenSettings/ScreenData").ScreenData>} screens A list containing the main data required to build the screens content
 * @property {onChange} onChange A function passed to the screens that reports value's changes to the parent
 * @property {object} userData The data recollected from the forms
 * @property {Array<object>} cvTemplates The list of CV templates
 */

/**
 * The buildScreenContent factory builds the main screens content
 * @param {settings} settings
 * @returns {Array<JSX.Element>}
 */
function buildScreenContent({ screens, userData, onChange, cvTemplates }) {
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

  return screens
    .map(addUserData)
    .map(addOnChange)
    .map(addCVTemplates)
    .map(addComponent)
    .map(buildScreen);
}

export default buildScreenContent;

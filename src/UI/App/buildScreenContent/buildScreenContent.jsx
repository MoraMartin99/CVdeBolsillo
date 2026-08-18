import UserFormsManager from "../../Form/userDataForm/FormsManager";
import TemplateForm from "../../Form/templateForm/TemplateForm";
import Preview from "../../Preview/Preview";

/**
 * buildUserFormsManager
 * @param {object} props
 * @returns {JSX.Element}
 */
const buildUserFormsManager = ({ model, resetModel, loadExamples }) => {
  return (
    <UserFormsManager
      {...{ model, resetModel, loadExamples }}
    ></UserFormsManager>
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

function buildScreenContent(settings = {}) {
  const builders = {
    userForm: buildUserFormsManager,
    templateForm: buildTemplateForm,
    preview: buildPreview,
  };

  return builders[settings.id]?.(settings);
}

export default buildScreenContent;

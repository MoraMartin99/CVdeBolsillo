import Carrousel from "../Carrousel/Carrousel";
import UserFormsManager from "../Form/userDataForm/FormsManager";
import TemplateForm from "../Form/templateForm/TemplateForm";
import Preview from "../Preview/Preview";

/**@memberof module:Mai */

/**
 * A functions to report changes from the screen to the parent
 * @callback onChange
 */

/**
 *  The data required to build the screens
 * @typedef {object} settings
 * @property {Array<object>} content A list containing the data required to build the screens
 * @property {onChange} onChange A function passed to the screens that reports value's changes to the parent
 * @property {Boolean} hasIndependentLastPanel if false the function packs all the screens in one container, if true the function packs the last screen in one container and the rest in another
 * @property {object} data The data recollected from the forms
 */

/**
 * The buildScreens factory creates the main screens
 * @param {settings} settings
 * @returns {Array<JSX.Element>|Array<JSX.Element, JSX.Element>} An array with 2 Carrousel components if hasIndependentLastPanel is truthy or 1 if it's falsy
 */
function buildScreens({
  content,
  onChange,
  hasIndependentLastPanel,
  data: userData,
}) {
  const buildComponent = ({
    component,
    data,
    exampleContent,
    templates,
    id,
    currentTemplateId,
  }) => {
    const COMPONENT_1 = "UserFormsManager";
    const COMPONENT_2 = "TemplateForm";
    const COMPONENT_3 = "Preview";
    if (component === COMPONENT_1) {
      return (
        <UserFormsManager
          {...{ data, exampleContent, onChange }}
        ></UserFormsManager>
      );
    } else if (component === COMPONENT_2) {
      return (
        <TemplateForm
          {...{ templates, id, currentTemplateId, onChange }}
        ></TemplateForm>
      );
    } else if (component === COMPONENT_3) {
      return <Preview {...{ data: userData, currentTemplateId }}></Preview>;
    }
  };
  const buildContainer = (screens) => <Carrousel screens={screens}></Carrousel>;
  const grouper = (result, { label, data, id }, index, list) => {
    const filter = (item) => item.length;
    const isLastItem = index === list.length - 1;
    const slot = hasIndependentLastPanel && isLastItem ? result[1] : result[0];
    slot.push({ label, component: buildComponent(data), id });
    if (isLastItem) return result.filter(filter);
    return result;
  };
  const groups = content.reduce(grouper, [[], []]);
  return groups.map(buildContainer);
}

export default buildScreens;

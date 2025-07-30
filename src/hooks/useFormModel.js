import { useState } from "react";

/**@module  useFormModel*/

/**
 * The data required to build a form element model from a template function
 * @typedef {object} templateData
 * @property {string} childrenId A number that identifies the data within its siblings
 */

/**
 * An ordered list that defines the form elements of the component
 * @typedef {Array<templateData>} contentList
 */

/**
 * An id of a templateFunction
 * @typedef {string} templateId
 */

/**
 * An ordered list that defines the actions that can be performed by the component
 * @typedef {Array<templateId>} actionsList
 */

/**
 * The data required to build a form element
 * @typedef {Array<templateData>} formElementModel
 */

/**
 * An ordered list that contains the data required to build a form element
 * @typedef {Array<formElementModel>} formElementModelList
 */

/**
 * An ordered list that contains the data required to build the form elements that collects information
 * @typedef {formElementModelList} contentModelList
 */

/**
 * An ordered list that contains the data required to build the form elements that performs actions in the component
 * @typedef {formElementModelList} actionsModelList
 */

/**
 * A function that return the data required to build a form element
 * @callback templateFunction
 * @param {Object} settings The data required to build a form model
 * @param {number} settings.childrenId A number that identifies the data within its siblings
 * @returns {formElementModel} The data required to build a form element
 */

/**
 * A function that removes the current element from contentList of the closest ancestor that uses the useFormModel hook
 * @callback remover
 */

/**
 * @typedef {Array<contentModelList|actionsModelList>} resultArray The return value of the hook
 */

/**
 * The useFormModel hook lets you set a component as a declarative form-like component, that means that, if paired with a form element factory, you can create
 * a form-like component based on a model, expand it, delete its elements
 * @param {object} settings The settings
 * @param {Object<templateFunction>} settings.templates The collection of function that are use to create the form elements models
 * @param {contentList} settings.contentList An ordered list used as the initial form structure of the form elements that collects information
 * @param {actionsList} settings.actionsList An ordered list that contains the actions that can be performed by the component
 * @param {remover} settings.remover A callback to remove the current element
 * @returns {resultArray}
 */
function useFormModel({
  templates,
  contentList: initialContentList = [],
  actionsList = [],
  remover,
}) {
  const [contentList, setContentList] = useState(initialContentList);

  const getContentModelIndexById = (id) => {
    const finder = ({ id: targetId }) => targetId === id;
    return contentModelList.findIndex(finder);
  };

  const buildContentModel = (settings) => {
    const { templateId } = settings;
    const templateModel = templates[templateId](settings);
    const { id: modelId } = templateModel;
    const onChange = (data) => {
      const [[id, value]] = Object.entries(data);
      const index = getContentModelIndexById(id);

      const mapper = (data, itemIndex) => {
        if (itemIndex === index) return { ...data, value };
        return data;
      };
      setContentList(contentList.map(mapper));
    };
    return { ...templateModel, onChange, remover: () => removeItem(modelId) };
  };

  const buildActionsModel = (settings) => {
    const { childrenId, templateId: actionTemplate } = settings;
    const templateModel = templates[actionTemplate]({ childrenId });
    const { action, templateId } = templateModel;
    const actions = {
      addItem: () => addItem({ templateId }),
      removeItem: () => remover(),
    };
    return { ...templateModel, onClick: actions[action] };
  };

  const contentMapper = (data, index) => {
    const childrenId = index + 1;
    const settings = { ...data, childrenId };
    return buildContentModel(settings);
  };

  const actionsMapper = (templateId, index) => {
    const childrenId = index + 1;
    const settings = { templateId, childrenId };
    return buildActionsModel(settings);
  };

  const addItem = (data) => setContentList([...contentList, data]);

  const removeItem = (id) => {
    const index = getContentModelIndexById(id);
    const filterOutItem = (_, itemIndex) => itemIndex !== index;
    setContentList(contentList.filter(filterOutItem));
  };

  const contentModelList = contentList.map(contentMapper);
  const actionsModelList = actionsList.map(actionsMapper);

  return [contentModelList, actionsModelList];
}

export default useFormModel;

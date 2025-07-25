import { useState } from "react";

/**@module  useFormModel*/

/**
 * The data required to build a form element model from a template function
 * @typedef {object} templateData
 * @property {string} childrenId A number that identifies the data within its siblings
 */

/**
 * An ordered list of the templateData
 * @typedef {Array<templateData>} templateDataList
 */

/**
 * An ordered list that defines the form elements of the component
 * @typedef {Array<templateData>} contentList
 */

/**
 * An ordered list that defines the actions that can be performed by the component
 * @typedef {Array<templateData>} actionsList
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
 * The addItem function lets you add items to the end of the contentList
 * @callback addItem
 * @param {templateData} data The data required to expand the contentList
 */

/**
 * The removeItem function lets you remove an item from the modelList
 * @callback removeItem
 * @param {string} id The id of the form element
 */

/**
 * @typedef {Array<contentModelList|actionsModelList|addItem|removeItem>} resultArray The return value of the hook
 */

/**
 * The useFormModel hook lets you set a component as a declarative form-like component, that means that, if paired with a form element factory, you can create
 * a form-like component based on a model, expand it, delete its elements
 * @param {object} settings The settings
 * @param {Object<templateFunction>} settings.templates The collection of function that are use to create the form elements models
 * @param {contentList} settings.contentList An ordered list used as the initial form structure of the form elements that collects information
 * @param {actionsList} settings.actionsList An ordered list that contains the actions that can be performed by the component
 * @returns {resultArray}
 */
function useFormModel({
  templates,
  contentList: initialContentList = [],
  actionsList = [],
}) {
  const [contentList, setContentList] = useState(initialContentList);

  const buildModel = (settings) => {
    const { templateId } = settings;
    const templateModel = templates[templateId](settings);
    return templateModel;
  };

  const buildContentModel = (settings) => {
    const templateModel = buildModel(settings);
    const onChange = (data) => {
      const [[id, value]] = Object.entries(data);
      const index = getContentModelIndexById(id);

      const mapper = (data, itemIndex) => {
        if (itemIndex === index) return { ...data, value };
        return data;
      };
      setContentList(contentList.map(mapper));
    };
    return { ...templateModel, onChange };
  };

  const contentMapper = (data, index) => {
    const childrenId = index + 1;
    const settings = { ...data, childrenId };
    return buildContentModel(settings);
  };

  const actionsMapper = (data, index) => {
    const childrenId = index + 1;
    const settings = { ...data, childrenId };
    return buildModel(settings);
  };

  const addItem = (data) => setContentList([...contentList, data]);

  const removeItem = (id) => {
    const filterOutItem = ({ id: targetId }) => targetId !== id;
    const newModelList = modelList.filter(filterOutItem);
    setModelList(newModelList);
  };

  const contentModelList = contentList.map(contentMapper);
  const actionsModelList = actionsList.map(actionsMapper);

  return [contentModelList, actionsModelList, addItem, removeItem];
}

export default useFormModel;

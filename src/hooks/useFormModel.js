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
 * An ordered list that contains the data required to build the form elements that performs actions in the component
 * @typedef {formElementModelList} actionsModelList
 */

/**
 * A function that return the data required to build a form element
 * @callback templateFunction
 * @param {number} numberId A number that identifies the form element and is use in some properties
 * @returns {data} The data required to build a form element
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
 * @param {Object<templateFunction>} settings.templates The collection of function that can be used to create new entries in the modelList
 * @param {modelList} settings.initialModelList An ordered list used as the initial base model
 * @param {actionsList} settings.actionsList An ordered list that contains the actions that can be performed by the component
 * @returns {resultArray}
 */
function useFormModel({
  templates,
  actionsList = [],
}) {

  const buildModel = (settings) => {
    const { templateId } = settings;
    const templateModel = templates[templateId](settings);
    return templateModel;
  };

    const onChange = (data) => {
      const [id, value] = Object.entries(data);

      const mapper = (data) => {
        const { id: targetId } = data;
        if (targetId === id) return { ...data, value };
      };

      setModelList(modelList.map(mapper));
    };

    return { ...data, onChange };
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

  const actionsModelList = actionsList.map(actionsMapper);

  return [contentModelList, actionsModelList, addItem, removeItem];
}

export default useFormModel;

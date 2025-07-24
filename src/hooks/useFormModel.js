import { useState } from "react";

/**@module  useFormModel*/

/**
 * The data required to build a form element
 * @typedef {object} data
 */

/**
 * An ordered list that contains the data required to build a collection of form element
 * @typedef {Array<data>} modelList
 */

/**
 * A function that return the data required to build a form element
 * @callback templateFunction
 * @param {number} numberId A number that identifies the form element and is use in some properties
 * @returns {data} The data required to build a form element
 */

/**
 * The addItem function lets you expand the modelList with an item based on a template
 * @callback addItem
 * @param {string} templateId
 */

/**
 * The removeItem function lets you remove an item from the modelList
 * @callback removeItem
 * @param {string} id The id of the form element
 */

/**
 * @typedef {Array<modelList|addItem|removeItem>} resultArray The return value of the hook
 */

/**
 * The useFormModel hook lets you set a component as a declarative form-like component, that means that, if paired with a form element factory, you can create
 * a form-like component based on a model, expand it, delete its elements
 * @param {object} settings The settings
 * @param {Object<templateFunction>} settings.templates The collection of function that can be used to create new entries in the modelList
 * @param {modelList} settings.initialModelList An ordered list used as the initial base model
 * @returns {resultArray}
 */
function useFormModel({ templates, initialModelList }) {
  const [modelList, setModelList] = useState(initialModelList);

  const setOnChange = (data) => {
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

  const addItem = (templateId) => {
    const id = modelList.length + 1;
    const data = setOnChange(templates[templateId](id));
    const newModelList = [...modelList, data];
    setModelList(newModelList);
  };

  const removeItem = (id) => {
    const filterOutItem = ({ id: targetId }) => targetId !== id;
    const newModelList = modelList.filter(filterOutItem);
    setModelList(newModelList);
  };

  return [modelList.map(setOnChange), addItem, removeItem];
}

export default useFormModel;

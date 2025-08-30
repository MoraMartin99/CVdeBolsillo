import { useState } from "react";
import { toPascalCase } from "../utils";

/** @module useFormModel */

/**
 * An id of a templateModel
 * @typedef {string} templateId
 */

/**
 * An ordered list that defines which form action elements must be built
 * @typedef {Array<templateId>} actions
 */

/**
 * The data require to define the structure and some chacteristics of the contentModelItem
 * @typedef {Object} contentItem
 * @property {templateId} templateId An id of the target model
 * @property {*|content} [value]
 * @property {actions} [actions = []] If the element has actions like add items or remove the current element, must be declared here
 */

/**
 * An ordered list that defined which form elements must be built
 * @typedef {Array<contentItem>} content
 */

/**
 * A function that verify if a value is valid
 * @callback validator
 * @param {*} value
 * @return {string} A text that represents the [errorMessage for the setCustomValidity method]{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity}
 */

/**
 * The data required to build an option for a radio field
 * @typedef {Object} option
 * @property {string} id
 * @property {string} label A text that represents the option
 * @property {string} [image] The path to an image that represents the option
 *
 */

/**
 * The data required to build a form element model
 * @typedef {Object} templateFormElementModel
 * @property {templateId} templateId The id that identifies the template within its siblings
 * @property {string} component The type of form element
 * @property {string} [type] The type of component
 * @property {string} [label] A text that represents the element and is display in a visible place of the element. In form and section elements is display as a tittle, in field elements as a label and in action elements as a text content
 * @property {CurrentColorIcon} [Icon] The icon component that represents the form element
 * @property {string} [tipMessage] A text that is display if the form element doesn't meet its  [constraint validation]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation}
 * @property {validator} [validator] A function that verify if a value is valid. If defined, has preference over the default validity constraints
 * @property {string} [minMarkLabel] The label of the minimum side of the spectrum of values  some field can have.
 * @property {string} [maxMarkLabel] The label of the maximum side of the spectrum of values  some field can have.
 * @property {string} [defaultActionLabel] The label for the default action of a field
 * @property {string} [destructiveActionLabel] The label for the destructive action of a field
 * @property {Array<option>} [optionList] A list with the values some fields can have. The first item is consider the default value
 */

/**
 * The data required to build an action element model
 * @typedef {Object} templateActionModel
 * @property {templateId} templateId The id that identifies the template within its siblings
 * @property {string} component The type of form element
 * @property {string} label
 * @property {string} action
 * @property {contentItem} [content]
 * @property {CurrentColorIcon} [Icon]
 */

/**
 * @typedef {Object} templates
 * @property {templateFormElementModel|templateActionModel} templateModel
 */

/**
 * @typedef {object}  formElementModel
 */

/**
 * @typedef {object} actionElementModel
 */

/**
 * @typedef {Array<formElementModel>} contentModel
 */

/**
 * @typedef {Array<actionElementModel>} actionsModel
 */

/**
 * The useFormModel hook provides a mechanism to create and modify a declarative form model 
 * @param {object} settings The settings
 * @param {templates} settings.templates The collection of function that are use to create the form elements models
 * @param {content} [settings.content = []] An ordered list used as the initial form structure of the form elements that collects information
 * @param {actions} [settings.actions = []] An ordered list that contains the actions that can be performed by the component
 * @example
 * 
 * const templates = {
  section: {
    templateId: "section",
    actions: ["removeItem", "addNumber"],
    value: [{ templateId: "text" }, { templateId: "number" }],
  },
  text: { templateId: "text", value: "soy un texto" },
  number: { templateId: "number" },
  addNumber: { templateId: "addNumber", action: "addItem", targetId: "number" },
  removeItem: { templateId: "removeItem", action: "removeItem" },
};

const actions = ["addNumber"];

const content = [
  { templateId: "section" },
  { templateId: "number" },
  { templateId: "text" },
];

 * const TestElement = ({ templates, content, actions }) => {
      const [contentModel, actionsModel] = useFormModel({
        templates,
        content,
        actions,
      });

      return <div></div>;
    };
 * @returns {Array<contentModel, actionsModel>}
 */
function useFormModel({
  content: initialContent = [],
  actions = [],
  templates,
}) {
  const [content, setContent] = useState(initialContent);

  const findSteps = (id, model) => {
    const finder = (id, list) => {
      let result = [];
      const itEndsWithTarget = () => {
        const { id: itemId } = result[result.length - 1];
        return id === itemId;
      };
      for (const [index, { value, id: itemId }] of list.entries()) {
        result = [{ index, id: itemId }];
        if (itEndsWithTarget()) break;
        if (Array.isArray(value)) {
          result.push(...finder(id, value));
          if (itEndsWithTarget()) break;
        }
        result = [];
      }

      return result;
    };
    return finder(id, model).map(({ index }) => index);
  };

  const mutateContent = ({ id, mutator }) => {
    const steps = findSteps(id, contentModel);
    const containerSteps = steps.slice(0, -1);
    const targetReducer = (container, item, index) => {
      const finalContainer = !index ? container : container.value;
      return finalContainer[item];
    };
    const containerReducer = (container, item, index) => {
      const finalContainer = !index ? container : container.value;
      return finalContainer[item].value;
    };
    let newContent = structuredClone(content);
    let target = steps.length
      ? steps.reduce(targetReducer, newContent)
      : undefined;
    let container = containerSteps.reduce(containerReducer, newContent);
    mutator(target, container);
    setContent(newContent);
  };

  const addContentItem = ({ targetId, templateId }) => {
    const newItem = { templateId };
    const addContent = (target, container) => {
      targetId ? target.value.push(newItem) : container.push(newItem);
    };
    mutateContent({ id: targetId, mutator: addContent });
  };

  const removeContentItem = (targetId) => {
    const removeItem = (target, container) => {
      const targetIndex = container.indexOf(target);
      if (targetIndex >= 0) container.splice(targetIndex, 1);
    };
    mutateContent({ id: targetId, mutator: removeItem });
  };

  const onChange = (data) => {
    const [[id, value]] = Object.entries(data);
    const setValue = (item) => (item.value = value);
    mutateContent({ id, mutator: setValue });
  };

  const createId = ({ parentId, templateId, childrenId }) => {
    return parentId
      ? `${parentId}${toPascalCase(templateId)}${childrenId}`
      : `${templateId}${childrenId}`;
  };

  const actionsMapper = (item, index) => {
    const templateId = typeof item === "string" ? item : item.templateId;
    const templateModel = templates[templateId];
    if (!templateModel) return;
    const { action, targetId } = templateModel;
    const parentId = typeof item === "string" ? undefined : item.parentId;
    const childrenId = index + 1;
    const id = createId({ childrenId, parentId, templateId });
    const actionFunctions = {
      addItem: () => addContentItem({ id: parentId, templateId: targetId }),
      removeItem: () => removeContentItem(parentId),
    };

    return {
      ...templateModel,
      childrenId,
      id,
      onClick: actionFunctions[action],
    };
  };

  const contentMapper = (item, index) => {
    if (typeof item !== "object") return item;
    const { templateId, value: contentValue, parentId } = item;
    const templateModel = templates[templateId];
    if (!templateModel) return item;
    const { value: defaultValue, actions: initialActions = [] } = templateModel;
    const preferredValue =
      contentValue === undefined ? defaultValue : contentValue;
    const childrenId = index + 1;
    const id = createId({ childrenId, parentId, templateId });
    const contentMapperAdapter = (item, index) => {
      return contentMapper({ ...item, parentId: id }, index);
    };
    const actionsMapperAdapter = (templateId, index) => {
      return actionsMapper({ templateId, parentId: id }, index);
    };
    const value = Array.isArray(preferredValue)
      ? preferredValue.map(contentMapperAdapter)
      : preferredValue;
    const actions = initialActions.map(actionsMapperAdapter);

    return {
      ...templateModel,
      id,
      templateId,
      childrenId,
      value,
      onChange,
      actions,
    };
  };

  const contentModel = content.map(contentMapper);
  const actionsModel = actions.map(actionsMapper);

  return [contentModel, actionsModel];
}

export default useFormModel;

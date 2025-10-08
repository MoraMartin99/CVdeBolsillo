import { useRef, useState } from "react";
import { toPascalCase } from "../utils";
import { cloneDeep } from "lodash";

/** @module useFormModel */

/**
 * An id of a templateModel
 * @typedef {string} templateId
 * An ordered list containing the data required to build form elements
 * @typedef {Array<object>} model
 */

/**
 * An ordered list that defines which form action elements must be built
 * @typedef {Array<templateId>} actions
 * A function that sets the model using new templates and/or new content
 * @callback setModel
 * @param {object} settings
 * @param {object} [settings.templates] A collections of objects used as a base to construct the form elements. Its default value is the last templates
 * @param {Array<object>} [settings.content] An ordered list used as the initial structure of the model. Its default value is the last content
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

 * The useFormModel hook provides a mechanism to create and modify declarative form elements
 * @param {object} templates A collections of objects used as a base to construct the form elements
 * @param {Array<object>} content An ordered list used as the initial structure of the model
 * @example
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
  formA: { templateId: "formA", actions: ["addNumber"] },
  formB: {
    templateId: "formB",
    value: [{ templateId: "section" }],
    actions: ["addNumber"],
  },
  formC: { templateId: "formC", value: [{ templateId: "number" }] },
};

const content = [
  { templateId: "formB" },
  { templateId: "formC" },
];

const TestElement = ({ templates, content }) => {
      const [model, setModel] = useFormModel(content, templates);

      return <div></div>;
    };
 * @returns {Array<model, setModel>}
 */
function useFormModel(content = [], templates = {}) {
  const contentRef = useRef(content);
  const templatesRef = useRef(templates);
  const [model, setModel] = useState(buildModel(content, templates));

  const addContentItem = (targetId, templateId) => {
    const addContent = ({ value, id: parentId }) => {
      const content = [{ templateId, parentId }];
      const templates = templatesRef.current;
      const [target] = buildModel(content, templates);
      value.push(target);
    };
    mutateModel(targetId, addContent);
  };

  const removeContentItem = (targetId) => {
    const removeItem = (target, container) => {
      const targetIndex = container.indexOf(target);
      container.splice(targetIndex, 1);
    };
    mutateModel(targetId, removeItem);
  };

  function onChange(data) {
    const [[id, value]] = Object.entries(data);
    const setValue = (item) => (item.value = value);
    mutateModel(id, setValue);
  }

  function createId({ parentId, templateId, childrenId }) {
    return parentId
      ? `${parentId}${toPascalCase(templateId)}${childrenId}`
      : `${templateId}${childrenId}`;
  }

  function buildModel(content, templates) {
    const buildItem = (item, index) => {
      if (typeof item !== "object") return item;
      const { templateId, value: contentValue, parentId } = item;
      const templateModel = templates[templateId];
      if (!templateModel) return item;
      const buildValue = (item, index) => {
        return buildItem({ ...item, parentId: id }, index);
      };
      const buildActions = (templateId, index) => {
        return buildItem({ templateId, parentId: id }, index);
      };
      const {
        value: defaultValue,
        actions: initialActions = [],
        action,
        targetId,
      } = templateModel;
      const preferredValue =
        contentValue === undefined ? defaultValue : contentValue;
      const childrenId = index + 1;
      const id = createId({ childrenId, parentId, templateId });
      const value = Array.isArray(preferredValue)
        ? preferredValue.map(buildValue)
        : preferredValue;
      const actions = initialActions.map(buildActions);
      const actionFunctions = {
        addItem: () => addContentItem(parentId, targetId),
        removeItem: () => removeContentItem(parentId),
      };

      return {
        ...templateModel,
        id,
        templateId,
        childrenId,
        value,
        onChange,
        actions,
        onClick: actionFunctions[action],
      };
    };
    return content.map(buildItem);
  }

  const replaceModel = ({ content: newContent, templates: newTemplates }) => {
    if (newContent) contentRef.current = newContent;
    if (newTemplates) templatesRef.current = newTemplates;
    setModel(buildModel(contentRef.current, templatesRef.current));
  };

  const mutateModel = (id, mutator) => {
    const newModel = cloneDeep(model);

    const getReferences = (id, list) => {
      for (const target of list) {
        if (typeof target !== "object") continue;
        const { id: currentId, value } = target;
        if (currentId === id) return [target, list];
        if (!Array.isArray(value)) continue;
        const result = getReferences(id, value);
        if (result) return result;
      }
    };

    const [target, container] = getReferences(id, newModel);

    mutator(target, container);
    setModel(newModel);
  };

  return [model, replaceModel];
}

export default useFormModel;

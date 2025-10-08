import { useRef, useState } from "react";
import { toPascalCase } from "../utils";
import { cloneDeep } from "lodash";

/** @module useFormModel */

/**
 * An ordered list containing the data required to build form elements
 * @typedef {Array<object>} model
 */

/**
 * A function that sets the model using new templates and/or new content
 * @callback setModel
 * @param {object} settings
 * @param {object} [settings.templates] A collections of objects used as a base to construct the form elements. Its default value is the last templates
 * @param {Array<object>} [settings.content] An ordered list used as the initial structure of the model. Its default value is the last content
 */

/**
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

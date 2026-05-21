import { useCallback, useRef, useState } from "react";
import { toPascalCase } from "../utils";
import { cloneDeep } from "lodash";

/** @module useFormModel */

/**
 * An ordered list containing the data required to build form elements
 * @typedef {Array<object>} model
 */

/**
 * A function that sets the exampleValue property (if defined) as the current value for every item in the model
 * @callback loadExamples
 * @returns {void}
 */

/**
 * A function that resets the model to the its initial value, cleaning any changes made
 * @callback resetModel
 * @returns {void}
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
      const { model, resetModel, loadExamples } = useFormModel(
        content,
        templates,
      );

      return <div></div>;
    };
 * @returns {{model: model, resetModel: resetModel, loadExamples: loadExamples}}
 */
function useFormModel(content = [], templates = {}) {
  const mutateModel = useCallback((mutator) => {
    const mutateState = (model) => {
      const newModel = cloneDeep(model);
      mutator(newModel);
      return newModel;
    };

    setModel(mutateState);
  }, []);

  const hasTemplateId = useCallback((item) => {
    if (typeof item !== "object" || item === null) return false;
    return Boolean(item.templateId);
  }, []);

  const getModelItemReference = useCallback(
    (id, model) => {
      const isTargetItem = (item) => item.id === id;
      for (const item of model) {
        if (!hasTemplateId(item)) continue;
        if (isTargetItem(item)) return [item, model];
        if (!Array.isArray(item.value)) continue;
        const recursiveResult = getModelItemReference(id, item.value);
        if (recursiveResult) return recursiveResult;
      }
    },
    [hasTemplateId],
  );

  const submitData = useCallback(
    (id, data) => {
      const mutator = (model) => {
        const [modelItem] = getModelItemReference(id, model);
        for (const key in data) modelItem[key] = data[key];
      };

      mutateModel(mutator);
    },
    [getModelItemReference, mutateModel],
  );

  const buildModel = (content, templates) => {
    const mergeWithTemplate = (item) => {
      return { ...templates[item.templateId], ...item };
    };

    const addId = (item) => {
      const { parentId, templateId, childrenId } = item;

      const createId = ({
        parentId = "",
        templateId = "",
        childrenId = "",
      }) => {
        return parentId
          ? `${parentId}${toPascalCase(templateId)}${childrenId}`
          : `${templateId}${childrenId}`;
      };

      return { ...item, id: createId({ parentId, templateId, childrenId }) };
    };

    const enrichChildren = (item) => {
      const { value, actions, id: parentId } = item;
      const hasListValue = ([, value]) => Array.isArray(value);
      const enrich = ([key, value]) => {
        const addParentId = (item) => ({ ...item, parentId });
        const buildChild = (item, index) => ({ ...buildItem(item, index) });
        return [
          key,
          value.filter(hasTemplateId).map(addParentId).map(buildChild),
        ];
      };
      const enrichedChildren = Object.fromEntries(
        Object.entries({ value, actions }).filter(hasListValue).map(enrich),
      );

      return { ...item, ...enrichedChildren };
    };

    const setAction = (item) => {
      const { targetId, parentId, action } = item;

      const addItem = () => {
        const mutator = (model) => {
          const [{ value: container }] = getModelItemReference(parentId, model);
          container.push(buildItem({ templateId: targetId, parentId }));
        };

        mutateModel(mutator);
      };

      const removeItem = () => {
        const mutator = (model) => {
          const [item, container] = getModelItemReference(parentId, model);
          container.splice(container.indexOf(item), 1);
        };

        mutateModel(mutator);
      };

      const actions = { addItem, removeItem };
      return { ...item, onClick: actions[action] };
    };

    const addSubmitData = (item) => {
      return item.action ? { ...item } : { ...item, submitData };
    };

    const buildItem = (item, index) => {
      if (!hasTemplateId(item)) return item;

      const addChildrenId = (item) => ({ ...item, childrenId: index + 1 });

      const enrichItem = (result, callback) => ({ ...callback(result) });

      return {
        ...[
          mergeWithTemplate,
          addChildrenId,
          addId,
          setAction,
          addSubmitData,
          enrichChildren,
        ].reduce(enrichItem, item),
      };
    };

    return content.map(buildItem);
  };

  const contentRef = useRef(content);
  const templatesRef = useRef(templates);
  const [model, setModel] = useState(buildModel(content, templates));

  const resetModel = () => {
    setModel(buildModel(contentRef.current, templatesRef.current));
  };

  const loadExamples = () => {
    const mutator = (model) => {
      const applyTransformation = (item) => {
        if (!hasTemplateId(item)) return;
        const hasExampleValue = ({ exampleValue }) => !(exampleValue == null);
        if (hasExampleValue(item)) item.value = item.exampleValue;
        if (Array.isArray(item.value)) item.value.forEach(applyTransformation);
      };

      model.forEach(applyTransformation);
    };

    mutateModel(mutator);
  };

  return { model, resetModel, loadExamples };
}

export default useFormModel;

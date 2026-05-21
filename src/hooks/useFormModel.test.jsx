import { describe, it, beforeEach, vi, expect, beforeAll } from "vitest";
import { render } from "vitest-browser-react";
import { act } from "react";

const catcherMock = vi.fn(() => {});

const getLastCall = () => catcherMock.mock.lastCall[0];

const templates = {
  section: {
    templateId: "section",
    actions: [{ templateId: "removeItem" }, { templateId: "addNumber" }],
    value: [{ templateId: "text" }, { templateId: "number" }],
  },
  text: {
    templateId: "text",
    value: "soy un texto",
    exampleValue: "soy un valor de ejemplo",
  },
  number: { templateId: "number", exampleValue: 350 },
  addNumber: { templateId: "addNumber", action: "addItem", targetId: "number" },
  removeItem: { templateId: "removeItem", action: "removeItem" },
  formA: { templateId: "formA", actions: [{ templateId: "addNumber" }] },
  formB: {
    templateId: "formB",
    value: [{ templateId: "section" }],
    actions: [{ templateId: "addNumber" }],
  },
  formC: { templateId: "formC", value: [{ templateId: "number" }] },
};

const newValue = 7;
const changedValue = "soy un valor sobrescrito";

const content = [
  { templateId: "formB" },
  { templateId: "formA", value: newValue },
  {
    templateId: "formC",
    value: changedValue,
  },
  { templateId: "formC" },
];

const buildModel = (content, templates) => {
  const mapper = ({ templateId, value: contentValue }) => {
    const { value: defaultValue } = templates[templateId];
    const currentValue = contentValue ? contentValue : defaultValue;
    const value = Array.isArray(currentValue)
      ? currentValue.map(mapper)
      : currentValue;
    return { templateId, value };
  };
  return content.map(mapper);
};

const simplifyModel = ({ templateId, value: defaultValue }) => {
  const value = Array.isArray(defaultValue)
    ? defaultValue.map(simplifyModel)
    : defaultValue;
  return { templateId, value };
};

const flatModel = (model) => {
  const reducer = (result, current) => {
    const hasTemplateId = (item) => {
      if (typeof item !== "object" || item === null) return false;
      return Boolean(item.templateId);
    };
    const isArray = (item) => Array.isArray(item);
    if (!hasTemplateId(current)) return [...result];
    return [
      ...result,
      current,
      ...[current.value, current.actions].filter(isArray).flatMap(flatModel),
    ];
  };
  return model.reduce(reducer, []);
};

describe("useFormModel", () => {
  beforeAll(() => {
    window.IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(async () => {
    vi.doMock("../utils.js", async (importOriginal) => {
      const mod = await importOriginal();
      return {
        ...mod,
        toPascalCase: vi.fn((text) => text),
      };
    });
    vi.resetAllMocks();
    let useFormModel = (await import("./useFormModel")).default;
    const TestElement = ({ templates, content }) => {
      const { model, resetModel, loadExamples } = useFormModel(
        content,
        templates,
      );
      catcherMock({ model, resetModel, loadExamples, templates, content });

      return <div></div>;
    };
    await render(<TestElement {...{ templates, content }}></TestElement>);
  });

  describe("returns the correct model", () => {
    it("items hierarchy are based on the content", () => {
      const { content, model, templates } = getLastCall();
      const expectedValue = buildModel(content, templates);
      const value = model.map(simplifyModel);
      expect(value).toEqual(expectedValue);
    });

    it("items ids are based on the ancestor tree and the position within its siblings", () => {
      const { model } = getLastCall();
      const setExpectations = (
        { templateId, id, parentId, value, actions },
        index,
      ) => {
        const expectedId = `${parentId ? parentId : ""}${templateId}${index + 1}`;
        const setter = (item, index) => {
          setExpectations({ ...item, parentId: id }, index);
        };
        if (Array.isArray(value)) value.forEach(setter);
        if (Array.isArray(actions)) actions.forEach(setter);
        expect(id).toBe(expectedId);
      };
      model.forEach((item, index) => setExpectations(item, index));
    });

    it("content items can overwrite and extends its base template", () => {
      const { model } = getLastCall();
      const expectedValues = [newValue, changedValue];
      const setExpectations = (value) => {
        const valueTester = ({ value: modelValue }) => modelValue === value;
        expect(model.some(valueTester)).toBeTruthy();
      };
      expectedValues.forEach(setExpectations);
    });
  });

  it("adds items to the model", () => {
    const { model: initialModel, templates } = getLastCall();
    const { onClick: execute, targetId } = initialModel[0].actions[0];
    const expectedItem = buildModel([{ templateId: targetId }], templates)[0];
    act(() => execute());
    const { model: finalModel } = getLastCall();
    const lastItem = finalModel.map(simplifyModel)[0].value[1];
    expect(lastItem).toEqual(expectedItem);
  });

  it("removes items from the model", () => {
    const { model: initialModel } = getLastCall();
    const initialItem = initialModel[0].value;
    const { onClick: execute } = initialModel[0].value[0].actions[0];
    act(() => execute());
    const { model: finalModel } = getLastCall();
    const finalItem = finalModel[0].value;
    expect(initialItem).not.equal(finalItem);
    expect(finalItem).toHaveLength(0);
  });

  it("sets properties inside items", () => {
    const initialItem = getLastCall().model[3];
    const { submitData, id } = initialItem;
    const properties = { value: 105, newKey1: "hola", newMethod: () => {}, id };
    act(() => submitData(id, properties));
    const finalItem = getLastCall().model[3];
    expect(initialItem).not.toEqual(expect.objectContaining(properties));
    expect(finalItem).toEqual(expect.objectContaining(properties));
  });

  it("loads the example values", () => {
    const { loadExamples, model: initialModel } = getLastCall();
    const exampleValueIsLoaded = ({ exampleValue, value }) => {
      return exampleValue === undefined ? true : exampleValue === value;
    };
    act(() => loadExamples());
    const { model: finalModel } = getLastCall();
    expect(flatModel(initialModel).every(exampleValueIsLoaded)).toBeFalsy();
    expect(flatModel(finalModel).every(exampleValueIsLoaded)).toBeTruthy();
  });

  it("resets the current value to the initial values", () => {
    const { resetModel, loadExamples } = getLastCall();
    const getModelValues = () => {
      const extractData = ({ id, value }) => ({ id, value });
      return JSON.parse(
        JSON.stringify(flatModel(getLastCall().model).map(extractData)),
      );
    };
    const initialModelValues = getModelValues();
    act(() => loadExamples());
    const exampleModelValues = getModelValues();
    act(() => resetModel());
    const finalModelValues = getModelValues();

    expect(finalModelValues).not.toEqual(exampleModelValues);
    expect(finalModelValues).toEqual(initialModelValues);
  });
});

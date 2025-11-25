import { describe, it, beforeEach, vi, expect, afterEach } from "vitest";
import { act, render } from "@testing-library/react";

const catcherMock = vi.fn(() => {});

const getLastCall = () => catcherMock.mock.lastCall[0];

const templates = {
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

describe("useFormModel", () => {
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
      const [model, setModel] = useFormModel(content, templates);
      catcherMock({ model, setModel, templates, content });

      return <div></div>;
    };
    render(<TestElement {...{ templates, content }}></TestElement>);
  });

  afterEach(() => vi.resetAllMocks());

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

  describe("generates a new model by setting its parameters", () => {
    const parameters = [
      {},
      { content: [{ templateId: "formC" }] },
      {
        templates: {
          ...templates,
          text: { templateId: "text", value: "texto cambiado" },
          number: { templateId: "number", value: 3.1416 },
        },
      },
    ];

    it.each(parameters)(
      "replaces with its initial values the undefined parameters: { content: $content, templates: $templates }",
      ({ content, templates }) => {
        const {
          setModel,
          content: initialContent,
          templates: initialTemplates,
        } = getLastCall();
        const finalContent = content ? content : initialContent;
        const finalTemplates = templates ? templates : initialTemplates;
        const expectedModel = buildModel(finalContent, finalTemplates);
        act(() => setModel({ content, templates }));
        const currentModel = getLastCall().model.map(simplifyModel);
        expect(currentModel).toEqual(expectedModel);
      },
    );
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
    act(() => submitData(properties));
    const finalItem = getLastCall().model[3];
    expect(initialItem).not.toEqual(expect.objectContaining(properties));
    expect(finalItem).toEqual(expect.objectContaining(properties));
  });
});

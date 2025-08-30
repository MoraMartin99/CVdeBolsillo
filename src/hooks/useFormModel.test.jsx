import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, act } from "@testing-library/react";

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
};

const actions = ["addNumber"];

const newValue = 7;
const changedValue = "soy un valor sobrescrito";

const content = [
  { templateId: "section" },
  { templateId: "number", value: newValue },
  { templateId: "text", value: changedValue },
];

describe("useFormModel hook", () => {
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
    const TestElement = ({ templates, content, actions }) => {
      const [contentModel, actionsModel] = useFormModel({
        templates,
        content,
        actions,
      });
      catcherMock({ contentModel, actionsModel });

      return <div></div>;
    };
    render(<TestElement {...{ templates, actions, content }}></TestElement>);
  });

  describe("returns the corresponding models", () => {
    it("contentModel items hierarchy are based on the content", () => {
      const modelBuilder = ({ templateId, value: contentValue }) => {
        const { value: defaultValue } = templates[templateId];
        const currentValue = contentValue ? contentValue : defaultValue;
        const value = Array.isArray(currentValue)
          ? currentValue.map(modelBuilder)
          : currentValue;
        return { templateId, value };
      };
      const modelSimplifier = ({ templateId, value: defaultValue }) => {
        const value = Array.isArray(defaultValue)
          ? defaultValue.map(modelSimplifier)
          : defaultValue;
        return { templateId, value };
      };
      const expectedValue = content.map(modelBuilder);
      const value = getLastCall().contentModel.map(modelSimplifier);
      expect(value).toEqual(expectedValue);
    });

    it("actionsModel items hierarchy are based on the actions", () => {
      const modelSimplifier = ({ templateId }) => templateId;
      const value = getLastCall().actionsModel.map(modelSimplifier);
      expect(value).toEqual(actions);
    });

    it("contentItems can overwrite and extends its base template", () => {
      const contentModel = getLastCall().contentModel;
      const expectedValues = [newValue, changedValue];
      const setExpectations = (value) => {
        const valueTester = ({ value: modelValue }) => modelValue === value;
        expect(contentModel.some(valueTester)).toBeTruthy();
      };
      expectedValues.forEach(setExpectations);
    });

    it("models items ids are condition by the ancestor tree and the position within its siblings", () => {
      const modelList = Object.values(getLastCall());
      const setExpectations = ({ templateId, id, parentId, value }, index) => {
        const expectedId = `${parentId ? parentId : ""}${templateId}${index + 1}`;
        const setter = (item, index) => {
          setExpectations({ ...item, parentId: id }, index);
        };
        if (Array.isArray(value)) value.forEach(setter);
        expect(id).toBe(expectedId);
      };
      modelList.forEach((model) => model.forEach(setExpectations));
    });
  });

  it("adds items to the contentModel", () => {
    const { onClick: execute } = getLastCall().actionsModel[0];
    const expectedId = "number";
    const initialModel = getLastCall().contentModel;
    const { templateId: initialId } = initialModel[initialModel.length - 1];
    expect(initialId).not.toBe(expectedId);
    act(() => execute());
    const finalModel = getLastCall().contentModel;
    const { templateId: finalId } = finalModel[finalModel.length - 1];
    expect(finalId).toBe(expectedId);
  });

  it("removes items from the contentModel", () => {
    const { onClick: execute } = getLastCall().contentModel[0].actions[0];
    const expectedItem = getLastCall().contentModel[0];
    expect(expectedItem).toBeTruthy();
    act(() => execute());
    const contentModel = getLastCall().contentModel;
    expect(contentModel).not.toContainEqual(expectedItem);
  });

  it("modifies the values in the contentModel", () => {
    const { onChange, id, value: initialValue } = getLastCall().contentModel[2];
    const expectedValue = 100;
    expect(initialValue).not.toBe(expectedValue);
    act(() => onChange({ [id]: expectedValue }));
    const { value: finalValue } = getLastCall().contentModel[2];
    expect(finalValue).toBe(expectedValue);
  });
});

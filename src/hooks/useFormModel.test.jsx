import { beforeEach, describe, expect, it, vi } from "vitest";
import useFormModel from "./useFormModel";
import { render, act } from "@testing-library/react";

const catcherMock = vi.fn(() => {});
const getLastCall = () => catcherMock.mock.lastCall[0];
const formElementTemplateId = "formElement";
const actionButtonTemplateId = "actionButton";
const contentList = [
  { templateId: formElementTemplateId, removeMessage: "remove me" },
  { templateId: formElementTemplateId, value: "test2" },
];
const actionsList = [actionButtonTemplateId];
const templates = {
  [formElementTemplateId]: (data) => {
    const { childrenId } = data;
    return {
      id: `${formElementTemplateId}${childrenId}`,
      value: "soy un template 1",
      type: "some random form element",
      ...data,
    };
  },
  [actionButtonTemplateId]: (data) => {
    const { childrenId } = data;
    return {
      templateId: formElementTemplateId,
      id: `${actionButtonTemplateId}${childrenId}`,
      type: "some random button",
      action: "addItem",
      ...data,
    };
  },
};

const TestElement = ({ templates, contentList, actionsList }) => {
  const [contentModelList, actionsModelList] = useFormModel({
    templates,
    contentList,
    actionsList,
  });
  catcherMock({ contentModelList, actionsModelList });

  return <div></div>;
};

describe("useFormModel hook test suite", () => {
  beforeEach(() => vi.resetAllMocks());

  it("returns the contentModelList", () => {
    render(<TestElement {...{ templates, contentList }}></TestElement>);
    const setExpectations = (data, index) => {
      const childrenId = index + 1;
      const expectedModel = {
        ...templates[formElementTemplateId]({ childrenId }),
        ...contentList[index],
      };
      expect(data).toEqual(expect.objectContaining(expectedModel));
    };
    const { contentModelList } = getLastCall();
    contentModelList.forEach(setExpectations);
  });

  it("adds the value property to the contentModelList items using its onChange callback", () => {
    render(<TestElement {...{ templates, contentList }}></TestElement>);
    const expectedValue = "soy un nuevo valor";
    const extractValues = ({ value }) => value;
    const changeValues = ({ id }) => {
      const { contentModelList } = getLastCall();
      const { onChange } = contentModelList.find(
        ({ id: targetId }) => targetId === id,
      );
      act(() => onChange({ [id]: expectedValue }));
    };
    const { contentModelList: initialList } = getLastCall();
    const initialValueList = initialList.map(extractValues);
    initialList.forEach(changeValues);
    const { contentModelList: finalList } = getLastCall();
    const finalValueList = finalList.map(extractValues);
    initialValueList.forEach((item) => expect(item).not.toBe(expectedValue));
    finalValueList.forEach((item) => expect(item).toBe(expectedValue));
  });

  it("returns the actionsModelList", () => {
    render(<TestElement {...{ templates, actionsList }}></TestElement>);
    const setExpectations = (data, index) => {
      const childrenId = index + 1;
      const expectedModel = {
        ...templates[actionButtonTemplateId]({ childrenId }),
      };
      expect(data).toEqual(expect.objectContaining(expectedModel));
    };
    const { actionsModelList } = getLastCall();
    actionsModelList.forEach(setExpectations);
  });

  it("adds to the end of contentModelList the expected item based on a template", async () => {
    render(
      <TestElement {...{ templates, actionsList, contentList }}></TestElement>,
    );
    const expectedLength = contentList.length + 1;
    const childrenId = contentList.length + 1;
    const expectedModel = templates[formElementTemplateId]({
      childrenId,
    });
    const {
      actionsModelList: [{ onClick: addItem }],
    } = getLastCall();
    await act(async () => addItem());
    const { contentModelList } = getLastCall();
    const lastItem = contentModelList[contentModelList.length - 1];
    expect(lastItem).toEqual(expect.objectContaining(expectedModel));
    expect(contentModelList).toHaveLength(expectedLength);
  });

  it("removes from the contentModelList the desire item", async () => {
    render(<TestElement {...{ templates, contentList }}></TestElement>);
    const { contentModelList: initialList } = getLastCall();
    const { id: targetId, remover, removeMessage } = initialList[0];
    const expectedLength = initialList.length - 1;
    await act(async () => remover());
    const { contentModelList: finalList } = getLastCall();
    expect(finalList).not.toEqual(
      expect.arrayContaining([{ id: targetId, removeMessage }]),
    );
    expect(finalList).toHaveLength(expectedLength);
  });

  it("updates on contentModelList manipulation the id to match the index position", async () => {
    render(
      <TestElement {...{ templates, contentList, actionsList }}></TestElement>,
    );
    const setExpectation = ({ id }, index) => {
      const expectedId = `${formElementTemplateId}${index + 1}`;
      expect(id).toBe(expectedId);
    };
    const { contentModelList: initialList } = getLastCall();
    initialList.forEach(setExpectation);
    for (let i = 1; i <= 2; i++) {
      const {
        actionsModelList: [{ onClick: addItem }],
      } = getLastCall();
      await act(async () => addItem());
    }
    const { contentModelList: expandedList } = getLastCall();
    const { remover } = expandedList[0];
    expandedList.forEach(setExpectation);
    await act(async () => remover());
    const { contentModelList: reducedList } = getLastCall();
    reducedList.forEach(setExpectation);
  });
});

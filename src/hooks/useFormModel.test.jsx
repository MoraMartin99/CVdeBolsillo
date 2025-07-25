import { beforeEach, describe, expect, it, vi } from "vitest";
import useFormModel from "./useFormModel";
import { render, act } from "@testing-library/react";

const catcherMock = vi.fn(() => {});
const getLastCall = () => catcherMock.mock.lastCall[0];
const formElementTemplateId = "template1";
const actionButtonTemplateId = "template2";
const contentList = [
  { templateId: formElementTemplateId },
  { templateId: formElementTemplateId, value: "test2" },
];
const actionsList = [
  { templateId: actionButtonTemplateId },
  {
    templateId: actionButtonTemplateId,
    value: "reescribí esta propiedad",
    extra: "soy un extra",
  },
];
const baseTemplate1 = "formElement";
const baseTemplate2 = "actionElement";
const template1 = (data) => {
  const { childrenId } = data;
  return {
    id: `${baseTemplate1}${childrenId}`,
    value: "soy un template 1",
    type: "some random form element",
    ...data,
  };
};
const template2 = (data) => {
  const { childrenId } = data;
  return {
    id: `${baseTemplate2}${childrenId}`,
    value: "soy un template 2",
    type: "some random button",
    ...data,
  };
};
const templates = { template1, template2 };

const TestElement = ({ templates, contentList, actionsList }) => {
  const [contentModelList, actionsModelList, addItem, removeItem] =
    useFormModel({
      templates,
      contentList,
      actionsList,
    });
  catcherMock({ contentModelList, actionsModelList, addItem, removeItem });

  return <div></div>;
};

describe("useFormModel hook test suite", () => {
  beforeEach(() => vi.resetAllMocks());

  it("returns the contentModelList", () => {
    render(<TestElement {...{ templates, contentList }}></TestElement>);
    const setExpectations = (data, index) => {
      const childrenId = index + 1;
      expect(data).toEqual(
        expect.objectContaining({
          ...template1({ childrenId }),
          ...contentList[index],
        }),
      );
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
      expect(data).toEqual(
        expect.objectContaining({
          ...template2({ childrenId }),
          ...actionsList[index],
        }),
      );
    };
    const { actionsModelList } = getLastCall();
    actionsModelList.forEach(setExpectations);
  });

  it("adds to the end of contentModelList the expected item based on a template", async () => {
    render(<TestElement {...{ templates, contentList }}></TestElement>);
    const extra = "some extra property";
    const expectedItem = templates[formElementTemplateId]({
      childrenId: contentList.length + 1,
      extra,
    });
    const { addItem, contentModelList: initialList } = getLastCall();
    const expectedLength = initialList.length + 1;
    await act(async () =>
      addItem({ templateId: formElementTemplateId, extra }),
    );
    const { contentModelList: finalList } = getLastCall();
    const lastItem = finalList[finalList.length - 1];
    expect(lastItem).toEqual(expect.objectContaining(expectedItem));
    expect(finalList).toHaveLength(expectedLength);
  });

  it("removes from the contentModelList the desire item", async () => {
    render(<TestElement {...{ templates, contentList }}></TestElement>);
    const { contentModelList: initialList, removeItem } = getLastCall();
    const targetData = initialList[0];
    const expectedLength = initialList.length - 1;
    await act(async () => removeItem(targetData.id));
    const { contentModelList: finalList } = getLastCall();
    expect(finalList).not.toEqual(expect.arrayContaining([targetData]));
    expect(finalList).toHaveLength(expectedLength);
  });

  it("updates on contentModelList manipulation the id to match the index position", async () => {
    render(<TestElement {...{ templates, contentList }}></TestElement>);
    const newItemsList = [
      { templateId: formElementTemplateId, note: "me agregaron primero" },
      { templateId: formElementTemplateId, note: "me agregaron segundo" },
    ];
    const setExpectation = ({ id }, index) => {
      const expectedId = `${baseTemplate1}${index + 1}`;
      expect(id).toBe(expectedId);
    };
    const addItemsToModel = async (item) => {
      const { addItem } = getLastCall();
      await act(async () => addItem(item));
    };
    const { contentModelList: initialList } = getLastCall();
    initialList.forEach(setExpectation);
    newItemsList.forEach(addItemsToModel);
    const { contentModelList: expandedList, removeItem } = getLastCall();
    const targetId = expandedList[1].id;
    expandedList.forEach(setExpectation);
    await act(async () => removeItem(targetId));
    const { contentModelList: reducedList } = getLastCall();
    reducedList.forEach(setExpectation);
  });
});

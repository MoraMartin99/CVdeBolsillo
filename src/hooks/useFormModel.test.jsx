import { beforeEach, describe, expect, it, vi } from "vitest";
import useFormModel from "./useFormModel";
import { render, act } from "@testing-library/react";

const catcherMock = vi.fn(() => {});
const getLastCall = () => catcherMock.mock.lastCall[0];
const initialModelList = [{ id: "item1" }, { id: "item2", value: "test2" }];
const template1 = (number) => {
  return { id: `templateItem${number}`, value: "soy un template" };
};
const templates = { template1 };
const templateId = "template1";

const TestElement = ({ templates, initialModelList }) => {
  const [modelList, addItem, removeItem] = useFormModel({
    initialModelList,
    templates,
  });
  catcherMock({ modelList, addItem, removeItem });

  return <div></div>;
};

describe("useFormModel hook test suite", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("return the modelList mapped with an onChange callback", () => {
    render(<TestElement {...{ initialModelList }}></TestElement>);
    const setExpectations = (data, index) => {
      expect(data).toEqual(
        expect.objectContaining({ ...initialModelList[index] }),
      );
      expect(data).toHaveProperty("onChange");
    };
    const { modelList } = getLastCall();
    modelList.forEach(setExpectations);
  });

  it("adds to the end of modelList the expected item based on a template", async () => {
    render(<TestElement {...{ templates, initialModelList }}></TestElement>);
    const expectedItem = templates[templateId](initialModelList.length + 1);
    const { addItem } = getLastCall();
    await act(async () => addItem(templateId));
    const { modelList } = getLastCall();
    const lastItem = modelList[modelList.length - 1];
    const expectedLength = initialList.length + 1;
    expect(lastItem).toEqual(expect.objectContaining(expectedItem));
    expect(lastItem).toHaveProperty("onChange");
    expect(finalList).toHaveLength(expectedLength);
  });

  it("removes from the modelList the desire item", async () => {
    render(<TestElement {...{ initialModelList }}></TestElement>);
    const targetData = initialModelList[0];
    const { removeItem } = getLastCall();
    const expectedLength = initialList.length - 1;
    await act(async () => removeItem(targetData.id));
    const { modelList } = getLastCall();
    expect(modelList).not.toEqual(expect.arrayContaining([targetData]));
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

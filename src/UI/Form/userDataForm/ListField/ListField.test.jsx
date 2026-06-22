import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import ListField from "./ListField";
import { describe, it, vi, afterEach, expect } from "vitest";
import "../../../../global.css";
import "../../../../variables.css";

const submitDataMock = vi.fn(() => {});
const label = "label";
const id = "myId";

const renderComponent = async (value) => {
  await render(
    <ListField
      label={label}
      value={value}
      submitData={submitDataMock}
      id={id}
    ></ListField>,
  );
};

describe("ListField", () => {
  afterEach(() => vi.resetAllMocks());

  const focusCases = [
    ["Soy el único input"],
    ["soy input 1", "soy input "],
  ].map((inputValues) => {
    return {
      value: inputValues.map((inputValue) => {
        return {
          value: inputValue,
          id: crypto.randomUUID(),
        };
      }),
      targetIndex: inputValues.length - 1,
    };
  });

  it.each(focusCases)(
    "focus on the last input on label click, targetIndex =  $targetIndex",
    async ({ value }) => {
      await renderComponent(value);
      const labelElement = page.getByText(label);
      const targetInput = page.getByRole("textbox").last();

      await labelElement.click();
      await expect.element(targetInput).toHaveFocus();
    },
  );

  describe("runs submitData", () => {
    it("on input value modification", async () => {
      const value = [{ value: "", id: 1 }];
      await renderComponent(value);
      const targetInput = page.getByRole("textbox").last();
      const expectedInputValue = "Soy un valor nuevo";
      await targetInput.fill(expectedInputValue);
      const expectedCall = [
        id,
        { value: [{ value: expectedInputValue, id: value[0].id }] },
      ];
      expect(submitDataMock).toHaveBeenCalledExactlyOnceWith(...expectedCall);
    });

    it("on add item click", async () => {
      const value = [{ value: "", id: 1 }];
      await renderComponent(value);
      const newItemId = "2";
      vi.spyOn(crypto, "randomUUID").mockReturnValue(newItemId);
      const targetButton = page
        .getByRole("button")
        .filter({ hasText: "Agregar item" });
      await targetButton.click();
      const expectedCall = [
        id,
        { value: [...value, { value: "", id: newItemId }] },
      ];
      expect(submitDataMock).toHaveBeenCalledExactlyOnceWith(...expectedCall);
    });

    it("on remove input click", async () => {
      const value = [
        { value: "1", id: 1 },
        { value: "2", id: 2 },
        { value: "3", id: 3 },
      ];
      await renderComponent(value);
      const targetButton = page
        .getByRole("button")
        .filter({ hasNotText: "Agregar item" })
        .nth(1);
      await targetButton.click();
      const expectedCall = [id, { value: value.filter(({ id }) => id !== 2) }];
      expect(submitDataMock).toHaveBeenCalledExactlyOnceWith(...expectedCall);
    });
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const defaultValue = "soy default value";
const exampleValue = "soy un ejemplo";
const templateId = "input";
const templates = { input: { templateId, value: defaultValue } };
const content = [{ templateId: "input" }];
const exampleContent = [{ value: exampleValue, templateId }];
const onChangeMock = vi.fn(() => {});
const formFactoryStub = vi.fn((model = []) => {
  const buildItem = ({ value, submitData, id }) => {
    const setValue = ({ target: { value } }) => submitData({ id, value });
    return (
      <input
        id={id}
        key={id}
        onChange={setValue}
        type="text"
        value={value}
      ></input>
    );
  };
  return model.map(buildItem);
});

describe("FormsManager", async () => {
  beforeEach(async () => {
    vi.doMock(import("../formFactory"), () => ({ default: formFactoryStub }));
    const FormsManager = (await import("./FormsManager")).default;
    await render(
      <FormsManager
        {...{
          data: { content, templates },
          exampleContent,
          onChange: onChangeMock,
        }}
      ></FormsManager>,
    );
  });

  afterEach(() => vi.resetAllMocks());

  it("loads the example", async () => {
    const expectedValue = exampleValue;
    const loadExampleButton = page.getByText("Cargar ejemplo");
    const acceptButton = page.getByText("Aceptar");
    await loadExampleButton.click();
    await acceptButton.click();
    const finalValue = page.getByRole("textbox").element().value;
    expect(finalValue).toEqual(expectedValue);
  });

  it("resets the forms", async () => {
    const expectedValue = defaultValue;
    const newValue = "soy un valor modificado!";
    const target = page.getByRole("textbox");
    const resetButton = page.getByText("Limpiar formulario");
    const acceptButton = page.getByText("Aceptar");
    await target.fill(newValue);
    await resetButton.click();
    await acceptButton.click();
    const finalValue = page.getByRole("textbox").element().value;
    expect(finalValue).toEqual(expectedValue);
  });

  describe("report model changes", () => {
    it("reports initial values", () => {
      const id = page.getByRole("textbox").element().id;
      const expectedValue = { [id]: defaultValue };
      expect(onChangeMock).toHaveBeenCalledExactlyOnceWith(expectedValue);
    });

    it("reports modified values", async () => {
      const newValue = "soy un valor modificado!";
      const target = page.getByRole("textbox");
      const id = target.element().id;
      const expectedValue = { [id]: newValue };
      await target.fill(newValue);
      expect(onChangeMock).toHaveBeenLastCalledWith(expectedValue);
    });
  });
});

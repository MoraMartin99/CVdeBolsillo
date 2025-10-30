import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

const defaultValue = "soy default value";
const exampleValue = "soy un ejemplo";
const templateId = "input";
const templates = { input: { templateId, value: defaultValue } };
const content = [{ templateId: "input" }];
const exampleContent = [{ value: exampleValue, templateId }];
const onChangeMock = vi.fn(() => {});
const formFactoryStub = vi.fn((model = []) => {
  const buildItem = ({ value, onChange, id }) => {
    const setValue = ({ target: { value } }) => onChange({ [id]: value });
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
const acceptButtonId = "accept";
const DialogMock = vi.fn(({ onAccept }) => {
  return (
    <div>
      <button
        data-testid={acceptButtonId}
        onClick={onAccept}
        type="button"
      ></button>
    </div>
  );
});

describe("FormsManager", async () => {
  beforeEach(async () => {
    const doubles = [
      ["../formFactory", formFactoryStub],
      ["../../ConfirmationModal/ConfirmationModal", DialogMock],
    ];
    const setDoubles = ([path, mock]) => {
      vi.doMock(path, () => ({ default: mock }));
    };
    doubles.forEach(setDoubles);
    const FormsManager = (await import("./FormsManager")).default;
    render(
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

  it("loads the example", () => {
    const expectedValue = exampleValue;
    const loadExampleButton = screen.queryByText("Cargar ejemplo");
    const acceptButton = screen.queryByTestId(acceptButtonId);
    fireEvent.click(loadExampleButton);
    fireEvent.click(acceptButton);
    const finalValue = screen.queryByRole("textbox").value;
    expect(finalValue).toEqual(expectedValue);
  });

  it("resets the forms", () => {
    const expectedValue = defaultValue;
    const newValue = "soy un valor modificado!";
    const target = screen.queryByRole("textbox");
    const resetButton = screen.queryByText("Limpiar formulario");
    const acceptButton = screen.queryByTestId(acceptButtonId);
    fireEvent.change(target, { target: { value: newValue } });
    fireEvent.click(resetButton);
    fireEvent.click(acceptButton);
    const finalValue = screen.queryByRole("textbox").value;
    expect(finalValue).toEqual(expectedValue);
  });

  describe("report model changes", () => {
    it("reports initial values", () => {
      const id = screen.queryByRole("textbox").id;
      const expectedValue = { [id]: defaultValue };
      expect(onChangeMock).toHaveBeenCalledExactlyOnceWith(expectedValue);
    });

    it("reports modified values", () => {
      const newValue = "soy un valor modificado!";
      const target = screen.queryByRole("textbox");
      const id = screen.queryByRole("textbox").id;
      const expectedValue = { [id]: newValue };
      fireEvent.change(target, { target: { value: newValue } });
      expect(onChangeMock).toHaveBeenLastCalledWith(expectedValue);
    });
  });
});

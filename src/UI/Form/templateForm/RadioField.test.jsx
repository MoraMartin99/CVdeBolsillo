import { describe, it, vi, afterEach, expect } from "vitest";
import RadioField from "./RadioField";
import { render } from "vitest-browser-react";
import thumbnail from "./imagePlaceholder.svg";
import "../../../global.css";
import "../../../variables.css";
import { page } from "vitest/browser";

const id = "test";
const options = [
  { id: 1, thumbnail, label: "option 1" },
  { id: 2, thumbnail, label: "option 2" },
];
const onChangeMock = vi.fn(() => {});

const renderComponent = async (value) => {
  await render(
    <RadioField
      {...{ id, options, onChange: onChangeMock, value }}
    ></RadioField>,
  );
};

describe("RadioField", async () => {
  afterEach(() => vi.resetAllMocks());

  const addInitialValue = (item, index, list) => {
    return {
      ...item,
      value: index ? undefined : list[1].id,
    };
  };

  it.each(options.map(addInitialValue))(
    "reports selected option, id = $id",
    async ({ id, label, value }) => {
      await renderComponent(value);
      const target = page.getByText(label);

      await target.click();
      expect(onChangeMock).toHaveBeenCalledExactlyOnceWith(String(id));
    },
  );

  it("if value is undefined, checks the first option", async () => {
    await renderComponent();
    const target = page.getByRole("radio", { includeHidden: true }).first();

    await expect.element(target).toBeChecked();
  });
});

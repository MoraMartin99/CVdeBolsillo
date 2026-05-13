import DateInput from "./DateInput";
import "../../../global.css";
import "../../../variables.css";
import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import months from "../../../months";

const onChangeMock = vi.fn(() => {});
const year = 2000;

const renderComponent = async ({
  id = "input",
  value = { month: 1, year: 2000 },
  onChange = onChangeMock,
  classArr = [],
  startYear = year,
  finishYear = year,
} = {}) => {
  await render(
    <DateInput
      {...{ id, value, onChange, classArr, startYear, finishYear }}
    ></DateInput>,
  );
};

describe("DateInput", () => {
  it("starts with the modal hidden", async () => {
    await renderComponent();
    const modal = page.getByRole("dialog", { includeHidden: true });
    await expect.element(modal).not.toBeVisible();
  });

  describe("it displayed text", () => {
    const expectDisplayedText = async (value, text) => {
      await renderComponent({ value });
      const target = page.getByText(text);
      await expect.element(target).toBeInTheDocument();
    };

    it(`is "Actualmente" if value = { isCurrently: true}`, async () => {
      await expectDisplayedText({ isCurrently: true }, "Actualmente");
    });

    const cases = months.map(({ value: month, label }) => {
      return { value: { month, year }, text: `${label}/${year}` };
    });

    it.each(cases)("is $text if value = $value", async ({ value, text }) => {
      await expectDisplayedText(value, text);
    });
  });
});

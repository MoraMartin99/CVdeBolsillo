import LevelField from "./LevelField";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { describe, expect, it, vi } from "vitest";
import "../../../../global.css";
import "../../../../variables.css";

const submitDataMock = vi.fn(() => {});
const id = "levelField";

const renderComponent = async ({ value, max, step } = {}) => {
  render(
    <LevelField
      {...{ id, submitData: submitDataMock, value, max, step }}
    ></LevelField>,
  );
};

describe("LevelField", async () => {
  it("shows the current value", async () => {
    const value = 7;
    await renderComponent({ value });
    const display = page.getByText(value);
    await expect.element(display).toBeVisible();
  });

  it("report value changes", async () => {
    await renderComponent();
    const input = page.getByRole("slider");
    const value = "9";
    await input.fill(value);
    expect(submitDataMock).toHaveBeenCalledExactlyOnceWith(id, { value });
  });
});

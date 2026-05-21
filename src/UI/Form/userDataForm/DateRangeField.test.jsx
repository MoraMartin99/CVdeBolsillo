import { describe, expect, it, vi } from "vitest";
import DateRangeField from "./DateRangeField";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import "../../../global.css";
import "../../../variables.css";

const submitDataMock = vi.fn(() => {});
const id = "test";
const startLabel = "desde";

describe("DateRangeField", () => {
  it("if the start input isCurrently checkbox is checked then reports value = { start: { isCurrently: true}, finish: { isCurrently: true } }", async () => {
    await render(
      <DateRangeField
        startLabel={startLabel}
        id={id}
        submitData={submitDataMock}
      ></DateRangeField>,
    );
    const label = page.getByText(startLabel);
    const checkbox = page
      .getByRole("checkbox", { includeHidden: true })
      .first();
    await label.click();
    await checkbox.click();
    expect(submitDataMock).toHaveBeenCalledExactlyOnceWith(id, {
      value: {
        start: { isCurrently: true },
        finish: { isCurrently: true },
      },
    });
  });
});

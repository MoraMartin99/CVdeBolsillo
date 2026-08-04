import { describe, expect, it, vi } from "vitest";
import Tab from "./Tab";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import "../../../global.css";
import "../../../variables.css";

let onClickCallback = vi.fn(() => {});

describe("Tab", () => {
  it("runs onClick on click events", async () => {
    const text = "soy un tab";
    const value = "soy un valor";
    await render(
      <Tab value={value} onClick={onClickCallback}>
        {text}
      </Tab>,
    );
    const target = page.getByText(text);

    await target.click();
    expect(onClickCallback).toHaveBeenCalledExactlyOnceWith(value);
  });
});

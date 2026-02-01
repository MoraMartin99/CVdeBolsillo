import { describe, expect, it, beforeEach, vi } from "vitest";
import Tab from "./Tab";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

let onClickCallback = vi.fn();

const propList = [
  {},
  { label: "test", value: 1, onClickCallback, isCurrentTab: true },
];

describe.each(propList)(
  "Tab component with props: {label: $label, value: $value, onClickCallback: $onClickCallback, isCurrentTab: $isCurrentTab}",
  ({ label, value, onClickCallback, isCurrentTab }) => {
    beforeEach(() =>
      render(
        <Tab
          label={label}
          value={value}
          onClickCallback={onClickCallback}
          isCurrentTab={isCurrentTab}
        ></Tab>,
      ),
    );

    it("renders the parent element", async () => {
      const target = page.getByRole("button");
      await expect.element(target).toBeInTheDocument();
    });

    it("has the correct label", async () => {
      const target = page.getByRole("button", { name: label });
      await expect.element(target).toBeInTheDocument();
    });

    it.skipIf(!onClickCallback)(
      "runs onClickCallback on click event",
      async () => {
        const target = page.getByRole("button");
        await target.click();
        expect(onClickCallback).toHaveBeenCalled();
      },
    );
  },
);

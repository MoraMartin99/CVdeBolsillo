import { describe, expect, it, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Tab from "./Tab";

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

    it("renders the parent element", () => {
      const targetElement = screen.getByRole("button");
      expect(targetElement).toBeInTheDocument();
    });

    it("has the correct label", () => {
      const targetElement = screen.getByRole("button", { name: label });
      expect(targetElement).toBeInTheDocument();
    });

    it.skipIf(!onClickCallback)("runs onClickCallback on click event", () => {
      const targetElement = screen.getByRole("button");
      fireEvent.click(targetElement);
      expect(onClickCallback).toHaveBeenCalled();
    });
  },
);

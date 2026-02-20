import { beforeEach, describe, it, expect } from "vitest";
import SUT from "./NavigationButton";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const DOWN_POSITION = "down";
const DOWN_TEST_ID = "downIcon";
const UP_POSITION = "up";
const UP_TEST_ID = "upIcon";
const propList = [
  {},
  { iconDirection: UP_POSITION },
  { iconDirection: DOWN_POSITION },
  { iconDirection: "test" },
];
const defaultId = UP_TEST_ID;

describe.each(propList)(
  "NavigationButton component with props: {iconDirection: $iconDirection}",
  ({ iconDirection }) => {
    const hasValidIconDirection = [DOWN_POSITION, UP_POSITION].includes(
      iconDirection,
    );
    beforeEach(() => {
      render(<SUT iconDirection={iconDirection}></SUT>);
    });

    it("renders the parent element", async () => {
      const targetElement = page.getByRole("button");
      await expect.element(targetElement).toBeInTheDocument();
    });

    it.runIf(!iconDirection || !hasValidIconDirection)(
      "renders the default icon if iconDirection is undefined or is invalid",
      async () => {
        const targetElement = page.getByTestId(defaultId);
        await expect.element(targetElement).toBeInTheDocument();
      },
    );

    it.runIf(hasValidIconDirection)(
      "renders the corresponding icon to the iconDirection",
      async () => {
        const testId =
          iconDirection === UP_POSITION ? UP_TEST_ID : DOWN_TEST_ID;
        const targetElement = page.getByTestId(testId);
        await expect.element(targetElement).toBeInTheDocument();
      },
    );
  },
);

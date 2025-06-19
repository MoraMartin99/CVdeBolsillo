import { beforeEach, describe, it, expect } from "vitest";
import NavigationButton from "./NavigationButton";
import { render, screen } from "@testing-library/react";

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
      render(
        <NavigationButton iconDirection={iconDirection}></NavigationButton>,
      );
    });

    it("renders the parent element", () => {
      const targetElement = screen.queryByRole("button");
      expect(targetElement).toBeInTheDocument();
    });

    it.runIf(!iconDirection || !hasValidIconDirection)(
      "renders the default icon if iconDirection is undefined or is invalid",
      () => {
        const targetElement = screen.queryByTestId(defaultId);
        expect(targetElement).toBeInTheDocument();
      },
    );

    it.runIf(hasValidIconDirection)(
      "renders the corresponding icon to the iconDirection",
      () => {
        const testId =
          iconDirection === UP_POSITION ? UP_TEST_ID : DOWN_TEST_ID;
        const targetElement = screen.queryByTestId(testId);
        expect(targetElement).toBeInTheDocument();
      },
    );
  },
);

import { beforeEach, describe, vi, it, expect } from "vitest";
import Icon from "../../assets/images/genericIcon.svg?react";
import Button from "./Button";
import { render, screen, fireEvent } from "@testing-library/react";

const onClickMock = vi.fn();

const propList = [
  {},
  {
    children: "test",
    classArr: ["test1"],
    iconPosition: "left",
    style: {},
  },
  {
    children: "test",
    classArr: ["test1", "test2"],
    iconPosition: "right",
    Icon,
    onClick: onClickMock,
    style: {
      "--height": "50px",
      "--minWidth": "60px",
      "--inlinePadding": "70px",
      "--columnGap": "80px",
      "--color": "red",
      "--BGColor": "Crimson",
      "--BGColorHover": "PaleVioletRed",
      "--fontSize": "90rem",
      "--iconSize": "100px",
    },
  },
  {
    children: "test",
    classArr: ["test1", "test2"],
    iconPosition: "Right",
    Icon,
    onClick: onClickMock,
    style: {
      "--height": "initial",
      "--minWidth": "initial",
      "--inlinePadding": "initial",
      "--default1": "foo",
      "--default2": "faa",
      "--default3": "fii",
      width: "6.5px",
    },
  },
  {
    children: "test",
    classArr: ["test1", "test2"],
    iconPosition: "test",
    Icon,
    onClick: onClickMock,
    style: {
      "--test1": "soyUntest",
      opacity: "0.5",
    },
  },
  {
    children: "test",
    classArr: ["test1", "test2"],
    iconPosition: "test",
    Icon,
    onClick: onClickMock,
    isDisable: true,
    style: {
      "--BGColor": "Crimson",
      "--BGColorHover": "PaleVioletRed",
      "--fontSize": "90rem",
      "--iconSize": "100px",
    },
  },
];

describe.each(propList)(
  "Button component with props: {text: $text, classArr: $classArr, iconPosition: $iconPosition, Icon: $Icon, onClick: $onClick, style: $style}",
  ({ children, classArr, iconPosition, Icon, onClick, isDisable, style }) => {
    beforeEach(() => {
      onClickMock.mockClear();
      render(
        <Button
          {...{ classArr, iconPosition, Icon, onClick, isDisable, style }}
        >
          {children}
        </Button>,
      );
    });

    it("renders the parent element", () => {
      const targetElement = screen.getByRole("button");
      expect(targetElement).toBeInTheDocument();
    });

    it.runIf(children)("has the corresponding text", () => {
      const targetElement = screen.getByText(children);
      expect(targetElement).toBeInTheDocument();
    });

    it.runIf(Icon)("renders an svg icon", () => {
      const targetElement = document.querySelector("svg");
      expect(targetElement).toBeInTheDocument();
    });

    it.runIf(classArr)("has classArr applied as the last classes", () => {
      const targetElement = screen.getByRole("button");
      const classList = Array.from(targetElement.classList);
      expect(classList.slice(-classArr.length)).toEqual(
        expect.arrayContaining(classArr),
      );
    });

    it.runIf(onClick && !isDisable)(
      "runs onClickCallback on click events if isDisabled is falsy",
      () => {
        const targetElement = screen.getByRole("button");
        fireEvent.click(targetElement);
        expect(onClick).toHaveBeenCalledTimes(1);
      },
    );
    it.runIf(onClick && isDisable)(
      "doesn't runs onClickCallback on click events if isDisabled is truthy",
      () => {
        const targetElement = screen.getByRole("button");
        fireEvent.click(targetElement);
        expect(onClick).not.toHaveBeenCalled();
      },
    );

    it.runIf(isDisable)("disables the component if isDisable = true", () => {
      const targetElement = screen.getByRole("button");
      expect(targetElement).toBeDisabled();
    });

    it.skipIf(isDisable)(
      "enables the component if isDisable is not defined",
      () => {
        const targetElement = screen.getByRole("button");
        expect(targetElement).toBeEnabled();
      },
    );

    it.runIf(style)("overrides and extends the default styles", () => {
      const targetElement = screen.getByRole("button");
      const styles = getComputedStyle(targetElement);
      const setExpectations = ([key, value]) => {
        expect(styles.getPropertyValue(key)).toBe(value);
      };
      const entries = Object.entries(style);
      entries.forEach(setExpectations);
    });
  },
);

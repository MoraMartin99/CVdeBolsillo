import { beforeEach, describe, vi, it, expect } from "vitest";
import Icon from "../../assets/images/genericIcon.svg?react";
import Button from "./Button";
import { render, screen, fireEvent } from "@testing-library/react";

const onClickMock = vi.fn();

const propList = [
  {},
  { children: "test", classArr: ["test1"], iconPosition: "left" },
  {
    children: "test",
    classArr: ["test1", "test2"],
    iconPosition: "right",
    Icon,
    onClick: onClickMock,
  },
  {
    children: "test",
    classArr: ["test1", "test2"],
    iconPosition: "Right",
    Icon,
    onClick: onClickMock,
  },
  {
    children: "test",
    classArr: ["test1", "test2"],
    iconPosition: "test",
    Icon,
    onClick: onClickMock,
  },
  },
];

describe.each(propList)(
  "Button component with props: {text: $text, classArr: $classArr, iconPosition: $iconPosition, Icon: $Icon, onClick: $onClick}",
  ({ children, classArr, iconPosition, Icon, onClick }) => {
    beforeEach(() => {
      onClickMock.mockClear();
      render(
        <Button
          classArr={classArr}
          iconPosition={iconPosition}
          Icon={Icon}
          onClick={onClick}
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

      const targetElement = screen.getByRole("button");
    });
  },
);

import { describe, expect, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Accordion from "./Accordion";
import TestIcon from "../../assets/images/DPIcon.svg?react";

describe.each([
  {},
  { name: "test", Icon: TestIcon },
  { name: "test", Icon: TestIcon, classArr: ["test1", "test2"] },
])(
  `Accordion with props: {name: $name, Icon: $Icon, contentList: $contentList, classArr: $classArr}`,
  ({ name, Icon, contentList, classArr }) => {
    beforeEach(() =>
      render(
        <Accordion
          name={name}
          Icon={Icon}
          contentList={contentList}
          classArr={classArr}
        ></Accordion>,
      ),
    );

    it("renders the parent element", () => {
      const testClass = ".Accordion";
      const testElement = document.querySelector(testClass);
      expect(testElement.parentElement.closest(testClass)).toBeFalsy();
      expect(testElement).toBeInTheDocument();
    });

    it("starts collapsed", () => {
      const baseClass = ".Accordion";
      const regex = /expand/i;
      const testElement = document.querySelector(baseClass);
      expect(Array.from(testElement.classList).some((item) => regex.test(item)))
        .toBeFalsy;
    });

    it("expand on click", () => {
      const baseClass = ".Accordion";
      const baseElement = document.querySelector(baseClass);
      const buttonElement = screen.getAllByRole("button")[0];
      const regex = /expand/i;
      fireEvent.click(buttonElement);
      expect(Array.from(baseElement.classList).some((item) => regex.test(item)))
        .toBeTruthy;
    });

    it("collapse if it was expanded", () => {
      const baseClass = ".Accordion";
      const regex = /expand/i;
      const baseElement = document.querySelector(baseClass);
      const buttonElement = screen.getAllByRole("button")[0];
      fireEvent.click(buttonElement);
      fireEvent.click(buttonElement);
      expect(Array.from(baseElement.classList).some((item) => regex.test(item)))
        .toBeFalsy;
    });

    it.skipIf(!name)("has the correct name", () => {
      const baseElement = screen.queryAllByRole("generic")[0];
      const contentElement = baseElement.querySelector(".content");
      const targetElement = screen.queryAllByText(name)[0];
      expect(targetElement).toBeInTheDocument();
      expect(contentElement).not.toContainElement(targetElement);
    });

    it.skipIf(!Icon)("has the correct custom icon", () => {
      const baseElement = screen.queryAllByRole("generic")[0];
      const contentElement = baseElement.querySelector(".content");
      const targetElement = baseElement.querySelector(".customIcon");
      expect(targetElement.tagName).toBe("svg");
      expect(targetElement).toBeInTheDocument();
      expect(contentElement).not.toContainElement(targetElement);
    });

    it.skipIf(!classArr)("has classArr applied as the last classes", () => {
      const testClass = ".Accordion";
      const targetElement = document.querySelector(testClass);
      const classList = Array.from(targetElement.classList);
      expect(classList.slice(-classArr.length)).toEqual(
        expect.arrayContaining(classArr),
      );
    });
  },
);

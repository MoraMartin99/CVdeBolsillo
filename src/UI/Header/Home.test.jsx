import { beforeEach, describe, expect, it } from "vitest";
import HomeLogo from "./Home";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const propList = [
  {},
  { classArr: ["test1"], children: "soy un test" },
  { classArr: ["test1", "test2"], children: <span>soy un test</span> },
];

describe.each(propList)(
  "Home component with props: {classArr: $classArr, children: $children}",
  ({ classArr, children }) => {
    beforeEach(() => {
      render(<HomeLogo classArr={classArr}>{children}</HomeLogo>);
    });

    it("renders the parent element", () => {
      const targetClass = "home";
      const targetElement = document.querySelector(`.${targetClass}`);
      expect(targetElement).toBeInTheDocument();
    });

    it.runIf(children)("renders the children", async () => {
      const text = "soy un test";
      const target = page.getByText(text);
      await expect.element(target).toBeInTheDocument();
    });

    it.runIf(classArr)("has classArr applied as the last classes", () => {
      const targetClass = "home";
      const targetElement = document.querySelector(`.${targetClass}`);
      const classList = Array.from(targetElement.classList);
      expect(classList.slice(-classArr.length)).toEqual(
        expect.arrayContaining(classArr),
      );
    });
  },
);

import RepoBadge from "./RepoBadge";
import Icon from "./test/genericIcon.svg?react";
import { beforeEach, describe, it, expect } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const propList = [
  {},
  { classArr: ["test1", "test2"], label: "hola", repoUrl: "testUrl", Icon },
];

describe.each(propList)(
  "RepoBadge component with props: {classArr: $classArr, label: $label, repoUrl: $repoUrl, Icon: $Icon}",
  ({ classArr, label, repoUrl, Icon }) => {
    beforeEach(() => {
      render(
        <RepoBadge
          classArr={classArr}
          label={label}
          repoUrl={repoUrl}
          Icon={Icon}
        ></RepoBadge>,
      );
    });

    it("renders the parent element", async () => {
      const targetClass = "repobadge";
      const targetElement = document.querySelector(`.${targetClass}`);
      await expect.element(targetElement).toBeInTheDocument();
    });

    it("has the corresponding href attribute", async () => {
      const targetClass = "repobadge";
      const targetElement = document.querySelector(`.${targetClass}`);
      const attribute = "href";
      await expect.element(targetElement).toHaveAttribute(attribute, repoUrl);
    });

    it("renders an icon", async () => {
      const targetElement = page.getByRole("img");
      await expect.element(targetElement).toBeInTheDocument();
    });

    it.runIf(label)("has the corresponding label", async () => {
      const targetElement = page.getByText(label);
      await expect.element(targetElement).toBeInTheDocument();
    });

    it.runIf(classArr)("has classArr applied as the last classes", () => {
      const targetClass = "repobadge";
      const targetElement = document.querySelector(`.${targetClass}`);
      const classList = Array.from(targetElement.classList);
      expect(classList.slice(-classArr.length)).toEqual(
        expect.arrayContaining(classArr),
      );
    });
  },
);

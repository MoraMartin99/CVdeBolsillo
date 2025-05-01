import RepoBadge from "./RepoBadge";
import Icon from "../../assets/images/arrow.svg?react";
import { beforeEach, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

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

    it("renders the parent element", () => {
      const targetClass = "repobadge";
      const targetElement = document.querySelector(`.${targetClass}`);
      expect(targetElement).toBeInTheDocument();
    });

    it("has the corresponding href attribute", () => {
      const targetClass = "repobadge";
      const targetElement = document.querySelector(`.${targetClass}`);
      const attribute = "href";
      expect(targetElement).toHaveAttribute(attribute, repoUrl);
    });

    it("renders an icon", () => {
      const targetElement = screen.getByRole("img");
      expect(targetElement).toBeInTheDocument();
    });

    it.runIf(label)("has the corresponding label", () => {
      const targetElement = screen.getByText(label);
      expect(targetElement).toBeInTheDocument();
    });

    it.runIf(classArr)("has classArr applied", () => {
      const targetClass = "repobadge";
      const targetElement = document.querySelector(`.${targetClass}`);
      expect(targetElement).toHaveClass(...classArr);
    });
  },
);

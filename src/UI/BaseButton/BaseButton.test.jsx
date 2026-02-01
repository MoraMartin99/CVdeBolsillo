import { beforeEach, describe, vi, it, expect } from "vitest";
import BaseButton from "./BaseButton";
import TestIcon from "../../assets/images/genericIcon.svg?react";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const onClickMock = vi.fn();

const elementTestId = "testComponent";
const iconTestId = "testIcon";
const Icon = <TestIcon data-testid={iconTestId}></TestIcon>;
const leftPosition = "left";
const rightPosition = "right";

const propList = [
  {},
  {
    children: "test",
    classArr: ["test1"],
    iconPosition: leftPosition,
    style: {},
  },
  {
    children: <p data-testid={elementTestId}>test</p>,
    classArr: ["test1", "test2"],
    iconPosition: rightPosition,
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
    children: [
      <div data-testid={elementTestId} key={1}>
        test2
      </div>,
    ],
    classArr: ["test1", "test2"],
    iconPosition: rightPosition,
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
    children: [
      "test",
      <div data-testid={elementTestId} key={1}>
        test2
      </div>,
    ],
    classArr: ["test1", "test2"],
    Icon,
    iconPosition: leftPosition,
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
  "BaseButton component with props: {children: $children, classArr: $classArr, onClick: $onClick, style: $style, isDisable: $isDisable, iconPosition: $iconPosition, Icon: $Icon}",
  ({ children, classArr, onClick, isDisable, style, iconPosition, Icon }) => {
    beforeEach(async () => {
      onClickMock.mockClear();
      render(
        <BaseButton
          {...{ classArr, onClick, isDisable, style, iconPosition, Icon }}
        >
          {children}
        </BaseButton>,
      );
    });

    it("renders the parent element", async () => {
      const parentElement = page.getByRole("button");
      await expect.element(parentElement).toBeInTheDocument();
    });

    it.runIf(children)("has the corresponding children", async () => {
      const parentElement = page.getByRole("button");
      const list = Array.isArray(children) ? children : [children];
      const setExpectations = async (item) => {
        if (typeof children === "string") {
          await expect.element(parentElement).toHaveTextContent(item);
        } else {
          const itemElement = page.getByTestId(elementTestId);
          await expect.element(parentElement).toContainElement(itemElement);
        }
      };
      list.forEach(setExpectations);
    });

    it.runIf(Icon)("has the corresponding icon", async () => {
      const targetElement = page.getByTestId(iconTestId);
      await expect.element(targetElement).toBeInTheDocument();
    });

    it.runIf(classArr)("has classArr applied as the last classes", async () => {
      const targetElement = page.getByRole("button").element();
      const classList = Array.from(targetElement.classList);
      expect(classList.slice(-classArr.length)).toEqual(
        expect.arrayContaining(classArr),
      );
    });

    it.runIf(onClick && !isDisable)(
      "runs onClickCallback on click events if isDisabled is falsy",
      async () => {
        const targetElement = page.getByRole("button");
        await targetElement.click();
        expect(onClick).toHaveBeenCalledTimes(1);
      },
    );

    it.runIf(isDisable)(
      "disables the component if isDisable = true",
      async () => {
        const targetElement = page.getByRole("button");
        await expect.element(targetElement).toBeDisabled();
      },
    );

    it.skipIf(isDisable)(
      "enables the component if isDisable is not defined",
      async () => {
        const targetElement = page.getByRole("button");
        await expect.element(targetElement).toBeEnabled();
      },
    );

    it.runIf(style)("overrides and extends the default styles", async () => {
      const targetElement = page.getByRole("button").element();
      const styles = targetElement.style;

      const setExpectations = ([key, value]) => {
        expect(styles.getPropertyValue(key)).toBe(value);
      };
      const entries = Object.entries(style);
      entries.forEach(setExpectations);
    });
  },
);

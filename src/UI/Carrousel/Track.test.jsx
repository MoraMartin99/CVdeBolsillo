import { beforeEach, describe, expect, it } from "vitest";
import Track from "./Track";
import { render } from "@testing-library/react";

const propList = [
  {},
  {
    componentDataList: [
      { component: <div></div>, id: 0 },
      { component: <p>hola</p>, id: 1 },
    ],
  },
  {
    componentDataList: [
      { component: <div></div>, id: 0 },
      { component: <p>adios</p>, id: 1 },
    ],
    currentIndex: 1,
  },
  {
    componentDataList: [
      { component: <div></div>, id: 0 },
      { component: <p>adios</p>, id: 1 },
    ],
    currentIndex: 10,
  },
  {
    currentIndex: 5,
  },
];

describe.each(propList)(
  "Track component with props: {componentDataList: $componentDataList, currentIndex:$currentIndex}",
  ({ componentDataList, currentIndex }) => {
    beforeEach(() => {
      render(
        <Track
          componentDataList={componentDataList}
          currentIndex={currentIndex}
        ></Track>,
      );
    });

    it("renders the parent element", () => {
      const targetClass = "track";
      const targetElement = document.querySelector(`.${targetClass}`);
      expect(targetElement).toBeInTheDocument();
    });

    it.runIf(typeof currentIndex === "undefined")(
      "starts in 0 index when currentIndex is not defined",
      () => {
        const targetClass = "track";
        const targetElement = document.querySelector(`.${targetClass}`);
        const regex = /-*\d+(?=%)/;
        const value = targetElement.style
          .getPropertyValue("transform")
          .match(regex)[0];
        const expectedValue = "-0";
        expect(value === expectedValue).toBeTruthy();
      },
    );

    const isWithinRange =
      Array.isArray(componentDataList) && Number.isInteger(currentIndex)
        ? currentIndex <= componentDataList.length - 1
          ? true
          : false
        : false;

    it.runIf(isWithinRange)(
      "translates to the currentIndex position when is within componentDataList.length range",
      () => {
        const targetClass = "track";
        const targetElement = document.querySelector(`.${targetClass}`);
        const regex = /-*\d+(?=%)/;
        const value = targetElement.style
          .getPropertyValue("transform")
          .match(regex)[0];
        const expectedValue = `-${currentIndex * 100}`;
        expect(value === expectedValue).toBeTruthy();
      },
    );

    it("remains translation within componentDataList components even with currentIndex outside of scope", () => {
      const targetClass = "track";
      const targetElement = document.querySelector(`.${targetClass}`);
      const regex = /(?<=-)\d+(?=%)/;
      const value = Number(
        targetElement.style.getPropertyValue("transform").match(regex)[0],
      );
      const minExpectedValue = 0;
      const maxExpectedValue = Array.isArray(componentDataList)
        ? (componentDataList.length - 1) * 100
        : 0;

      expect(value).toBeLessThanOrEqual(maxExpectedValue);
      expect(value).toBeGreaterThanOrEqual(minExpectedValue);
    });
  },
);

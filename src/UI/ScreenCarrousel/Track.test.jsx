import { beforeEach, describe, expect, it } from "vitest";
import Track from "./Track";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const propList = [
  {},
  {
    componentsData: [
      { component: <div></div>, id: 0 },
      { component: <p>hola</p>, id: 1 },
    ],
  },
  {
    componentsData: [
      { component: <div></div>, id: 0 },
      { component: <p>adios</p>, id: 1 },
    ],
    currentIndex: 1,
  },
  {
    componentsData: [
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
  "Track component with props: {componentsData: $componentsData, currentIndex:$currentIndex}",
  ({ componentsData, currentIndex }) => {
    beforeEach(() => {
      render(
        <Track
          componentsData={componentsData}
          currentIndex={currentIndex}
        ></Track>,
      );
    });

    it("renders the parent element", async () => {
      const target = page.getByRole("group");
      await expect.element(target).toBeInTheDocument();
    });

    it.runIf(typeof currentIndex === "undefined")(
      "starts in 0 index when currentIndex is not defined",
      () => {
        const target = page.getByRole("group").element();
        const regex = /-*\d+(?=%)/;
        const value = target.style
          .getPropertyValue("transform")
          .match(regex)[0];
        const expectedValue = "0";
        expect(value === expectedValue).toBeTruthy();
      },
    );

    const isWithinRange =
      Array.isArray(componentsData) && Number.isInteger(currentIndex)
        ? currentIndex <= componentsData.length - 1
          ? true
          : false
        : false;

    it.runIf(isWithinRange)(
      "translates to the currentIndex position when is within componentsData.length range",
      () => {
        const target = page.getByRole("group").element();
        const regex = /-*\d+(?=%)/;
        const value = target.style
          .getPropertyValue("transform")
          .match(regex)[0];
        const expectedValue = `-${currentIndex * 100}`;
        expect(value === expectedValue).toBeTruthy();
      },
    );

    it("remains translation within componentsData components even with currentIndex outside of scope", () => {
      const target = page.getByRole("group").element();
      const regex = /\d+(?=%)/;
      const value = Number(
        target.style.getPropertyValue("transform").match(regex)[0],
      );
      const minExpectedValue = 0;
      const maxExpectedValue = Array.isArray(componentsData)
        ? (componentsData.length - 1) * 100
        : 0;

      expect(value).toBeLessThanOrEqual(maxExpectedValue);
      expect(value).toBeGreaterThanOrEqual(minExpectedValue);
    });
  },
);

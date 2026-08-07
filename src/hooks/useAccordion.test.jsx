import useAccordion from "./useAccordion";
import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const visibleChildHeight = "50px";
const hiddenChildContainerHeight = "0px";

const addExpectedResult = (item) => {
  const getExpectedResult = ({ isHidden }, index) => {
    return {
      label: `item ${index}`,
      expectedHeight: isHidden
        ? hiddenChildContainerHeight
        : visibleChildHeight,
    };
  };
  return { ...item, expectedResult: item.visibilities.map(getExpectedResult) };
};

const buttonCases = [
  { label: "Mostrar solo slot 0", visibilities: [{}, { isHidden: true }] },
  { label: "Mostrar slot 0 y 1", visibilities: [{}, {}] },
  {
    label: "No mostrar slots",
    visibilities: [{ isHidden: true }, { isHidden: true }],
  },
].map(addExpectedResult);

function Target({
  visibilities: initialVisibilities,
  isHorizontal,
  items,
  onTransition,
}) {
  const [styles, setVisibilities] = useAccordion({
    visibilities: initialVisibilities,
    isHorizontal,
  });
  const buildButton = ({ label, visibilities }, index) => {
    const onClick = () => setVisibilities(visibilities);
    return (
      <button key={index} onClick={onClick} type="button">
        {label}
      </button>
    );
  };

  const buildChildContainer = (child, index) => {
    return (
      <div key={index} style={styles.childContainer}>
        {child}
      </div>
    );
  };

  return (
    <div>
      <div onTransitionEnd={onTransition} style={styles.parent}>
        {items.map(buildChildContainer)}
      </div>
      {buttonCases.map(buildButton)}
    </div>
  );
}

const addItems = (item) => {
  const buildChild = ({ label }) => (
    <div style={{ height: visibleChildHeight }}>{label}</div>
  );
  return { ...item, items: item.expectedResult.map(buildChild) };
};

const propCases = [
  { visibilities: [{ isHidden: true }, {}] },
  { visibilities: [{ isHidden: true }, { isHidden: true }] },
  { visibilities: [{}, { isHidden: true }] },
]
  .map(addExpectedResult)
  .map(addItems);

describe("useAccordion", () => {
  describe("sets the visibility of the child", () => {
    const setVisibilityExpectation = async (expectedResult) => {
      const setExpectation = async ({ expectedHeight, label }) => {
        const target = await page.getByText(label, { exact: true }).element()
          .parentNode;
        await expect(target).toHaveStyle({ height: expectedHeight });
      };
      await Promise.all(expectedResult.map(setExpectation));
    };

    it.each(propCases)(
      "using the visibilities prop, visibilities = $visibilities",
      async ({ visibilities, items, expectedResult }) => {
        await render(
          <Target visibilities={visibilities} items={items}></Target>,
        );
        await setVisibilityExpectation(expectedResult);
      },
    );

    it.each(buttonCases)(
      "on setting visibility using setVisibilities($visibilities)",
      async ({ label, expectedResult }) => {
        const props = [addExpectedResult, addItems].reduce(
          (total, current) => current(total),
          {
            visibilities: [{ isHidden: true }, {}],
          },
        );
        let hasTransitioned = false;
        const onTransition = () => {
          hasTransitioned = true;
        };
        await render(
          <Target
            visibilities={props.visibilities}
            items={props.items}
            onTransition={onTransition}
          ></Target>,
        );
        const button = await page.getByText(label);

        await button.click();

        await vi.waitFor(
          () => {
            if (hasTransitioned) return;
            throw new Error("parent has not transitioned");
          },
          {
            timeout: 1000,
            interval: 25,
          },
        );

        await setVisibilityExpectation(expectedResult);
      },
    );
  });
});

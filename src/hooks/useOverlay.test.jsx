import { describe, expect, it } from "vitest";
import useOverlay from "./useOverlay";
import { fireEvent, render, screen } from "@testing-library/react";

const PARENT_SIZE = 100;
const CONTAINER_SIZE = 50;

const TestElement = ({ initialValue, position }) => {
  const [isVisible, setIsVisible, overlayStyle] = useOverlay({
    initialValue,
    position,
  });
  return (
    <>
      <button onClick={() => setIsVisible(!isVisible)}></button>
      <div
        data-testid="parent"
        style={{
          position: "relative",
          width: `${PARENT_SIZE}PX`,
          height: `${PARENT_SIZE}PX`,
        }}
      >
        <div
          style={{
            width: `${CONTAINER_SIZE}px`,
            height: `${CONTAINER_SIZE}px`,
            ...overlayStyle,
          }}
          data-testid="target"
        ></div>
      </div>
    </>
  );
};

describe("useOverlay hook test suite", () => {
  const propList1 = [{}, { position: "center" }];
  const propList2 = propList1.map((item) => ({ ...item, initialValue: true }));
  const propList3 = [...propList1, ...propList2];

  it.each(propList1)(
    `hiddens the container element if initialValue is $initialValue and position is $position`,
    ({ initialValue, position }) => {
      render(
        <TestElement
          initialValue={initialValue}
          position={position}
        ></TestElement>,
      );
      const targetElement = screen.queryByTestId("target");
      expect(targetElement).not.toBeVisible();
    },
  );

  it.each(propList3)(
    `toggles the visibility state of the container with initialValue: $initialValue, position:$position`,
    ({ initialValue, position }) => {
      render(
        <TestElement
          initialValue={initialValue}
          position={position}
        ></TestElement>,
      );
      const targetElement = screen.queryByTestId("target");
      const button = screen.queryByRole("button");
      if (initialValue) {
        expect(targetElement).toBeVisible();
        fireEvent.click(button);
        expect(targetElement).not.toBeVisible();
        fireEvent.click(button);
        expect(targetElement).toBeVisible();
      } else {
        expect(targetElement).not.toBeVisible();
        fireEvent.click(button);
        expect(targetElement).toBeVisible();
        fireEvent.click(button);
        expect(targetElement).not.toBeVisible();
      }
    },
  );
});

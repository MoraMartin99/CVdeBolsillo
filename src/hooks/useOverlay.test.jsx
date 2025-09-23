import { describe, expect, it } from "vitest";
import useOverlay from "./useOverlay";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRef } from "react";

const targetId = "target";
const parentId = "parent";

const TestElement = ({ isVisible, position }) => {
  const targetRef = useRef(null);
  const [, , overlayStyle] = useOverlay({
    isVisible,
    position,
    ref: targetRef,
  });
  return (
    <div
      data-testid={parentId}
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          ...overlayStyle,
        }}
        data-testid={targetId}
        ref={targetRef}
      ></div>
    </div>
  );
};

const expectInvisibility = (target) => {
  expect(target).toBeInTheDocument();
  expect(target).not.toBeVisible();
};

describe("useOverlay", () => {
  it("hides the target element if isVisible is falsy", () => {
    render(<TestElement></TestElement>);
    const target = screen.queryByTestId(targetId);

    expectInvisibility(target);
  });

  it("hides the target element if a click event is registered outside the target element", () => {
    render(<TestElement isVisible={true}></TestElement>);
    const target = screen.queryByTestId(targetId);
    const parent = screen.queryByTestId(parentId);

    fireEvent.click(parent);

    expectInvisibility(target);
  });

  it("shows the target element if isVisible is truthy", () => {
    render(<TestElement isVisible={true}></TestElement>);
    const target = screen.queryByTestId(targetId);

    expect(target).toBeVisible();
  });
});

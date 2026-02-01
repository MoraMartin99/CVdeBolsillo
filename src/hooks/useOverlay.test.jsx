import { describe, expect, it } from "vitest";
import useOverlay from "./useOverlay";
import { useRef } from "react";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

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
        width: "50px",
        height: "50px",
      }}
    >
      <div
        style={{
          ...overlayStyle,
          width: "10px",
          height: "10px",
        }}
        data-testid={targetId}
        ref={targetRef}
      ></div>
    </div>
  );
};

const expectInvisibility = async (target) => {
  await expect.element(target).toBeInTheDocument();
  await expect.element(target).not.toBeVisible();
};

describe("useOverlay", () => {
  it("hides the target element if isVisible is falsy", () => {
    render(<TestElement></TestElement>);
    const target = page.getByTestId(targetId);

    expectInvisibility(target);
  });

  it("hides the target element if a click event is registered outside the target element", async () => {
    render(<TestElement isVisible={true}></TestElement>);
    const target = page.getByTestId(targetId);
    const parent = page.getByTestId(parentId);

    await parent.click();

    expectInvisibility(target);
  });

  it("shows the target element if isVisible is truthy", async () => {
    render(<TestElement isVisible={true}></TestElement>);
    const target = page.getByTestId(targetId);

    await expect.element(target).toBeVisible();
  });
});

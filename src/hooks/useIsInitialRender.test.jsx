import useIsInitialRender from "./useIsInitialRender";
import { beforeEach, describe, vi, it, expect } from "vitest";
import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";

const onRenderMock = vi.fn(() => {});

function TestButton() {
  const [count, setCount] = useState(0);
  const isInitialRender = useIsInitialRender();
  const onClick = () => setCount(count + 1);
  onRenderMock(isInitialRender.current);

  return <button onClick={onClick}>{count}</button>;
}

describe("useIsInitialRender hook test suit", () => {
  beforeEach(() => {
    onRenderMock.mockReset();
    render(<TestButton></TestButton>);
  });

  it("return true as the current value on initial render", () => {
    expect(onRenderMock).toHaveBeenCalledExactlyOnceWith(true);
  });

  it("return false as the current value on re-renders", () => {
    const targetElement = screen.queryByRole("button");
    fireEvent.click(targetElement);
    expect(onRenderMock).toHaveBeenCalledTimes(2);
    expect(onRenderMock).toHaveBeenLastCalledWith(false);
  });
});

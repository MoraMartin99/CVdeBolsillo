import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useScreenSize from "./useScreenSize";
import { fireEvent, render, screen } from "@testing-library/react";

const initialWidth = "777";
const innerWidthSpy = vi
  .spyOn(window, "innerWidth", "get")
  .mockImplementation(() => initialWidth);

const TestElement = () => {
  const size = useScreenSize();
  return <p>{size}</p>;
};

describe("useScreenSize", () => {
  beforeEach(() => render(<TestElement></TestElement>));

  afterEach(() => vi.resetAllMocks());

  it("returns the current windows size as its initial value", () => {
    const target = screen.queryByText(initialWidth);
    expect(target).toBeInTheDocument();
  });

  it("returns the current windows size on resize events", () => {
    const newWidth = "12";
    innerWidthSpy.mockReturnValue(newWidth);
    fireEvent.resize(window);
    const target = screen.queryByText(newWidth);
    expect(target).toBeInTheDocument();
  });
});

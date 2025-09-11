import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const smallSize = 150;
const bigSize = 950;
const useScreenSizeMock = vi.fn(() => smallSize);
const buildScreensMock = vi.fn(() => [<div key={0}></div>]);
let Main;

describe("Main", async () => {
  beforeEach(async () => {
    const mocks = [
      ["../../hooks/useScreenSize", useScreenSizeMock],
      ["./buildScreens", buildScreensMock],
    ];
    const setMocks = ([path, mock]) => {
      vi.doMock(path, () => ({ default: mock }));
    };
    mocks.forEach(setMocks);
    Main = (await import("./Main")).default;
  });

  afterEach(() => vi.resetAllMocks());

  it("renders a single panel if screenSize < minDualPanelScreenWidth", () => {
    render(<Main></Main>);
    const { hasIndependentLastPanel } = buildScreensMock.mock.lastCall[0];
    expect(hasIndependentLastPanel).toBeFalsy();
  });

  it("renders a dual panel if screenSize >= minDualPanelScreenWidth", () => {
    useScreenSizeMock.mockReturnValueOnce(bigSize);
    render(<Main></Main>);
    const { hasIndependentLastPanel } = buildScreensMock.mock.lastCall[0];
    expect(hasIndependentLastPanel).toBeTruthy();
  });

  it("changes it's state on screen's value changes", () => {
    render(<Main></Main>);
    const expectedValue = { test: "test" };
    const { onChange, data: initialValue } = buildScreensMock.mock.lastCall[0];
    act(() => onChange(expectedValue));
    const { data: finalValue } = buildScreensMock.mock.lastCall[0];
    expect(initialValue).not.toEqual(expectedValue);
    expect(finalValue).toEqual(expectedValue);
  });
});

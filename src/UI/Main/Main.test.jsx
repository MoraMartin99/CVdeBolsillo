import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const smallSize = 150;
const bigSize = 950;
const panelId = "carrousel";
const screenList = ["a", "b", "c"];
const useScreenSizeMock = vi.fn(() => smallSize);
const buildScreensMock = vi.fn(() => screenList);
const PanelMock = vi.fn(({ screens }) => {
  return <div data-testid={panelId}>{screens.join("")}</div>;
});
const minDualPanelScreenWidth = 700;
let Main;

describe("Main", async () => {
  beforeEach(async () => {
    const mocks = [
      ["../../hooks/useScreenSize", useScreenSizeMock],
      ["./buildScreens", buildScreensMock],
      ["../Carrousel/Carrousel", PanelMock],
    ];
    const setMocks = ([path, mock]) => {
      vi.doMock(path, () => ({ default: mock }));
    };
    mocks.forEach(setMocks);
    Main = (await import("./Main")).default;
  });

  afterEach(() => vi.resetAllMocks());

  it("renders a single panel if screenSize < minDualPanelScreenWidth", () => {
    render(<Main {...{ minDualPanelScreenWidth }}></Main>);
    const panels = screen.queryAllByTestId(panelId);
    expect(panels).toHaveLength(1);
  });

  describe("renders a dual panel if screenSize >= minDualPanelScreenWidth", () => {
    const screenSizes = [minDualPanelScreenWidth, bigSize];
    const renderScreen = (screenSize) => {
      useScreenSizeMock.mockReturnValueOnce(screenSize);
      render(<Main {...{ minDualPanelScreenWidth }}></Main>);
    };

    it.each(screenSizes)("has 2 panels with screenSize = %i", (screenSize) => {
      renderScreen(screenSize);
      const panels = screen.queryAllByTestId(panelId);
      expect(panels).toHaveLength(2);
    });

    it("first panel contains all the screens excluding the last screen", () => {
      renderScreen(bigSize);
      const panels = screen.queryAllByTestId(panelId);
      const text = screenList.slice(0, screenList.length - 1).join("");
      const [target] = panels;
      expect(target).toHaveTextContent(text);
    });

    it("last panel only contains the last screen", () => {
      renderScreen(bigSize);
      const panels = screen.queryAllByTestId(panelId);
      const text = screenList[screenList.length - 1];
      const [, target] = panels;
      expect(target).toHaveTextContent(text);
    });
  });

  it("changes it's state on screen's value changes", () => {
    render(<Main {...{ minDualPanelScreenWidth }}></Main>);
    const expectedValue = { test: "test" };
    const { onChange, userData: initialValue } =
      buildScreensMock.mock.lastCall[0];
    act(() => onChange(expectedValue));
    const { userData: finalValue } = buildScreensMock.mock.lastCall[0];
    expect(initialValue).not.toEqual(expectedValue);
    expect(finalValue).toEqual(expectedValue);
  });
});

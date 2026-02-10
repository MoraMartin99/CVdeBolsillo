import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { act } from "react";

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
const getPanels = () => page.getByTestId(panelId).elements();

describe("Main", async () => {
  beforeEach(async () => {
    const mocks = [
      ["../../hooks/useScreenSize", useScreenSizeMock],
      ["./buildScreens", buildScreensMock],
      ["../Carrousel/Carrousel", PanelMock],
    ];
    const setMocks = ([path, mock]) => {
      vi.doMock(import(path), () => ({ default: mock }));
    };
    mocks.forEach(setMocks);
    Main = (await import("./Main")).default;
  });

  afterEach(() => vi.resetAllMocks());

  it("renders a single panel if screenSize < minDualPanelScreenWidth", async () => {
    await render(<Main {...{ minDualPanelScreenWidth }}></Main>);
    const panels = getPanels();
    expect(panels).toHaveLength(1);
  });

  describe("renders a dual panel if screenSize >= minDualPanelScreenWidth", () => {
    const screenSizes = [minDualPanelScreenWidth, bigSize];
    const renderScreen = async (screenSize) => {
      useScreenSizeMock.mockReturnValueOnce(screenSize);
      await render(<Main {...{ minDualPanelScreenWidth }}></Main>);
    };

    it.each(screenSizes)(
      "has 2 panels with screenSize = %i",
      async (screenSize) => {
        await renderScreen(screenSize);
        const panels = getPanels();
        expect(panels).toHaveLength(2);
      },
    );

    it("first panel contains all the screens excluding the last screen", async () => {
      await renderScreen(bigSize);
      const panels = getPanels();
      const text = screenList.slice(0, screenList.length - 1).join("");
      const [target] = panels;
      expect(target).toHaveTextContent(text);
    });

    it("last panel only contains the last screen", async () => {
      await renderScreen(bigSize);
      const panels = getPanels();
      const text = screenList[screenList.length - 1];
      const [, target] = panels;
      expect(target).toHaveTextContent(text);
    });
  });

  it("changes it's state on screen's value changes", async () => {
    await render(<Main {...{ minDualPanelScreenWidth }}></Main>);
    const expectedValue = { test: "test" };
    const { onChange, userData: initialValue } =
      buildScreensMock.mock.lastCall[0];
    act(() => onChange(expectedValue));
    const { userData: finalValue } = buildScreensMock.mock.lastCall[0];
    expect(initialValue).not.toEqual(expectedValue);
    expect(finalValue).toEqual(expectedValue);
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import ScreenCarrousel from "./ScreenCarrousel";
import { useState } from "react";

const buildSettings = (label, index) => {
  const buildNode = (label, index) => {
    return (
      <div
        style={{ width: "10px", height: "10px", fontSize: "12px" }}
        key={index}
      >
        {label}
      </div>
    );
  };

  return { label, node: buildNode(label, index) };
};

const screensSettings = ["screen 1", "screen 2"].map(buildSettings);

const onScreenNavigationMock = vi.fn(() => {});

const Test = ({ currentScreen: currentScreenProp = 0 }) => {
  const [currentScreen, setCurrentScreen] = useState(currentScreenProp);
  const onClick = () => setCurrentScreen(currentScreen ? 0 : 1);
  return (
    <>
      <ScreenCarrousel
        onScreenNavigation={onScreenNavigationMock}
        screensContent={screensSettings.map(({ node }) => node)}
        currentScreen={currentScreen}
        style={{ "--transitionTime": "150ms" }}
      ></ScreenCarrousel>
      <button onClick={onClick} type="button">
        switch screen
      </button>
    </>
  );
};

const cases = [0, 1];

describe("ScreenCarrousel", () => {
  afterEach(() => vi.resetAllMocks());

  it.each(cases)(
    "runs onScreenNavigation when some screen changes its visibility, initial screen = %d",
    async (currentScreen) => {
      let hasNewCurrentScreen = false;
      const timeout = 200;
      setTimeout(() => {
        hasNewCurrentScreen = true;
      }, timeout);
      await render(<Test currentScreen={currentScreen}></Test>);
      const button = page.getByRole("button");
      await button.click();
      await vi.waitFor(
        () => {
          if (!hasNewCurrentScreen) throw new Error(":(");
        },
        {
          timeout: 1000,
          interval: timeout + 2,
        },
      );
      const setCallExpectation = async ({ label }, index) => {
        const content = page.getByText(label);
        await expect(
          onScreenNavigationMock.mock.lastCall[0][index],
        ).toContainElement(content);
      };
      expect(onScreenNavigationMock).toHaveBeenCalledOnce();
      await Promise.all(screensSettings.map(setCallExpectation));
    },
  );
});

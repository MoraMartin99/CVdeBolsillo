import { beforeEach, describe, expect, it, vi } from "vitest";
import onceInViewport from "./onceInViewport";
import { useRef, useState } from "react";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const callbackMock = vi.fn(() => {});
const visibilityButtonId = "visibilityButton";
const runCallbackButtonId = "runCallbackButton";
const targetId = "target";

const TestComponent = ({ isVisible: isVisibleProp = true }) => {
  const [isVisible, setIsVisible] = useState(isVisibleProp);
  const targetRef = useRef(null);
  return (
    <>
      <div
        data-testid={targetId}
        ref={targetRef}
        style={{
          fontSize: "12px",
          padding: "5px",
          backgroundColor: "pink",
          display: isVisible ? "block" : "none",
        }}
      >
        Hola
      </div>
      <button
        data-testid={visibilityButtonId}
        style={{ fontSize: "10px" }}
        type="button"
        onClick={() => setIsVisible(!isVisible)}
      >
        toggle visibility
      </button>
      <button
        data-testid={runCallbackButtonId}
        style={{ fontSize: "10px" }}
        type="button"
        onClick={() => {
          onceInViewport(targetRef.current, callbackMock);
        }}
      >
        run callback
      </button>
    </>
  );
};

const getToggleVisibilityButton = () => page.getByTestId(visibilityButtonId);
const getRunCallbackButton = () => page.getByTestId(runCallbackButtonId);
const getTarget = () => page.getByTestId(targetId);

describe("onceInViewport", () => {
  beforeEach(() => vi.resetAllMocks());

  describe("runs callback", () => {
    it("if target is already in viewport", async () => {
      await render(<TestComponent></TestComponent>);
      await getRunCallbackButton().click();

      await vi.waitFor(() => {
        if (!callbackMock.mock.calls.length) {
          throw new Error("no se llamo el callback");
        }
      });

      expect(callbackMock).toHaveBeenCalledExactlyOnceWith(
        getTarget().element(),
      );
    });

    it("if target appears in viewport", async () => {
      await render(<TestComponent isVisible={false}></TestComponent>);
      await getRunCallbackButton().click();
      await getToggleVisibilityButton().click();

      await vi.waitFor(() => {
        if (!callbackMock.mock.calls.length) {
          throw new Error("no se llamo el callback");
        }
      });

      expect(callbackMock).toHaveBeenCalledExactlyOnceWith(
        getTarget().element(),
      );
    });
  });

  it("doesn't run callback if target is not in viewport", async () => {
    await render(<TestComponent isVisible={false}></TestComponent>);
    await getRunCallbackButton().click();

    await vi.waitFor(() => {
      if (callbackMock.mock.calls.length) {
        throw new Error("se llamo el callback");
      }
    });

    expect(callbackMock).toHaveBeenCalledTimes(0);
  });
});

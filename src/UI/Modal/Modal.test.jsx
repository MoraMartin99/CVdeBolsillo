import { describe, afterEach, vi, it, expect } from "vitest";
import SUT from "./Modal";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const onOutsideClickMock = vi.fn(() => {});
const onScrollMock = vi.fn(() => {});
const targetSiblingId = "sibling";

const renderComponent = async ({ isOpen }) => {
  const baseStyle = {
    fontSize: "16px",
  };
  const style1 = { ...baseStyle, height: "50px", backgroundColor: "salmon" };
  const style2 = { ...style1, backgroundColor: "greenyellow" };
  await render(
    <div style={{ position: "relative" }}>
      <div style={style1}>1</div>
      <div data-testid={targetSiblingId} style={style2}>
        2
      </div>
      <SUT isOpen={isOpen} onOutsideClick={onOutsideClickMock}>
        <div
          style={{
            ...baseStyle,
            backgroundColor: "cyan",
          }}
          data-testid="child1"
        >
          modal
        </div>
      </SUT>
    </div>,
  );
  document.body.style.height = "80px";
  page.viewport(100, 80);
};

describe("Modal", () => {
  afterEach(() => vi.resetAllMocks());

  const truthyCases = [true, 1, "hi", [], () => {}, {}];

  it.each(truthyCases)(
    "shows the component if isOpen is truthy, isOpen = %s",
    async (isOpen) => {
      renderComponent({ isOpen });
      const target = page.getByRole("dialog");
      await expect.element(target).toBeVisible();
    },
  );

  const falsyCases = [false, null, undefined, NaN, 0, ""];

  it.each(falsyCases)(
    "hides the component if isOpen is falsy, isOpen = %s",
    async (isOpen) => {
      renderComponent({ isOpen });
      const target = page.getByRole("dialog", { includeHidden: true });
      await expect.element(target).not.toBeVisible();
    },
  );

  it("prevents scroll events on the body", async () => {
    await renderComponent({ isOpen: true });
    const targetElement = page.getByTestId(targetSiblingId).element();
    const body = document.body;
    body.addEventListener("scroll", onScrollMock);
    targetElement.scrollIntoView({ behavior: "instant" });
    expect(onScrollMock).not.toHaveBeenCalled();
  });

  describe("on clicks inside the modal", () => {
    it("doesn't run onOutsideClick if its defined", async () => {
      renderComponent({ isOpen: true });
      const target = page.getByRole("dialog");
      await target.click();
      expect(onOutsideClickMock).not.toHaveBeenCalled();
    });
  });

  describe("on clicks outside the modal", () => {
    it("runs onOutsideClick if its define", async () => {
      renderComponent({ isOpen: true });
      const target = page.getByRole("dialog");
      await target.click({ position: { x: 0, y: -5 } });
      expect(onOutsideClickMock).toHaveBeenCalledOnce();
    });
  });
});

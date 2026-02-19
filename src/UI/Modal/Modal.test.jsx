import { describe, afterEach, vi, it, expect } from "vitest";
import SUT from "./Modal";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const onOutsideClickMock = vi.fn(() => {});
const renderComponent = ({ isOpen }) => {
  render(
    <SUT isOpen={isOpen} onOutsideClick={onOutsideClickMock}>
      <div
        style={{ backgroundColor: "red", padding: "10px", fontSize: "16px" }}
        data-testid="child"
      >
        Soy un elemento!!!
      </div>
    </SUT>,
  );
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

  describe("on clicks", () => {
    describe("inside the modal", () => {
      it("doesn't run onOutsideClick if its defined", async () => {
        renderComponent({ isOpen: true });
        const target = page.getByRole("dialog");
        await target.click();
        expect(onOutsideClickMock).not.toHaveBeenCalled();
      });
    });

    describe("outside the modal", () => {
      it("runs onOutsideClick if its define", async () => {
        renderComponent({ isOpen: true });
        const target = page.getByRole("dialog");
        await target.click({ position: { x: -5, y: -5 } });
        expect(onOutsideClickMock).toHaveBeenCalledOnce();
      });
    });
  });
});

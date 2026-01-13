import { describe, beforeEach, afterEach, vi, it, expect } from "vitest";
import SUT from "./Modal";
import { fireEvent, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";

const visibilities = [undefined, false, true];
const getBoundingClientRectSpy = vi.spyOn(
  HTMLDialogElement.prototype,
  "getBoundingClientRect",
);
const onOutsideClickMock = vi.fn(() => {});

describe("Modal", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function () {
      this.setAttribute("open", true);
    });
    HTMLDialogElement.prototype.close = vi.fn(function () {
      this.setAttribute("open", false);
    });
  });

  afterEach(() => vi.resetAllMocks());

  it.each(visibilities)("shows or hides based on isOpen = %s", (isOpen) => {
    render(<SUT isOpen={isOpen}></SUT>);
    const target = screen.queryByRole("dialog");
    const expectedVisibility = String(Boolean(isOpen));
    expect(target).toHaveAttribute("open", expectedVisibility);
  });

  describe("on clicks", () => {
    const clickElement = ({
      isOpen = true,
      onOutsideClick = onOutsideClickMock,
      clientX = 25,
      clientY = 10,
    } = {}) => {
      getBoundingClientRectSpy.mockReturnValue({
        left: 10,
        right: 15,
        top: 0,
        bottom: 5,
      });
      render(<SUT isOpen={isOpen} onOutsideClick={onOutsideClick}></SUT>);
      const target = screen.queryByRole("dialog");
      fireEvent.click(target, { clientX, clientY });
    };
    describe("inside the modal", () => {
      it("doesn't run onOutsideClick if its defined and isOpen is truthy", () => {
        clickElement({
          clientX: 11,
          clientY: 1,
        });
        expect(onOutsideClickMock).toHaveBeenCalledTimes(0);
      });
    });

    describe("outside the modal", () => {
      it("runs onOutsideClick if its define and isOpen is truthy", () => {
        clickElement();
        expect(onOutsideClickMock).toHaveBeenCalledOnce();
      });
    });
  });
});

import { describe, beforeEach, afterEach, vi, it, expect } from "vitest";
import SUT from "./Modal";
import { fireEvent, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";

const visibilities = [undefined, false, true];
const getBoundingClientRectSpy = vi.spyOn(
  HTMLDialogElement.prototype,
  "getBoundingClientRect",
);

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

  it("hides if a click is register outside the Modal if isOpen is truthy", () => {
    getBoundingClientRectSpy.mockReturnValue({
      left: 10,
      right: 15,
      top: 0,
      bottom: 5,
    });
    render(<SUT isOpen={true}></SUT>);
    const target = screen.queryByRole("dialog");
    fireEvent.click(target, { clientX: 25, clientY: 10 });
    expect(target).toHaveAttribute("open", "false");
  });
});

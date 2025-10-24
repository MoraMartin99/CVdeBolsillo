import { beforeEach, describe, it, vi, afterEach, expect } from "vitest";
import ConfirmationModal from "./ConfirmationModal";
import { fireEvent, render, screen } from "@testing-library/react";

const onAcceptMock = vi.fn(() => {});
const onCancelMock = vi.fn(() => {});
const getBoundingClientRectSpy = vi.spyOn(
  HTMLDialogElement.prototype,
  "getBoundingClientRect",
);
const visibilities = [undefined, false, true];
const renderComponent = ({
  isOpen,
  onAccept = onAcceptMock,
  onCancel = onCancelMock,
}) => {
  render(
    <ConfirmationModal {...{ isOpen, onAccept, onCancel }}></ConfirmationModal>,
  );
};

describe("ConfirmationModal", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function () {
      this.setAttribute("open", true);
    });
    HTMLDialogElement.prototype.close = vi.fn(function () {
      this.setAttribute("open", false);
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it.each(visibilities)(
    "changes its visibility based on isOpen = %s",
    (isOpen) => {
      renderComponent({ isOpen });
      const target = screen.queryByRole("dialog");
      const expectedVisibility = String(Boolean(isOpen));
      expect(target).toHaveAttribute("open", expectedVisibility);
    },
  );

  it("hides if a click is register outside the menu", () => {
    getBoundingClientRectSpy.mockReturnValue({
      left: 10,
      right: 15,
      top: 0,
      bottom: 5,
    });
    renderComponent({ isOpen: true });
    const target = screen.queryByRole("dialog");
    fireEvent.click(target, { clientX: 25, clientY: 10 });
    expect(onCancelMock).toHaveBeenCalledOnce();
  });

  it("runs onAccept on accept button's click events", () => {
    renderComponent({ isOpen: true });
    const target = screen.queryByText("Aceptar");
    fireEvent.click(target);
    expect(onAcceptMock).toHaveBeenCalledOnce();
  });

  it("runs onCancel on cancel button's click events", () => {
    renderComponent({ isOpen: true });
    const target = screen.queryByText("Cancelar");
    fireEvent.click(target);
    expect(onCancelMock).toHaveBeenCalledOnce();
  });
});

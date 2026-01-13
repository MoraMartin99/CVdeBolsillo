import { beforeEach, describe, it, vi, afterEach, expect } from "vitest";
import ConfirmationModal from "./ConfirmationModal";
import { fireEvent, render, screen } from "@testing-library/react";

const onAcceptMock = vi.fn(() => {});
const onCancelMock = vi.fn(() => {});
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

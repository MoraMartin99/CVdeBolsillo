import { beforeEach, describe, it, vi, afterEach, expect } from "vitest";
import ConfirmationModal from "./ConfirmationModal";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const onAcceptMock = vi.fn(() => {});
const onCancelMock = vi.fn(() => {});

describe("ConfirmationModal", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function () {
      this.setAttribute("open", true);
    });
    HTMLDialogElement.prototype.close = vi.fn(function () {
      this.setAttribute("open", false);
    });
    render(
      <ConfirmationModal
        isOpen={true}
        onAccept={onAcceptMock}
        onCancel={onCancelMock}
      ></ConfirmationModal>,
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("runs onAccept on accept button's click events", async () => {
    const target = page.getByText("Aceptar");
    await target.click();
    expect(onAcceptMock).toHaveBeenCalledOnce();
  });

  it("runs onCancel on cancel button's click events", async () => {
    const target = page.getByText("Cancelar");
    await target.click();
    expect(onCancelMock).toHaveBeenCalledOnce();
  });
});

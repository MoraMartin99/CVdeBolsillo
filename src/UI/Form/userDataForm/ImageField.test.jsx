import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ImageField from "./ImageField";
import { fireEvent, render, screen } from "@testing-library/react";
import resizeObserverMock from "../../../mocks/resizeObserverMock";

const primaryActionLabel = "Cargar";
const destructiveActionLabel = "Remover";
const inputTestId = "fileInput";
const onClickMock = vi.fn(() => {});
const submitDataMock = vi.fn(() => {});

const renderSubject = (value) => {
  render(
    <ImageField
      {...{
        primaryActionLabel,
        destructiveActionLabel,
        submitData: submitDataMock,
        value,
      }}
    ></ImageField>,
  );
};

describe("ImageField", () => {
  beforeEach(() => vi.stubGlobal("ResizeObserver", resizeObserverMock));

  afterEach(() => vi.resetAllMocks());

  it("opens the file dialog on load button`s click", () => {
    renderSubject();
    const input = screen.queryByTestId(inputTestId);
    const button = screen.queryByText(primaryActionLabel);
    input.addEventListener("click", onClickMock);

    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledOnce();
  });

  describe("on file selection", () => {
    const createFile = ({ fileName, type }) => {
      return new File([fileName], fileName, { type });
    };
    const imageFiles = [
      { fileName: "1.png", type: "image/png" },
      { fileName: "2.svg", type: "image/svg+xml" },
      { fileName: "2.jpeg", type: "image/jpeg" },
      { fileName: "2.webp", type: "image/webp" },
      { fileName: "2.webp", type: "image/webp" },
    ].map(createFile);

    const pdfFile = createFile({ fileName: "a.pdf", type: "application/pdf" });

    beforeEach(() => {
      renderSubject();
      vi.spyOn(FileReader.prototype, "readAsDataURL").mockImplementation(
        function (file) {
          if (this.onload) this.onload({ target: { result: file.name } });
        },
      );
    });

    afterEach(() => vi.restoreAllMocks());

    it.each(imageFiles)("accepts image files", (file) => {
      const input = screen.queryByTestId(inputTestId);
      const options = { target: { files: [file] } };

      fireEvent.change(input, options);

      expect(submitDataMock).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ value: { source: file.name } }),
      );
    });

    it("declines non image files", () => {
      const file = pdfFile;
      const input = screen.queryByTestId(inputTestId);
      const options = { target: { files: [file] } };

      fireEvent.change(input, options);

      expect(submitDataMock).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ value: {} }),
      );
    });
  });

  it("removes the image on remove buttons`s click", () => {
    const value = {
      source: "./test.svg",
      scale: 2,
      positionX: 15,
      positionY: 24,
    };
    renderSubject(value);
    const button = screen.queryByText(destructiveActionLabel);

    fireEvent.click(button);

    expect(submitDataMock).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ value: {} }),
    );
  });
});

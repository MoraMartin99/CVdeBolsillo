import ImageField from "./ImageField";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import png from "./test/1.png";
import svg from "./test/2.svg";
import jpg from "./test/3.jpg";
import webp from "./test/4.webp";
import pdf from "./test/1.pdf";
import { describe, it, vi, expect, afterEach } from "vitest";
import "../../../global.css";
import "../../../variables.css";

const primaryActionLabel = "Cargar";
const destructiveActionLabel = "Remover";
const submitDataMock = vi.fn(() => {});
const alt = "test image";
const inputTestId = "fileInput";
const id = "imageField";

const validImageCases = [
  { path: png, type: "png" },
  { path: svg, type: "svg" },
  { path: jpg, type: "jpeg" },
  { path: webp, type: "webp" },
];

class SubmitCall {
  constructor() {
    this.id = id;
    this.isInvalid = false;
    this.value = null;
  }
}

class SuccessfulCall extends SubmitCall {
  constructor({ source, scale, positionX, positionY }) {
    super();
    this.value = { source, scale, positionX, positionY };
  }
}

class FailedCall extends SubmitCall {
  constructor() {
    super();
    this.value = {};
  }
}

const renderSubject = (value) => {
  render(
    <ImageField
      {...{
        primaryActionLabel,
        destructiveActionLabel,
        submitData: submitDataMock,
        value,
        alt,
        id,
      }}
    ></ImageField>,
  );
};

const getImage = () => page.getByAltText(alt);

describe("ImageField", () => {
  afterEach(() => vi.resetAllMocks());

  it("it displays a placeholder image if it has no image source", async () => {
    renderSubject();
    const img = getImage();
    await expect.element(img).toHaveAttribute("src");
  });

  describe("sets image as value", async () => {
    it.each(validImageCases)(
      "accepts $type image received as a prop",
      async ({ path }) => {
        const value = {
          source: path,
          scale: 2,
          positionX: 15,
          positionY: 24,
        };
        renderSubject(value);
        const img = getImage();
        await expect.element(img).toHaveAttribute("src", path);
      },
    );

    const createFileData = async (data) => {
      const { path, type } = data;
      const name = `file.${type}`;
      const response = await fetch(path);
      const blob = await response.blob();
      const file = new File([blob], name, { type: blob.type });
      return { ...data, file };
    };

    const addExpectedResult = async (data) => {
      const { type, file } = data;

      class Result {
        constructor() {
          this.expectedCall = null;
          this.callCount = 1;
          this.isAccepted = true;
        }
      }

      class InvalidResult extends Result {
        constructor() {
          super();
          this.expectedCall = new FailedCall();
          this.isAccepted = false;
        }
      }

      class ValidResult extends Result {
        constructor(source) {
          super();
          this.expectedCall = new SuccessfulCall({ source });
        }
      }

      if (type === "pdf") return { ...data, ...new InvalidResult() };
      const source = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
      return { ...data, ...new ValidResult(source) };
    };

    const createFileCase = async (data) => {
      const fileData = await createFileData(data);
      const fileCase = await addExpectedResult(fileData);
      return fileCase;
    };

    const fileCases = await Promise.all(
      [...validImageCases, { path: pdf, type: "pdf" }].map(createFileCase),
    );

    it.each(fileCases)(
      "only accepts image files if received from the file dialog, type = $type, isAccepted = $isAccepted",
      async ({ file, expectedCall, callCount }) => {
        renderSubject();
        const input = page.getByTestId(inputTestId);
        await input.upload(file);
        const lastCall = submitDataMock.mock.lastCall;
        const result = lastCall ? lastCall[0] : undefined;
        expect(submitDataMock).toHaveBeenCalledTimes(callCount);
        expect(result).toEqual(expectedCall);
      },
    );
  });

  it("reports a value reset on remove buttons`s click", async () => {
    const value = {
      source: svg,
      scale: 2,
      positionX: 15,
      positionY: 24,
    };
    const expectedCall = new FailedCall();
    renderSubject(value);
    const button = page.getByText(destructiveActionLabel);

    await button.click();

    const lastCall = submitDataMock.mock.lastCall;
    const result = lastCall ? lastCall[0] : undefined;
    expect(submitDataMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedCall);
  });
});

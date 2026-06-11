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

const getSubmitCall = ({ value = null, isInvalid = false }) => {
  return [
    id,
    {
      value,
      isInvalid,
    },
  ];
};

const getSuccessfulCall = (value) => getSubmitCall({ value });

const getFailedCall = () => getSubmitCall({ value: {} });

const renderSubject = async (value) => {
  await render(
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
    await renderSubject();
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
        await renderSubject(value);
        const img = getImage();
        await expect.element(img).toHaveAttribute("src", path);
      },
    );

    const addFile = async (data) => {
      const { path, type } = data;
      const name = `file.${type}`;
      const response = await fetch(path);
      const blob = await response.blob();
      const file = new File([blob], name, { type: blob.type });
      return { ...data, file };
    };

    const addExpectedCall = async (data) => {
      const acceptedTypes = validImageCases.map(({ type }) => type);
      if (!acceptedTypes.includes(data.type)) {
        return { ...data, expectedCall: getFailedCall() };
      }

      const source = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(data.file);
      });
      return { ...data, expectedCall: getSuccessfulCall({ source }) };
    };

    const addIsAccepted = async (data) => {
      const acceptedTypes = validImageCases.map(({ type }) => type);
      return { ...data, isAccepted: acceptedTypes.includes(data.type) };
    };

    const createFileCase = async (data) => {
      const transformations = [addFile, addExpectedCall, addIsAccepted];
      return transformations.reduce(
        async (result, transformation) => transformation(await result),
        Promise.resolve(data),
      );
    };

    const fileCases = await Promise.all(
      [...validImageCases, { path: pdf, type: "pdf" }].map(createFileCase),
    );

    it.each(fileCases)(
      "only accepts image files if received from the file dialog, type = $type, isAccepted = $isAccepted",
      async ({ file, expectedCall }) => {
        await renderSubject();
        const input = page.getByTestId(inputTestId);
        await input.upload(file);
        await vi.waitFor(
          () => {
            if (submitDataMock.mock.lastCall) return;
            throw new Error("submitDataMock has not been called");
          },
          { timeout: 1000, interval: 100 },
        );
        expect(submitDataMock).toHaveBeenCalledExactlyOnceWith(...expectedCall);
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
    await renderSubject(value);
    const button = page.getByText(destructiveActionLabel);

    await button.click();

    const lastCall = submitDataMock.mock.lastCall;
    const result = lastCall ? lastCall[0] : undefined;
    expect(submitDataMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(...getFailedCall());
  });
});

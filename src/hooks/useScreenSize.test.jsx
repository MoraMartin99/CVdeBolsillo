import { beforeEach, describe, expect, it } from "vitest";
import useScreenSize from "./useScreenSize";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const initialWidth = 1920;
const finalWidth = 720;
const height = 1080;

const TestElement = () => {
  const size = useScreenSize();
  return <p>{size}</p>;
};

describe("useScreenSize", () => {
  beforeEach(() => {
    page.viewport(initialWidth, height);
    render(<TestElement></TestElement>);
  });

  it("returns the current windows size as its initial value", async () => {
    const target = page.getByText(initialWidth);
    await expect.element(target).toBeInTheDocument();
  });

  it("returns the current windows size on resize events", async () => {
    page.viewport(finalWidth, height);
    const target = page.getByText(finalWidth);
    await expect.element(target).toBeInTheDocument();
  });
});

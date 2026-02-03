import { describe, expect, it } from "vitest";
import FormButton from "./FormButton";
import css from "./FormButton.module.css";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

describe("FormButton", () => {
  it("renders the button as primary if variant is falsy", async () => {
    const expectedClass = css.primary;
    render(<FormButton></FormButton>);
    const target = page.getByRole("button");
    await expect.element(target).toHaveClass(expectedClass);
  });

  it("renders the button as destructive if variant === destructive", async () => {
    const expectedClass = css.destructive;
    render(<FormButton variant="destructive"></FormButton>);
    const target = page.getByRole("button");
    await expect.element(target).toHaveClass(expectedClass);
  });

  it("renders the button as primary if variant === primary", async () => {
    const expectedClass = css.primary;
    render(<FormButton variant="primary"></FormButton>);
    const target = page.getByRole("button");
    await expect.element(target).toHaveClass(expectedClass);
  });
});

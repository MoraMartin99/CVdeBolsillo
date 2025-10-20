import { describe, expect, it } from "vitest";
import FormButton from "./FormButton";
import css from "./FormButton.module.css";
import { render, screen } from "@testing-library/react";

describe("FormButton", () => {
  it("renders the button as primary if variant is falsy", () => {
    const expectedClass = css.primary;
    render(<FormButton></FormButton>);
    const target = screen.queryByRole("button");
    expect(target).toHaveClass(expectedClass);
  });

  it("renders the button as destructive if variant === destructive", () => {
    const expectedClass = css.destructive;
    render(<FormButton variant="destructive"></FormButton>);
    const target = screen.queryByRole("button");
    expect(target).toHaveClass(expectedClass);
  });

  it("renders the button as primary if variant === primary", () => {
    const expectedClass = css.primary;
    render(<FormButton variant="primary"></FormButton>);
    const target = screen.queryByRole("button");
    expect(target).toHaveClass(expectedClass);
  });
});

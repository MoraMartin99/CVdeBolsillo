import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SUT from "./ClassicInput";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";

const onChangeMock = vi.fn(() => {});
const onClickMock = vi.fn(() => {});

describe("ClassicInput", () => {
  beforeEach(() =>
    render(<SUT onChange={onChangeMock} onClick={onClickMock}></SUT>),
  );

  afterEach(() => vi.resetAllMocks());

  describe("runs onChange", () => {
    it("on first blur", async () => {
      const target = page.getByRole("textbox");
      await target.click();
      await userEvent.tab();
      expect(onChangeMock).toHaveBeenCalledOnce();
    });

    it("on value change", async () => {
      const target = page.getByRole("textbox");
      const text = "hola!";
      await target.fill(text);
      expect(onChangeMock).toHaveBeenCalledOnce();
    });
  });

  it("runs onClick", async () => {
    const target = page.getByRole("textbox");
    await target.click();
    expect(onClickMock).toHaveBeenCalledOnce();
  });
});

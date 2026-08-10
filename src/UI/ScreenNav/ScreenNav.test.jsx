import ScreenNav from "./ScreenNav";
import "../../global.css";
import "../../variables.css";
import { afterEach, describe, expect, vi, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const setCurrentScreenMock = vi.fn(() => {});
const tabs = [
  { label: "tab 1", id: "tab1" },
  { label: "tab 2", id: "tab2" },
];

describe("ScreenNav", () => {
  afterEach(() => vi.resetAllMocks());

  it.each([0, 1])(
    "reports the tab`s index on click events, index = %d",
    async (index) => {
      await render(
        <ScreenNav
          setCurrentScreen={setCurrentScreenMock}
          tabs={tabs}
        ></ScreenNav>,
      );
      const target = page.getByText(tabs[index].label);
      await target.click();
      expect(setCurrentScreenMock).toHaveBeenCalledExactlyOnceWith(index);
    },
  );
});

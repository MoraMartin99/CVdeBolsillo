import { describe, expect, it, vi, beforeEach } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import SUT from "./MonthYearControl";
import months from "../../months";
import "../../global.css";
import "../../variables.css";
import { useState } from "react";

const onChangeMock = vi.fn(() => {});
const onCloseButtonClickMock = vi.fn(() => {});
const startYear = 2000;
const finishYear = 2009;

const Test = ({
  startYearProp,
  finishYearProp,
  isDisable = false,
  valueProp,
}) => {
  const [value, setValue] = useState(valueProp);
  onChangeMock.mockImplementation(setValue);
  return (
    <>
      <SUT
        startYear={startYearProp}
        finishYear={finishYearProp}
        onChange={onChangeMock}
        isDisable={isDisable}
        onCloseButtonClick={onCloseButtonClickMock}
        value={value}
      ></SUT>
    </>
  );
};

const expectTileInTheComponent = async (label) => {
  const target = page.getByText(label);
  await expect.element(target).toBeInTheDocument();
};

describe("MonthYearControl", () => {
  beforeEach(() => vi.resetAllMocks());

  describe("month selector", () => {
    it("renders 12 tiles", async () => {
      await render(<Test></Test>);
      const getLabel = ({ label }) => label;
      await Promise.all(months.map(getLabel).map(expectTileInTheComponent));
    });
  });

  describe("year selector", () => {
    describe("renders the corresponding tiles", () => {
      const expectTilesInTheSelector = async ({ finishYear, startYear }) => {
        const labels = Array.from(
          { length: finishYear - startYear + 1 },
          (_, index) => startYear + index,
        );
        await Promise.all(labels.map(expectTileInTheComponent));
      };

      it("if startYear is undefined it uses a default value", async () => {
        const defaultValue = finishYear - 60;
        await render(<Test {...{ finishYearProp: finishYear }}></Test>);
        await expectTilesInTheSelector({ startYear: defaultValue, finishYear });
      });

      it("if finishYear is undefined it uses a default value", async () => {
        const defaultValue = new Date().getFullYear();
        await render(<Test startYearProp={startYear}></Test>);
        await expectTilesInTheSelector({ startYear, finishYear: defaultValue });
      });

      it("if startYear and finishYear are defined it renders the amount of tiles corresponding to the years between them", async () => {
        await render(
          <Test finishYearProp={finishYear} startYearProp={startYear}></Test>,
        );
        await expectTilesInTheSelector({ startYear, finishYear });
      });
    });
  });

  describe("runs onChange", () => {
    it("on currently checkbox change", async () => {
      await render(
        <Test finishYearProp={finishYear} startYearProp={startYear}></Test>,
      );
      const target = page.getByRole("checkbox");
      await target.click();
      const checkedValue = {
        isCurrently: true,
      };
      expect(onChangeMock).toHaveBeenLastCalledWith(checkedValue);
      await target.click();
      const uncheckedValue = {
        month: 1,
        year: finishYear,
      };
      expect(onChangeMock).toHaveBeenLastCalledWith(uncheckedValue);
    });
  });

  describe("if isDisable is truthy", () => {
    it("disables currently checkbox", async () => {
      await render(<Test isDisable></Test>);
      const target = page.getByRole("checkbox");
      await expect.element(target).toBeDisabled();
    });
  });

  it("runs onCloseButtonClick on a closeButton click", async () => {
    await render(<Test></Test>);
    const target = page.getByRole("button").first();
    await target.click();
    expect(onCloseButtonClickMock).toHaveBeenCalledOnce();
  });
});

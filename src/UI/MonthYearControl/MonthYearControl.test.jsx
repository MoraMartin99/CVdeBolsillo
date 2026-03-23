import { describe, expect, it, vi, beforeEach } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import SUT from "./MonthYearControl";
import months from "../../months";

const onChangeMock = vi.fn(() => {});
const onCloseButtonClickMock = vi.fn(() => {});
const startYear = 2000;
const finishYear = 2009;

const renderComponent = async (
  { startYearProp, finishYearProp, isDisable } = {
    startYearProp: startYear,
    finishYearProp: finishYear,
  },
) => {
  await render(
    <SUT
      startYear={startYearProp}
      finishYear={finishYearProp}
      onChange={onChangeMock}
      isDisable={isDisable}
      onCloseButtonClick={onCloseButtonClickMock}
    ></SUT>,
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
      await renderComponent();
      const getLabel = ({ label }) => label;
      await Promise.all(months.map(getLabel).map(expectTileInTheComponent));
    });

    it("if value is undefined, it selects January", async () => {
      await renderComponent();
      expect(onChangeMock).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ month: 1 }),
      );
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
        await renderComponent({ finishYearProp: finishYear });
        await expectTilesInTheSelector({ startYear: defaultValue, finishYear });
      });

      it("if finishYear is undefined it uses a default value", async () => {
        const defaultValue = new Date().getFullYear();
        await renderComponent({ startYearProp: startYear });
        await expectTilesInTheSelector({ startYear, finishYear: defaultValue });
      });

      it("if startYear and finishYear are defined it renders the amount of tiles corresponding to the years between them", async () => {
        await renderComponent({
          finishYearProp: finishYear,
          startYearProp: startYear,
        });
        await expectTilesInTheSelector({ startYear, finishYear });
      });
    });

    it("if value is undefined, it selects finishYear", async () => {
      await renderComponent();
      expect(onChangeMock).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ year: finishYear }),
      );
    });
  });

  describe("runs onChange", () => {
    it("on currently checkbox change", async () => {
      await renderComponent();
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
      await renderComponent({ isDisable: true });
      const target = page.getByRole("checkbox");
      await expect.element(target).toBeDisabled();
    });
  });

  it("runs onCloseButtonClick on a closeButton click", async () => {
    await renderComponent();
    const target = page.getByRole("button").first();
    await target.click();
    expect(onCloseButtonClickMock).toHaveBeenCalledOnce();
  });
});

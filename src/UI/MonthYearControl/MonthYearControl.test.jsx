import {
  afterEach,
  describe,
  expect,
  it,
  onTestFailed,
  onTestFinished,
  vi,
} from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import SUT from "./MonthYearControl";
import months from "../../months";

const onChangeMock = vi.fn(() => {});

const renderComponent = async ({ startYear, finishYear }) => {
  await render(
    <SUT
      startYear={startYear}
      finishYear={finishYear}
      onChange={onChangeMock}
    ></SUT>,
  );
};

describe("MonthYearControl", () => {
  afterEach(() => vi.resetAllMocks());

  describe("onChange", () => {
    const startYear = 2000;
    const finishYear = 2009;

    it("runs on tile selection", async () => {
      await renderComponent({ startYear, finishYear });
      const expectedMonth = months[2];
      const monthTile = page.getByText(expectedMonth.label);
      const expectedYear = { value: 2005, label: "2005" };
      const yearTile = page.getByText(expectedYear.label);
      await monthTile.click();
      await yearTile.click();

      expect(onChangeMock).toHaveBeenLastCalledWith({
        month: expectedMonth.value,
        year: expectedYear.value,
      });
    });

    it("runs on checkbox change");
  });

  it("has classArr applied as the last classes");

  it("renders the 12 tiles for the months");

  describe("renders the year's tiles", () => {
    it("if startYear is undefined it uses a default value");
    it("if finishYear is undefined it uses a default value");
    it(
      "if startYear and finishYear are defined it renders the amount of tiles corresponding to the years between them",
    );
  });

  it("sets the component to the defined value: $value");

  it(
    "renders the currently checkbox if allowCurrentlyOption is truthy, allowCurrentlyOption = $allowCurrentlyOption",
  );

  it(
    "doesn't render the currently checkbox if allowCurrentlyOption is falsy, allowCurrentlyOption = $allowCurrentlyOption",
  );

  it(
    "disables TileSelector interfaces and the currently checkbox if isDisable is truthy, isDisable = $isDisable",
  );

  it("runs onCloseButtonClick on a closeButton click");

  it(
    "sets the inline style if the style prop is defined with valid properties",
  );
});

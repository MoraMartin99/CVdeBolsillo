import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, render, fireEvent, act } from "@testing-library/react";
import GenericComponentMock from "../../mocks/GenericComponentMock";

const onChangeMock = vi.fn(() => {});
const onCloseButtonClickMock = vi.fn(() => {});
const getGCMLastCallByLabel = (label) => {
  const calls = GenericComponentMock.mock.calls;
  const finder = ([{ label: currentLabel }]) => label === currentLabel;
  return calls.findLast(finder)[0];
};
const monthTileSelectorLabel = "Mes";
const yearTileSelectorLabel = "Año";
const date = new Date(2000, 0);
const firstYearModifier = -60;
const onChange = onChangeMock;
const onCloseButtonClick = onCloseButtonClickMock;

describe("MonthYearControl component", () => {
  let MonthYearControl;

  beforeEach(async () => {
    vi.doMock("./TileSelector", () => ({ default: GenericComponentMock }));
    const mockList = [
      onChangeMock,
      onCloseButtonClickMock,
      GenericComponentMock,
    ];
    mockList.forEach((item) => item.mockReset());
    vi.setSystemTime(date);
    MonthYearControl = (await import("./MonthYearControl")).default;
  });

  it("renders the parent element if onChange is defined", () => {
    const props = { onChange };
    render(<MonthYearControl {...props}></MonthYearControl>);
    const targetElement = screen.queryByTestId("MonthYearControl");
    expect(targetElement).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("runs onChange on tile selection or checkbox change if isDisable is false and allowCurrentlyOption is true", async () => {
    render(<MonthYearControl onChange={onChange}></MonthYearControl>);
    const expectedMonth = 9;
    const expectedYear = 1999;
    const getSetterByLabel = (label) => getGCMLastCallByLabel(label).onChange;
    const monthSetter = getSetterByLabel(monthTileSelectorLabel);
    await act(async () => {
      monthSetter(expectedMonth);
    });
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ month: expectedMonth }),
    );
    const yearSetter = getSetterByLabel(yearTileSelectorLabel);
    yearSetter(expectedYear);
    await act(async () => {
      yearSetter(expectedYear);
    });
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ month: expectedMonth, year: expectedYear }),
    );
    const targetElement = screen.queryByRole("checkbox");
    fireEvent.click(targetElement);
    expect(onChange).toHaveBeenLastCalledWith({ isCurrently: true });
    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it("has classArr applied as the last classes", () => {
    const props = { classArr: ["test1", "test2"], onChange };
    const { classArr } = props;
    render(<MonthYearControl {...props}></MonthYearControl>);
    const targetElement = screen.queryByTestId("MonthYearControl");
    const classList = Array.from(targetElement.classList);
    expect(classList.slice(-classArr.length)).toEqual(
      expect.arrayContaining(classArr),
    );
  });
  it("renders 12 tiles for the months", () => {
    const props = { onChange };
    render(<MonthYearControl {...props}></MonthYearControl>);
    const itemList = getGCMLastCallByLabel(monthTileSelectorLabel).itemArr;
    expect(itemList).toHaveLength(12);
  });

  it("renders some tiles for the years if startYear and finishYear are undefined", () => {
    const props = { onChange };
    render(<MonthYearControl {...props}></MonthYearControl>);
    const itemList = getGCMLastCallByLabel(yearTileSelectorLabel).itemArr;
    expect(itemList.length).toBeGreaterThan(0);
  });

  const validValuePropList = [
    {
      onChange,
      value: { month: 6, year: 1999 },
    },
    {
      onChange,
      value: { isCurrently: true },
    },
  ];

  it.each(validValuePropList)(
    "sets the component to the defined value: $value",
    ({ onChange, value }) => {
      render(<MonthYearControl {...{ onChange, value }}></MonthYearControl>);
      const { month, year, isCurrently } = value;
      const mapper = (label) => {
        const { itemArr, currentIndex, isDisable } =
          getGCMLastCallByLabel(label);
        return [Object(itemArr[currentIndex]).value, isDisable];
      };
      const [GCMMonthValue, GCMMonthIsDisable, GCMYearValue, GCMYearIsDisable] =
        [monthTileSelectorLabel, yearTileSelectorLabel].flatMap(mapper);
      if (isCurrently) {
        [GCMMonthIsDisable, GCMYearIsDisable].forEach((isDisable) => {
          expect(isDisable).toBeTruthy();
        });
      } else {
        expect(GCMMonthValue).toBe(month);
        expect(GCMYearValue).toBe(year);
      }
    },
  );

  it("render the corresponding amount of tiles if only startYear is defined", () => {
    const startYear = 1995;
    render(
      <MonthYearControl
        onChange={onChange}
        startYear={startYear}
      ></MonthYearControl>,
    );
    const expectedLength = date.getFullYear() - startYear + 1;
    const { itemArr } = getGCMLastCallByLabel(yearTileSelectorLabel);
    expect(itemArr).toHaveLength(expectedLength);
  });

  it("render the corresponding amount of tiles if only finishYear is defined", () => {
    const finishYear = 2005;
    render(
      <MonthYearControl
        onChange={onChange}
        finishYear={finishYear}
      ></MonthYearControl>,
    );
    const expectedLength =
      finishYear - (date.getFullYear() + firstYearModifier) + 1;
    const { itemArr } = getGCMLastCallByLabel(yearTileSelectorLabel);
    expect(itemArr).toHaveLength(expectedLength);
  });

  it("renders the amount of tiles corresponding to the range between startYear and finishYear", () => {
    const finishYear = 2005;
    const startYear = 1995;
    render(
      <MonthYearControl
        onChange={onChange}
        finishYear={finishYear}
        startYear={startYear}
      ></MonthYearControl>,
    );
    const expectedLength = finishYear - startYear + 1;
    const { itemArr } = getGCMLastCallByLabel(yearTileSelectorLabel);
    expect(itemArr).toHaveLength(expectedLength);
  });

  const allowCurrentlyOptionPropList = [
    { onChange },
    { onChange, allowCurrentlyOption: true },
  ];

  it.each(allowCurrentlyOptionPropList)(
    "render the currently checkbox if allowCurrentlyOption $allowCurrentlyOption",
    ({ onChange, allowCurrentlyOption }) => {
      render(
        <MonthYearControl
          onChange={onChange}
          allowCurrentlyOption={allowCurrentlyOption}
        ></MonthYearControl>,
      );
      const targetElement = screen.queryByRole("checkbox");
      expect(targetElement).toBeInTheDocument();
    },
  );

  it("does not render the currently checkbox if allowCurrentlyOption is false", () => {
    const allowCurrentlyOption = false;
    render(
      <MonthYearControl
        onChange={onChange}
        allowCurrentlyOption={allowCurrentlyOption}
      ></MonthYearControl>,
    );
    const targetElement = screen.queryByRole("checkbox");
    expect(targetElement).not.toBeInTheDocument();
  });

  it("disables TileSelector interfaces and the currently checkbox if isDisable is truthy", () => {
    render(<MonthYearControl isDisable onChange={onChange}></MonthYearControl>);
    const targetElement = screen.queryByRole("checkbox");
    const mapper = (label) => getGCMLastCallByLabel(label).isDisable;
    const isDisableList = [monthTileSelectorLabel, yearTileSelectorLabel].map(
      mapper,
    );
    const setExpectation = (item) => expect(item).toBeTruthy();
    isDisableList.forEach(setExpectation);
    expect(targetElement).toBeDisabled();
  });

  it("runs onCloseButtonClick on a closeButton click", () => {
    render(
      <MonthYearControl
        onCloseButtonClick={onCloseButtonClick}
        onChange={onChange}
      ></MonthYearControl>,
    );
    const targetElement = screen.queryByRole("button");
    fireEvent.click(targetElement);
    expect(onCloseButtonClick).toHaveBeenCalledTimes(1);
  });

  it("sets the inline style if the style prop is defined with valid properties", () => {
    const style = { "--test1": "1px", width: "10px" };
    render(
      <MonthYearControl style={style} onChange={onChange}></MonthYearControl>,
    );
    const targetElement = screen.queryByTestId("MonthYearControl");
    expect(targetElement).toHaveStyle(style);
  });
});

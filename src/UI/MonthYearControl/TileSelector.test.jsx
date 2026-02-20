import { beforeEach, describe, vi, it, expect } from "vitest";
import TileSelector from "./TileSelector";
import { useState } from "react";

const containsClass = (element, token) => {
  const list = Array.from(element.classList);
  const tester =
    typeof token === "string"
      ? (item) => item === token
      : token instanceof RegExp
        ? (item) => token.test(item)
        : () => false;

  return list.some(tester);
};

const currentClassRegex = /current/i;

const onChangeMock = vi.fn();

const IntersectionObserverMock = vi.fn((callback) => {
  let observedList = [];

  const trigger = (entryList) => {
    const mapper = ({ isIntersecting, index }) => {
      const target = observedList.find((item) => {
        return Number(item.getAttribute("data-index")) === index;
      });
      return { isIntersecting, target };
    };
    return callback(entryList.map(mapper));
  };
  return {
    disconnect: vi.fn(() => (observedList = [])),
    observe: vi.fn((item) => observedList.push(item)),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
    trigger,
  };
});

const scrollIntoViewMock = vi.fn(function () {
  const trigger = IntersectionObserverMock.mock.results[0].value.trigger;
  const targetElement = this;
  const isCurrentTile = containsClass(targetElement, currentClassRegex);
  const parentElement = targetElement.parentElement;
  const childrenList = Array.from(parentElement.children);
  const mapper = (item) => {
    return item === targetElement
      ? {
          isIntersecting: true,
          index: Number(item.getAttribute("data-index")),
        }
      : {
          isIntersecting: false,
          index: Number(item.getAttribute("data-index")),
        };
  };

  if (isCurrentTile) return;
  trigger(childrenList.map(mapper));
  fireEvent.scroll(parentElement);
  vi.runAllTimers();
});

const propList = [
  {},
  {
    itemArr: [{ value: "test0", label: "0" }],
  },
  {
    currentIndex: 0,
    onChange: onChangeMock,
  },
  {
    itemArr: [{ value: "test0", label: "0" }],
    currentIndex: 0,
    isDisable: false,
    onChange: onChangeMock,
  },
  {
    itemArr: [
      { value: "test0", label: "0" },
      { value: "test1", label: "1" },
      { value: "test2", label: "2" },
      { value: "test3", label: "3" },
      { value: "test4", label: "4" },
      { value: "test5", label: "5" },
      { value: "test6", label: "6" },
      { value: "test7", label: "7" },
    ],
    currentIndex: 0,
    isDisable: true,
    onChange: onChangeMock,
  },
  {
    itemArr: [
      { value: "test0", label: "0" },
      { value: "test1", label: "1" },
      { value: "test2", label: "2" },
      { value: "test3", label: "3" },
      { value: "test4", label: "4" },
      { value: "test5", label: "5" },
      { value: "test6", label: "6" },
      { value: "test7", label: "7" },
    ],
    currentIndex: 6,
    onChange: onChangeMock,
  },
  {
    itemArr: [
      { value: "test0", label: "label1" },
      { value: "test1", label: "label2" },
      { value: "test2", label: "label3" },
    ],
    label: "testLabel",
    currentIndex: -1,
    onChange: onChangeMock,
  },
  {
    itemArr: [
      { value: "test0", label: "0" },
      { value: "test1", label: "1" },
      { value: "test2", label: "2" },
    ],
    label: "testLabel",
    visibleTiles: 3,
    currentIndex: 30,
    onChange: onChangeMock,
  },
  {
    itemArr: [
      { value: "test0", label: "0" },
      { value: "test1", label: "1" },
      { value: "test2", label: "2" },
    ],
    label: "testLabel",
    visibleTiles: 5,
    classArr: ["test1", "test2"],
    onChange: onChangeMock,
  },
];

describe.each(propList)(
  "TileSelector component with props: {label: $label, classArr: $classArr, itemArr: $itemArr, currentIndex: $currentIndex, onChange: $onChange, isDisable: $isDisable, visibleTiles: $visibleTiles}",
  ({
    label,
    classArr,
    itemArr,
    currentIndex,
    onChange,
    isDisable,
    visibleTiles,
  }) => {
    const requiredProps = { itemArr, onChange };
    const hasRequiredProps = Object.values(requiredProps).every((item) => item);
    const boundedCurrentIndex = (() => {
      switch (true) {
        case currentIndex < 0:
        case currentIndex === undefined:
        case !Object(itemArr).length:
          return 0;
        case currentIndex >= itemArr.length:
          return itemArr.length - 1;
        default:
          return currentIndex;
      }
    })();
    const hasBoundedCurrentIndex = currentIndex === boundedCurrentIndex;

    const findElementByClass = (list, token) => {
      return list.find((item) => containsClass(item, token));
    };

    const getCurrentElement = () => {
      const elementList = screen.queryAllByRole("listitem");
      return findElementByClass(elementList, currentClassRegex);
    };

    beforeEach(() => {
      vi.useFakeTimers();
      vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
      [IntersectionObserverMock, scrollIntoViewMock, onChangeMock].forEach(
        (item) => item.mockReset(),
      );
      render(
        <TileSelector
          {...{
            label,
            classArr,
            itemArr,
            currentIndex,
            onChange,
            isDisable,
            visibleTiles,
          }}
        ></TileSelector>,
      );
      vi.runAllTimers();
    });

    it.runIf(hasRequiredProps)(
      "renders the parent element if itemArr & onChange props are passed",
      () => {
        const testId = "parent";
        const targetElement = screen.queryByTestId(testId);
        expect(targetElement).toBeInTheDocument();
      },
    );

    it.runIf(hasRequiredProps && label)("has the corresponding label", () => {
      const targetElement = screen.queryByRole("paragraph", {
        value: { name: label },
      });
      expect(targetElement).toBeInTheDocument();
    });

    it.runIf(hasRequiredProps && !label)(
      "doesn't render the labels tag if label prop is undefined",
      () => {
        const targetElement = screen.queryByRole("paragraph", {
          value: { name: label },
        });
        expect(targetElement).not.toBeInTheDocument();
      },
    );

    it.runIf(hasRequiredProps && classArr)(
      "has classArr applied as the last classes",
      () => {
        const testId = "parent";
        const targetElement = screen.queryByTestId(testId);
        const classList = Array.from(targetElement.classList);
        expect(classList.slice(-classArr.length)).toEqual(
          expect.arrayContaining(classArr),
        );
      },
    );

    it.runIf(hasRequiredProps && itemArr)("renders the items as tiles", () => {
      const setExpectations = ({ label }) => {
        const tile = screen.queryByText(label);
        expect(tile).toBeInTheDocument();
      };
      itemArr.forEach(setExpectations);
    });

    it.runIf(hasRequiredProps && hasBoundedCurrentIndex && !isDisable)(
      "selects the tile associated with the currentIndex as the current tile if currentIndex is defined",
      () => {
        const currentLabel = itemArr[currentIndex].label;
        const currentValue = itemArr[currentIndex].value;
        const targetElement = screen.queryByText(currentLabel);
        expect(targetElement).toBeInTheDocument();
        expect(targetElement).toHaveClass(currentClassRegex);
        expect(onChange).toHaveBeenCalledWith(currentValue);
        expect(onChange).toHaveBeenCalledTimes(1);
      },
    );

    it.runIf(hasRequiredProps && currentIndex && !hasBoundedCurrentIndex)(
      "remains currentIndex within 0 and itemArr.length -1 if currentIndex is defined outside the range and selects the closest tile end",
      () => {
        const currentLabel = itemArr[boundedCurrentIndex].label;
        const currentValue = itemArr[boundedCurrentIndex].value;
        const targetElement = screen.queryByText(currentLabel);
        expect(targetElement).toBeInTheDocument();
        expect(targetElement).toHaveClass(currentClassRegex);
        expect(onChange).toHaveBeenCalledWith(currentValue);
        expect(onChange).toHaveBeenCalledTimes(1);
      },
    );

    it.runIf(hasRequiredProps && currentIndex === undefined)(
      "starts with the first tile as the current if currentIndex is undefined",
      () => {
        const currentLabel = itemArr[0].label;
        const currentValue = itemArr[0].value;
        const targetElement = screen.queryByText(currentLabel);
        expect(targetElement).toBeInTheDocument();
        expect(targetElement).toHaveClass(currentClassRegex);
        expect(onChange).toHaveBeenCalledWith(currentValue);
        expect(onChange).toHaveBeenCalledTimes(1);
      },
    );

    it.runIf(hasRequiredProps && !isDisable)(
      "sets the clicked tile as current",
      () => {
        const setExpectations = ({ label, value }) => {
          const targetElement = screen.queryByText(label);
          fireEvent.click(targetElement);
          expect(targetElement).toBeInTheDocument();
          expect(targetElement).toHaveClass(currentClassRegex);
          expect(onChange).toHaveBeenLastCalledWith(value);
        };
        /* The list is defined this way so its possible to test a jump from the last tile to the first time by clicking if there ir some tiles in between */
        const list = itemArr.length > 2 ? [...itemArr, itemArr[0]] : itemArr;
        const expectedCalls =
          boundedCurrentIndex === 0 ? list.length : list.length + 1;
        list.forEach(setExpectations);
        expect(onChange).toHaveBeenCalledTimes(expectedCalls);
      },
    );

    it.runIf(hasRequiredProps && !isDisable)(
      "selects the current tile`s next sibling if exists on nextTile button click",
      () => {
        const list = itemArr.filter((item, index) => {
          return index >= boundedCurrentIndex;
        });
        const token = /nextTileButton/i;
        const button = findElementByClass(
          screen.queryAllByRole("button"),
          token,
        );
        const expectedCalls = list.length;

        const setExpectations = ({ value }, index, arr) => {
          const lastIndex = arr.length - 1;
          const currentElement = getCurrentElement();
          fireEvent.click(button);
          const nextCurrentElement =
            index === lastIndex
              ? currentElement
              : currentElement.nextElementSibling;
          const nextValue = index === lastIndex ? value : arr[index + 1].value;
          expect(getCurrentElement()).toBe(nextCurrentElement);
          expect(onChange).toHaveBeenLastCalledWith(nextValue);
        };

        list.forEach(setExpectations);
        expect(onChange).toHaveBeenCalledTimes(expectedCalls);
      },
    );

    it.runIf(hasRequiredProps && !isDisable)(
      "selects the current tile`s previous sibling if exists on previousTile button click",
      () => {
        const list = itemArr
          .filter((item, index) => {
            return index <= boundedCurrentIndex;
          })
          .reverse();
        const token = /previousTileButton/i;
        const button = findElementByClass(
          screen.queryAllByRole("button"),
          token,
        );
        const expectedCalls = list.length;

        const setExpectations = ({ value }, index, arr) => {
          const lastIndex = arr.length - 1;
          const currentElement = getCurrentElement();
          fireEvent.click(button);
          const nextCurrentElement =
            index === lastIndex
              ? currentElement
              : currentElement.previousSibling;
          const nextValue = index === lastIndex ? value : arr[index + 1].value;
          expect(getCurrentElement()).toBe(nextCurrentElement);
          expect(onChange).toHaveBeenLastCalledWith(nextValue);
        };

        list.forEach(setExpectations);
        expect(onChange).toHaveBeenCalledTimes(expectedCalls);
      },
    );

    it.runIf(hasRequiredProps && !isDisable)(
      "selects the tile that intersects the trigger area on scroll",
      () => {
        /* The list is defined this way so its possible to test a jump from the last tile to the first time by scrolling if there ir some tiles in between */
        const listItemArr = Array.from(screen.queryAllByRole("listitem"));
        const list =
          listItemArr.length > 2
            ? [...listItemArr, listItemArr[0]]
            : listItemArr;
        const setExpectation = (item) => {
          const value = itemArr[Number(item.getAttribute("data-index"))].value;
          item.scrollIntoView();
          expect(item).toBe(getCurrentElement());
          expect(onChange).toHaveBeenLastCalledWith(value);
        };
        const expectedCalls =
          boundedCurrentIndex === 0 ? list.length : list.length + 1;
        list.forEach(setExpectation);
        expect(onChange).toHaveBeenCalledTimes(expectedCalls);
      },
    );

    it.runIf(hasRequiredProps && isDisable)(
      "disables click events, scroll and doesn't run onChange if isDisable is truthy",
      () => {
        const currentElement = getCurrentElement();
        const tileElementList = screen.queryAllByRole("listitem");
        const clickTargetList = [
          ...screen.queryAllByRole("button"),
          ...tileElementList,
        ];

        scrollIntoViewMock.mockImplementation(function () {});

        const clickCallback = (item) => {
          fireEvent.click(item);
          vi.runAllTimers();
          expect(currentElement).toBe(getCurrentElement());
        };

        const scrollCallback = (item) => {
          item.scrollIntoView();
          expect(currentElement).toBe(getCurrentElement());
        };

        clickTargetList.forEach(clickCallback);
        tileElementList.forEach(scrollCallback);
        expect(onChange).not.toHaveBeenCalled();
      },
    );
  },
);

describe.each(propList)(
  "TileSelector component with props: {label: $label, classArr: $classArr, itemArr: $itemArr, currentIndex: $currentIndex, onChange: $onChange, isDisable: $isDisable, visibleTiles: $visibleTiles}",
  ({
    label,
    classArr,
    itemArr,
    currentIndex,
    onChange,
    isDisable,
    visibleTiles,
  }) => {
    const requiredProps = { itemArr, onChange };
    const hasRequiredProps = Object.values(requiredProps).every((item) => item);
    const boundedCurrentIndex = (() => {
      switch (true) {
        case currentIndex < 0:
        case currentIndex === undefined:
        case !Object(itemArr).length:
          return 0;
        case currentIndex >= itemArr.length:
          return itemArr.length - 1;
        default:
          return currentIndex;
      }
    })();

    beforeEach(() => {
      vi.useFakeTimers();
      vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
      [IntersectionObserverMock, scrollIntoViewMock, onChangeMock].forEach(
        (item) => item.mockClear(),
      );
    });

    it.runIf(!hasRequiredProps)(
      "throws an error if the required props are undefined",
      () => {
        const filter = ([, value]) => !value;
        const mapper = ([key]) => key;
        const setExpectations = (key) => {
          expect(() =>
            render(
              <TileSelector
                {...{
                  label,
                  classArr,
                  itemArr,
                  currentIndex,
                  onChange,
                  isDisable,
                  visibleTiles,
                }}
              ></TileSelector>,
            ),
          ).toThrowError(key);
        };
        const list = Object.entries(requiredProps).filter(filter).map(mapper);
        list.forEach(setExpectations);
      },
    );

    it.runIf(hasRequiredProps && !isDisable)(
      "runs onChange with the last current value if isDisable toggles from falsy to truthy",
      () => {
        const dataTestId = "tester";
        const TestButton = () => {
          const [testIsDisable, setTestIsDisable] = useState(isDisable);
          const onClick = () => setTestIsDisable(!testIsDisable);
          return (
            <button data-testid={dataTestId} onClick={onClick}>
              <TileSelector
                {...{
                  label,
                  classArr,
                  itemArr,
                  currentIndex,
                  onChange,
                  isDisable: testIsDisable,
                  visibleTiles,
                }}
              ></TileSelector>
            </button>
          );
        };

        render(<TestButton></TestButton>);
        vi.runAllTimers();

        const containerElement = screen.queryByTestId(dataTestId);
        fireEvent.click(containerElement);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(
          itemArr[boundedCurrentIndex].value,
        );
      },
    );
  },
);

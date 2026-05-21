import { describe, it, vi, expect, beforeEach } from "vitest";
import SUT from "./TileSelector";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import "../../global.css";
import "../../variables.css";
import tileCSS from "./Tile.module.css";
import { useState } from "react";

const scrollDelay = 350;

const enrichItem = (value, index) => ({ ...value, key: index, index });

const items = [
  { value: "0", label: "item 0" },
  { value: "1", label: "item 1" },
  { value: "2", label: "item 2" },
].map(enrichItem);

const onChangeMock = vi.fn(() => {});

const renderComponent = async ({ currentIndex, isDisable, isInView } = {}) => {
  await render(
    <SUT
      items={items}
      onChange={onChangeMock}
      currentIndex={currentIndex}
      isDisable={isDisable}
      label="Test"
      isInView={isInView}
    ></SUT>,
  );
};

const getTileContainer = () => page.getByRole("list");

const getNextButton = (options) => {
  return page.getByRole("button", options).last();
};

const getPreviousButton = (options) => {
  return page.getByRole("button", options).first();
};

const getTiles = () => {
  const regex = /[\w]+/;
  return page.getByRole("button").filter({ hasText: regex });
};

const expectCurrentTileAtIndex = async (index) => {
  const targetTile = page.getByText(items[index].label);
  const regularTiles = getTiles()
    .all()
    .filter((item) => item.element() !== targetTile.element());
  const expectToBeRegularTile = async (tile) => {
    await expect.element(tile).not.toHaveClass(tileCSS.current);
  };
  await Promise.all(regularTiles.map(expectToBeRegularTile));
  await expect.element(targetTile).toHaveClass(tileCSS.current);
  expect(onChangeMock).toHaveBeenLastCalledWith(items[index].value);
};

const expectCurrentTileAtIndexOnce = async (index) => {
  await new Promise((resolve) => setTimeout(() => resolve(), scrollDelay));
  await expectCurrentTileAtIndex(index);
  expect(onChangeMock).toHaveBeenCalledTimes(1);
};

const expectReportedValue = async (value, callsCount = 1) => {
  await vi.waitFor(
    () => {
      const calls = onChangeMock.mock.calls;
      if (calls.length >= callsCount) return;
      throw new Error(`calls.length = ${calls.length}`);
    },
    { timeout: scrollDelay * 3, interval: 300 },
  );
  expect(onChangeMock).toHaveBeenLastCalledWith(value);
};

describe("TileSelector", () => {
  beforeEach(() => vi.resetAllMocks());

  it("renders the items as tiles", async () => {
    await renderComponent();
    const setExpectation = ({ label }, index) => {
      const tile = page.getByText(label);
      const tiles = getTiles();
      expect(tile.element()).toBe(tiles.elements()[index]);
    };
    items.forEach(setExpectation);
  });

  describe("sets the current tile", () => {
    describe("selects the first tile", () => {
      it("if currentIndex is undefined", async () => {
        await renderComponent();
        await expectCurrentTileAtIndexOnce(0);
      });

      it("if currentIndex < 0", async () => {
        await renderComponent({ currentIndex: -1 });
        await expectCurrentTileAtIndexOnce(0);
      });
    });

    const invalidIndexes = [items.length, items.length + 1];

    it.each(invalidIndexes)(
      "selects the last tile if currentIndex >= items.length, %s",
      async (index) => {
        await renderComponent({ currentIndex: index });
        await expectCurrentTileAtIndexOnce(items.at(-1).index);
      },
    );

    it.each(items)(
      "selects the tile that represents items[currentIndex] if 0 >= currentIndex <= items.length, currentIndex = $index",
      async (item) => {
        await renderComponent({ currentIndex: item.index });
        await expectCurrentTileAtIndexOnce(item.index);
      },
    );
  });

  const clickableItems = items.slice(1);

  it.each(clickableItems)(
    "reports the clicked tile as current, label: $label",
    async ({ index, label }) => {
      await renderComponent();
      const targetTile = page.getByText(label);
      await targetTile.click();
      await expectReportedValue(items[index].value);
    },
  );

  describe("on nextTile button click", () => {
    const indexes = items.slice(0, -1).map(({ index }) => index);

    it.each(indexes)(
      "reports the next sibling of the current tile if the current tile is not the last tile, index: %i",
      async (index) => {
        await renderComponent({ currentIndex: index });
        await getNextButton().click();
        await expectReportedValue(items[index + 1].value);
      },
    );

    it("keeps the current tile if the the current tile is the last tile", async () => {
      const index = items.at(-1).index;
      await renderComponent({ currentIndex: index });
      await getNextButton().click();
      await expectCurrentTileAtIndexOnce(index);
    });
  });

  describe("on previousTile button click", () => {
    const indexes = items.slice(1).map(({ index }) => index);

    it.each(indexes)(
      "reports the previous sibling of the current tile if the current tile is not the first tile, index: %i",
      async (index) => {
        await renderComponent({ currentIndex: index });
        await getPreviousButton().click();
        await expectReportedValue(items[index - 1].value);
      },
    );

    it("keeps the current tile if the the current tile is the first tile", async () => {
      const index = items[0].index;
      await renderComponent({ currentIndex: index });
      await getPreviousButton().click();
      await expectCurrentTileAtIndexOnce(index);
    });
  });

  it.each(items.slice(1))(
    "reports the tile that intersects the trigger area on scroll, currentIndex = $index",
    async (item) => {
      await renderComponent();
      const tile = page.getByText(item.label);
      tile.element().scrollIntoView({ behavior: "instant", block: "center" });
      await expectReportedValue(item.value);
    },
  );

  describe("if isDisable = true", () => {
    beforeEach(async () => {
      await renderComponent({ isDisable: true });
    });

    it("doesn't run onChange on renders", () => {
      expect(onChangeMock).toHaveBeenCalledTimes(0);
    });

    it("disables tile clicks", async () => {
      const setExpectation = async ({ label }) => {
        const tile = page.getByText(label);
        await expect.element(tile).toBeDisabled();
      };

      await Promise.all(items.map(setExpectation));
    });

    it("disables scroll", async () => {
      const container = getTileContainer();
      const target = page.getByText(items.at(-1).label).element();
      const getTop = () => target.getBoundingClientRect().top;
      const initialTop = getTop();
      await container.wheel({ delta: { y: 25 } });
      expect(initialTop).toBe(getTop());
    });

    it("disables navigation buttons clicks", async () => {
      const clickButton = async (button) => await button.click({ force: true });
      const buttons = [
        getNextButton({ disabled: true }),
        getPreviousButton({ disabled: true }),
      ];
      await Promise.all(buttons.map(clickButton));
      expect(onChangeMock).toHaveBeenCalledTimes(0);
    });
  });

  it("if isInView = false it doesn't run onChange", async () => {
    await renderComponent({ isInView: false });
    expect(onChangeMock).toHaveBeenCalledTimes(0);
  });

  describe("reselects the current tile", () => {
    it("if isDisable toggles from true to false", async () => {
      const label = "Enable";
      const index = 2;
      const TestComponent = () => {
        const [isDisable, setIsDisable] = useState(true);
        return (
          <>
            <SUT
              isDisable={isDisable}
              items={items}
              onChange={onChangeMock}
              currentIndex={index}
            ></SUT>
            <button
              style={{ fontSize: "10px" }}
              onClick={() => setIsDisable(false)}
              type="button"
            >
              {label}
            </button>
          </>
        );
      };

      await render(<TestComponent></TestComponent>);
      const button = page.getByText(label);
      await button.click();
      await expectCurrentTileAtIndexOnce(index);
    });

    it("if isInView toggles from false to true", async () => {
      const label = "Enable";
      const index = 2;
      const TestComponent = () => {
        const [isInView, setIsInView] = useState(false);
        return (
          <>
            <SUT
              isInView={isInView}
              items={items}
              onChange={onChangeMock}
              currentIndex={index}
            ></SUT>
            <button
              style={{ fontSize: "10px" }}
              onClick={() => setIsInView(true)}
              type="button"
            >
              {label}
            </button>
          </>
        );
      };
      await render(<TestComponent></TestComponent>);
      const button = page.getByText(label);
      await button.click();
      await expectCurrentTileAtIndexOnce(index);
    });
  });
});

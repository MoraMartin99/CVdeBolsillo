import { describe, it, vi, expect, beforeEach } from "vitest";
import SUT from "./TileSelector";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import "../../global.css";
import "../../variables.css";
import tileCSS from "./Tile.module.css";
import { useState } from "react";

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
  await new Promise((resolve) => setTimeout(() => resolve(), 300));
  await expectCurrentTileAtIndex(index);
  expect(onChangeMock).toHaveBeenCalledTimes(1);
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

      it("if currentIndex < 0 selects", async () => {
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
    "selects the clicked tile as current, label: $label",
    async ({ label, value }) => {
      await renderComponent();
      const currentTile = page.getByText(items[0].label);
      const targetTile = page.getByText(label);
      const expectedCall = value;

      await expect.element(currentTile).toHaveClass(tileCSS.current);

      await targetTile.click();

      await expect.element(targetTile).toHaveClass(tileCSS.current);
      expect(onChangeMock).toHaveBeenLastCalledWith(expectedCall);
      expect(onChangeMock).toHaveBeenCalledTimes(2);
    },
  );

  describe("on nextTile button click", () => {
    const indexes = items.slice(0, -1);

    it.each(indexes)(
      "selects the next sibling of the current tile if the current tile is not the last tile, index: %i",
      async (index) => {
        await renderComponent({ currentIndex: index });
        await getNextButton().click();
        await expectCurrentTileAtIndex(index + 1);
      },
    );

    it("keeps the current tile if the the current tile is the last tile", async () => {
      const index = items.at(-1).index;
      await renderComponent({ currentIndex: index });
      await getNextButton().click();
      await expectCurrentTileAtIndex(index);
    });
  });

  describe("on previousTile button click", () => {
    const indexes = items.slice(1);

    it.each(indexes)(
      "selects the previous sibling of the current tile if the current tile is not the first tile, index: $index",
      async ({ index, label }) => {
        await renderComponent({ currentIndex: index });
        await getPreviousButton().click();
        await expectCurrentTileAtIndex(index - 1);
      },
    );

    it("keeps the current tile if the the current tile is the first tile", async () => {
      const index = items[0].index;
      await renderComponent({ currentIndex: index });
      await getPreviousButton().click();
      await expectCurrentTileAtIndex(index);
    });
  });

  it.each(items.slice(1))(
    "selects the tile that intersects the trigger area on scroll, currentIndex = $index",
    async (item) => {
      await renderComponent();
      const tile = page.getByText(item.label);
      const currentTile = page.getByText(items[0].label);
      await expect.element(currentTile).toHaveClass(tileCSS.current);
      tile.element().scrollIntoView({ behavior: "instant", block: "center" });
      await expectCurrentTileAtIndex(item.index);
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
      const container = page.getByRole("list");
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
      const item = items[1];
      const TestComponent = () => {
        const [isDisable, setIsDisable] = useState(true);
        return (
          <>
            <SUT
              isDisable={isDisable}
              items={items}
              onChange={onChangeMock}
              currentIndex={item.index}
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
      expect(onChangeMock).toHaveBeenCalledTimes(0);
      await button.click();
      await expectRendersItemAsCurrentTile(item);
    });

    it("if isInView toggles from false to true", async () => {
      const label = "Enable";
      const item = items[1];
      const TestComponent = () => {
        const [isInView, setIsInView] = useState(false);
        return (
          <>
            <SUT
              isInView={isInView}
              items={items}
              onChange={onChangeMock}
              currentIndex={item.index}
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
      expect(onChangeMock).toHaveBeenCalledTimes(0);
      await button.click();
      await expectCurrentTileAtIndexOnce(index);
    });
  });
});

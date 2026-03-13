import { describe, it, vi, expect, beforeEach } from "vitest";
import SUT from "./TileSelector";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import "../../global.css";
import "../../variables.css";
import css from "./TileSelector.module.css";
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

const expectItemAsCurrenTile = async ({ label, value: expectedCall }) => {
  const tile = page.getByText(label);
  await expect.element(tile).toHaveClass(css.current);
  expect(onChangeMock).toHaveBeenLastCalledWith(expectedCall);
};

const expectRendersItemAsCurrentTile = async (item) => {
  await expectItemAsCurrenTile(item);
  expect(onChangeMock).toHaveBeenCalledTimes(1);
};

const expectItemAsNextCurrenTileOnButtonClick = async ({
  currentTile,
  button,
  item,
}) => {
  await expect.element(currentTile).toHaveClass(css.current);
  await button.click();
  await expectItemAsCurrenTile(item);
};

describe("TileSelector", () => {
  beforeEach(() => vi.resetAllMocks());

  it("renders the items as tiles", async () => {
    await renderComponent();
    const setExpectation = ({ label }, index) => {
      const tile = page.getByText(label);
      const tiles = page.getByRole("listitem");
      expect(tile.element()).toBe(tiles.elements()[index]);
    };
    items.forEach(setExpectation);
  });

  describe("sets the current tile", () => {
    describe("selects the first tile", () => {
      it("if currentIndex is undefined", async () => {
        await renderComponent();
        await expectRendersItemAsCurrentTile(items[0]);
      });

      it("if currentIndex < 0 selects", async () => {
        await renderComponent({ currentIndex: -1 });
        await expectRendersItemAsCurrentTile(items[0]);
      });
    });

    const invalidIndexes = [items.length, items.length + 1];

    it.each(invalidIndexes)(
      "selects the last tile if currentIndex >= items.length, %s",
      async (index) => {
        await renderComponent({ currentIndex: index });
        await expectRendersItemAsCurrentTile(items.at(-1));
      },
    );

    it.each(items)(
      "selects the tile that represents items[currentIndex] if 0 >= currentIndex <= items.length, currentIndex = $index",
      async (item) => {
        await renderComponent({ currentIndex: item.index });
        await expectRendersItemAsCurrentTile(item);
      },
    );
  });

  const clickableItems = [...items.slice(1)];

  it.each(clickableItems)(
    "selects the clicked tile as current, label: $label",
    async ({ label, value }) => {
      await renderComponent();
      const currentTile = page.getByText(items[0].label);
      const targetTile = page.getByText(label);
      const expectedCall = value;

      await expect.element(currentTile).toHaveClass(css.current);

      await targetTile.click();

      await expect.element(targetTile).toHaveClass(css.current);
      expect(onChangeMock).toHaveBeenLastCalledWith(expectedCall);
      expect(onChangeMock).toHaveBeenCalledTimes(2);
    },
  );

  describe("on nextTile button click", () => {
    const indexes = items.slice(0, -1);

    it.each(indexes)(
      "selects the next sibling of the current tile if the current tile is not the last tile, index: $index",
      async ({ index, label }) => {
        await renderComponent({ currentIndex: index });
        await expectItemAsNextCurrenTileOnButtonClick({
          currentTile: page.getByText(label),
          button: getNextButton(),
          item: items[index + 1],
        });
      },
    );

    it("keeps the current tile if the the current tile is the last tile", async () => {
      const item = items.at(-1);
      await renderComponent({ currentIndex: item.index });
      await expectItemAsNextCurrenTileOnButtonClick({
        currentTile: page.getByText(item.label),
        button: getNextButton(),
        item,
      });
    });
  });

  describe("on previousTile button click", () => {
    const indexes = items.slice(1);

    it.each(indexes)(
      "selects the previous sibling of the current tile if the current tile is not the first tile, index: $index",
      async ({ index, label }) => {
        await renderComponent({ currentIndex: index });
        await expectItemAsNextCurrenTileOnButtonClick({
          currentTile: page.getByText(label),
          button: getPreviousButton(),
          item: items[index - 1],
        });
      },
    );

    it("keeps the current tile if the the current tile is the first tile", async () => {
      const item = items[0];
      await renderComponent({ currentIndex: item.index });
      await expectItemAsNextCurrenTileOnButtonClick({
        currentTile: page.getByText(item.label),
        button: getPreviousButton(),
        item,
      });
    });
  });

  it.each(items.slice(1))(
    "selects the tile that intersects the trigger area on scroll, currentIndex = $index",
    async (item) => {
      await renderComponent();
      const tile = page.getByText(item.label);
      const currentTile = page.getByText(items[0].label);
      await expect.element(currentTile).toHaveClass(css.current);
      tile.element().scrollIntoView({ behavior: "instant", block: "center" });
      await expectItemAsCurrenTile(item);
    },
  );

  describe("if isDisable = true", () => {
    beforeEach(async () => {
      await renderComponent({ isDisable: true });
    });

    it("doesn't run onChange on renders", () => {
      expect(onChangeMock).toHaveBeenCalledTimes(0);
    });

    it("disables the click events", async () => {
      const clickTile = async ({ label }) => {
        const tile = page.getByText(label);
        await tile.click();
      };

      await Promise.all(items.map(clickTile));
      expect(onChangeMock).toHaveBeenCalledTimes(0);
    });

    it("disables scroll", () => {});

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
      await expectRendersItemAsCurrentTile(item);
    });
  });
});

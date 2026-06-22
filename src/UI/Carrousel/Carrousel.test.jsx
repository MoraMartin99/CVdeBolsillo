import { beforeEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import SUT from "./Carrousel";

const carrouselId = "carrousel";

const screens = [
  {
    label: "tab1",
    component: <div>component1</div>,
  },
  {
    label: "tab2",
    component: <div>component2</div>,
  },
].map((item) => ({ ...item, id: crypto.randomUUID() }));

describe("Carrousel", () => {
  beforeEach(() => render(<SUT screens={screens}></SUT>));

  it("renders", async () => {
    const carrousel = page.getByTestId(carrouselId);
    await expect.element(carrousel).toBeInTheDocument();
  });

  it("displays the correct screen on tab's click events", async () => {
    const steps = [...screens.slice(1), ...screens.slice(0, -1).toReversed()];
    steps.forEach(async ({ label, component }) => {
      const tab = page.getByText(label);
      await tab.click();
      expect.element(component).toBeVisible();
    });
  });
});

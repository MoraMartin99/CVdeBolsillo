import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const carrouselId = "carrousel";
const trackId = "track";
const targetTabLabel = "targetLabel";

const TabMock = vi.fn(({ label, value, onClickCallback }) => {
  return <button onClick={() => onClickCallback(value)}>{label}</button>;
});

const TrackMock = vi.fn(({ currentIndex }) => {
  return <div data-testid={trackId}>{currentIndex}</div>;
});

const screens = [
  {
    label: "tab1",
    component: <div>component1</div>,
  },
  {
    label: targetTabLabel,
    component: <div>component2</div>,
  },
].map((item) => ({ ...item, id: self.crypto.randomUUID() }));

describe("Carrousel", async () => {
  beforeEach(async () => {
    vi.doMock("./Tab", () => ({ default: TabMock }));
    vi.doMock("./Track", () => ({ default: TrackMock }));
    const Carrousel = (await import("./Carrousel")).default;
    render(<Carrousel screens={screens}></Carrousel>);
  });

  afterEach(() => vi.resetAllMocks());

  it("renders", () => {
    const carrousel = screen.queryByTestId(carrouselId);
    const track = screen.queryByTestId(trackId);
    expect(carrousel).toBeInTheDocument();
    expect(track).toHaveTextContent("0");
  });

  it("displays the corresponding screen on its corresponding tab's click", () => {
    const targetTab = screen.queryByText(targetTabLabel);
    const track = screen.queryByTestId(trackId);
    expect(track).toHaveTextContent("0");
    fireEvent.click(targetTab);
    expect(track).toHaveTextContent("1");
  });
});

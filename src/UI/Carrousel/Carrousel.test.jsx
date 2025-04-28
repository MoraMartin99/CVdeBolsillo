import { beforeEach, describe, expect, it } from "vitest";
import Carrousel from "./Carrousel";
import { render, screen, fireEvent } from "@testing-library/react";

const propList = [
  {},
  {
    screenDataList: [
      {
        label: "test1",
        component: (
          <div
            style={{
              backgroundColor: "green",
              color: "black",
              fontSize: "15px",
              width: "136px",
              height: "65px",
            }}
          >
            test1
          </div>
        ),
      },
      {
        label: "test2",
        component: (
          <div
            style={{
              backgroundColor: "pink",
              color: "purple",
              fontSize: "10px",
              width: "220px",
              height: "100px",
            }}
          >
            test2
          </div>
        ),
      },
    ].map((item) => ({ ...item, id: self.crypto.randomUUID() })),
  },
];

describe.each(propList)(
  "Carrousel with props: {screenDataList: $screenDataList}",
  ({ screenDataList }) => {
    beforeEach(() => {
      render(<Carrousel screenDataList={screenDataList}></Carrousel>);
    });

    it("renders the parent element", () => {
      const targetClass = "carrousel";
      const targetElement = document.querySelector(`.${targetClass}`);
      expect(targetElement).toBeInTheDocument();
    });

    it.runIf(screenDataList)(
      "displays the next screen on clicking the corresponding tab",
      () => {
        const button = screen.getByRole("button", {
          name: screenDataList[1].label,
        });
        const trackElement = document.querySelector(".track");
        const initialStyle = "transform: translateX(-0%);";
        const finalStyle = "transform: translateX(-100%);";
        expect(trackElement).toHaveStyle(initialStyle);
        fireEvent.click(button);
        expect(trackElement).toHaveStyle(finalStyle);
      },
    );
  },
);

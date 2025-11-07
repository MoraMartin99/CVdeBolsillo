import { fireEvent, render, screen } from "@testing-library/react";
import useAccordion from "./useAccordion";
import { describe, expect, it } from "vitest";

const parentId = "parent";
const headerId = "header";
const TestElement = ({ initialValue }) => {
  const [isExpanded, setIsExpanded, parentStyle, contentStyle] =
    useAccordion(initialValue);
  const onClick = () => setIsExpanded(!isExpanded);
  return (
    <div style={parentStyle} data-testid={parentId}>
      <header
        style={{
          width: "130px",
          height: "30px",
          backgroundColor: "LightSalmon",
        }}
        onClick={onClick}
        data-testid={headerId}
      ></header>
      <main
        style={{
          width: "130px",
          backgroundColor: "YellowGreen",
          ...contentStyle,
        }}
        data-testid="container"
      >
        <h1 style={{ fontSize: "12px" }}>Esto es un test</h1>
        <div
          style={{ width: "60px", height: "60px", backgroundColor: "cyan" }}
        ></div>
      </main>
    </div>
  );
};

const collapseValues = [undefined, false];
const hiddenStyle = { gridTemplateRows: "min-content 0fr" };
const visibleStyle = { gridTemplateRows: "min-content 1fr" };

describe("useAccordion", () => {
  it.each(collapseValues)(
    "collapse the target container if initialValue is %s",
    (initialValue) => {
      render(<TestElement {...{ initialValue }}></TestElement>);
      const targetElement = screen.queryByTestId(parentId);
      expect(targetElement).toHaveStyle(hiddenStyle);
    },
  );

  it("expand the target container if initialValue is truthy", () => {
    render(<TestElement {...{ initialValue: true }}></TestElement>);
    const targetElement = screen.queryByTestId(parentId);
    expect(targetElement).toHaveStyle(visibleStyle);
  });

  it("sets the visibility of target container using setIsExpanded", () => {
    render(<TestElement {...{ initialValue: true }}></TestElement>);
    const header = screen.queryByTestId(headerId);
    fireEvent.click(header);
    const targetElement = screen.queryByTestId(parentId);
    expect(targetElement).toHaveStyle(hiddenStyle);
  });
});

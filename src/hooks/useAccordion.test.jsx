import { render, screen } from "@testing-library/react";
import useAccordion from "./useAccordion";
import { describe, expect, it } from "vitest";

const TestElement = ({ initialValue }) => {
  const [isExpanded, setIsExpanded, parentStyle, contentStyle] =
    useAccordion(initialValue);
  const onClick = () => setIsExpanded(!isExpanded);
  return (
    <div style={parentStyle} data-testid="parent">
      <header
        style={{
          width: "130px",
          height: "30px",
          backgroundColor: "LightSalmon",
        }}
        onClick={onClick}
      ></header>
      <main
        style={{
          width: "130px",
          backgroundColor: "YellowGreen",
          ...contentStyle,
        }}
      >
        <h1 style={{ fontSize: "12px" }}>Esto es un test</h1>
        <div
          style={{ width: "60px", height: "60px", backgroundColor: "cyan" }}
        ></div>
      </main>
    </div>
  );
};

describe("useAccordion hook test suite", () => {
  const hiddenStyle = { gridTemplateRows: "auto 0fr" };
  const visibleStyle = { gridTemplateRows: "auto 1fr" };

  it("sets the target component as collapsed if initialValue is undefined", () => {
    render(<TestElement></TestElement>);
    const targetElement = screen.queryByTestId("parent");
    expect(targetElement).toHaveStyle(hiddenStyle);
  });

  it("sets the target component as collapsed if initialValue is falsy", () => {
    render(<TestElement initialValue={false}></TestElement>);
    const targetElement = screen.queryByTestId("parent");
    expect(targetElement).toHaveStyle(hiddenStyle);
  });

  it("sets the target component as expanded if initialValue is truthy", () => {
    render(<TestElement initialValue={true}></TestElement>);
    const targetElement = screen.queryByTestId("parent");
    expect(targetElement).toHaveStyle(visibleStyle);
  });
});

import { describe, vi, it, expect } from "vitest";
import Header from "./Header";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

const onClickMock = vi.fn(() => {});
const mainIconId = "mainIcon";
const buttonId = "testButton";
const MainIconMock = vi.fn(() => {
  return <svg data-testid={mainIconId}></svg>;
});
const TestContainer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const onClick = () => setIsExpanded(!isExpanded);
  return (
    <>
      <button data-testid={buttonId} onClick={onClick}></button>
      <Header isExpanded={isExpanded}></Header>
    </>
  );
};

describe("Header component", () => {
  it("renders the parent element", () => {
    render(<Header></Header>);
    const targetElement = screen.queryByTestId("header");
    expect(targetElement).toBeInTheDocument();
  });

  it("displays the corresponding children", () => {
    const children = "soy un test";
    render(<Header>{children}</Header>);
    const targetElement = screen.queryByText(children);
    expect(targetElement).toBeInTheDocument();
  });

  it("display the corresponding Icon", () => {
    render(<Header Icon={MainIconMock}></Header>);
    const targetElement = screen.queryByTestId(mainIconId);
    expect(targetElement).toBeInTheDocument();
  });

  it("sets the inline style if the style prop is defined", () => {
    const style = { "--test1": "1px", width: "10px" };
    render(<Header style={style}></Header>);
    const targetElement = screen.queryByTestId("header");
    expect(targetElement).toHaveStyle(style);
  });

  it("has classArr applied as the last classes", () => {
    const classArr = ["test1", "test2"];
    render(<Header classArr={classArr}></Header>);
    const targetElement = screen.queryByTestId("header");
    const classList = Array.from(targetElement.classList);
    expect(classList.slice(-classArr.length)).toEqual(
      expect.arrayContaining(classArr),
    );
  });

  it("rotates the visibility icon if isExpanded is truthy", () => {
    render(<TestContainer></TestContainer>);
    const button = screen.queryByTestId(buttonId);
    const targetElement = screen.queryByTestId("visibilityIcon");
    const expectedClass = /expanded/i;
    expect(targetElement).not.toHaveClass(expectedClass);
    fireEvent.click(button);
    expect(targetElement).toHaveClass(expectedClass);
  });

  it("runs onClick on click events", () => {
    render(<Header onClick={onClickMock}></Header>);
    const targetElement = screen.queryByTestId("header");
    fireEvent.click(targetElement);
    expect(onClickMock).toHaveBeenCalledOnce();
  });
});

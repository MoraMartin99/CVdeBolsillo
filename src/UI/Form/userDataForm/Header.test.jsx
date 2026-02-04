import { describe, vi, it, expect } from "vitest";
import Header from "./Header";
import { useState } from "react";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const onClickMock = vi.fn(() => {});
const mainIconId = "mainIcon";
const buttonId = "testButton";
const headerId = "header";
const visibilityIconId = "visibilityIcon";
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
  it("renders the parent element", async () => {
    render(<Header></Header>);
    const target = page.getByTestId(headerId);
    await expect.element(target).toBeInTheDocument();
  });

  it("displays the corresponding children", async () => {
    const children = "soy un test";
    render(<Header>{children}</Header>);
    const target = page.getByText(children);
    await expect.element(target).toBeInTheDocument();
  });

  it("display the corresponding Icon", async () => {
    render(<Header Icon={MainIconMock}></Header>);
    const target = page.getByTestId(mainIconId);
    await expect.element(target).toBeInTheDocument();
  });

  it("sets the inline style if the style prop is defined", async () => {
    const style = { "--test1": "1px", width: "10px" };
    render(<Header style={style}></Header>);
    const target = page.getByTestId(headerId);
    await expect.element(target).toHaveStyle(style);
  });

  it("has classArr applied as the last classes", async () => {
    const classArr = ["test1", "test2"];
    await render(<Header classArr={classArr}></Header>);
    const targetElement = page.getByTestId(headerId).element();
    const classList = [...targetElement.classList];
    expect(classList.slice(-classArr.length)).toEqual(
      expect.arrayContaining(classArr),
    );
  });

  it("rotates the visibility icon if isExpanded is truthy", async () => {
    render(<TestContainer></TestContainer>);
    const button = page.getByTestId(buttonId);
    const target = page.getByTestId(visibilityIconId);
    const expectedClass = /expanded/i;
    await expect.element(target).not.toHaveClass(expectedClass);
    await button.click();
    await expect.element(target).toHaveClass(expectedClass);
  });

  it("runs onClick on click events", async () => {
    render(<Header onClick={onClickMock}></Header>);
    const target = page.getByTestId(headerId);
    await target.click();
    expect(onClickMock).toHaveBeenCalledOnce();
  });
});

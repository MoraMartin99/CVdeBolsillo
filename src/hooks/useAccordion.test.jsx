import useAccordion from "./useAccordion";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const parentId = "parent";
const headerId = "header";
const containerId = "container";

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
        data-testid={containerId}
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

describe("useAccordion", () => {
  it.each(collapseValues)(
    "collapse the target container if initialValue is %s",
    async (initialValue) => {
      render(<TestElement {...{ initialValue }}></TestElement>);
      const target = page.getByTestId(containerId);
      await expect.element(target).not.toBeVisible();
    },
  );

  it("expand the target container if initialValue is truthy", async () => {
    render(<TestElement {...{ initialValue: true }}></TestElement>);
    const target = page.getByTestId(containerId);
    await expect.element(target).toBeVisible();
  });

  it("sets the visibility of target container using setIsExpanded", async () => {
    render(<TestElement {...{ initialValue: true }}></TestElement>);
    const header = page.getByTestId(headerId);
    await header.click(header);
    const target = page.getByTestId(containerId);
    await expect.element(target).toBeVisible();
  });
});

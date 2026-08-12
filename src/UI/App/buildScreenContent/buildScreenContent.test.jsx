import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import buildScreenContent from "./buildScreenContent";
import UserFormsManager from "../../Form/userDataForm/FormsManager";
import TemplateForm from "../../Form/templateForm/TemplateForm";

const factoryNodeId = "factoryNode";
const componentNodeId = "componentNode";

const renderNodes = async (factoryNode, componentNode) => {
  await render(
    <div>
      <div data-testid={factoryNodeId}>{factoryNode}</div>
      <div data-testid={componentNodeId}>{componentNode}</div>
    </div>,
  );
};

const cases = [
  {
    id: "userForm",
    content: [],
    templates: {},
    onChange: () => {},
    Component: UserFormsManager,
    componentName: "UserFormsManager",
  },
  {
    id: "templateForm",
    templates: [{ id: "cv1", label: "Estilo 1" }],
    onChange: () => {},
    cvTemplateId: "cv1",
    Component: TemplateForm,
    componentName: "TemplateForm",
  },
  { id: "templateForm", cvTemplates, onChange, userData },
];

describe("buildScreenContent", () => {
  it.each(cases)("builds $componentName component", async (settings) => {
    await renderNodes(
      buildScreenContent(settings),
      <settings.Component {...settings}></settings.Component>,
    );
    const factoryNode = await page
      .getByTestId(factoryNodeId)
      .element()
      .children.item(0);
    const node = await page
      .getByTestId(componentNodeId)
      .element()
      .children.item(0);
    expect(factoryNode.isEqualNode(node)).toBeTruthy();
  });
});

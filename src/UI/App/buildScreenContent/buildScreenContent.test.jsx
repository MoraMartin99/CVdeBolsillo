import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

const userData = { message: "userData" };

const userFormId = "UserFormsManager";
const templateId = "TemplateForm";
const previewId = "Preview";
const UserFormsManagerMock = vi.fn(() => <div data-testid={userFormId}></div>);
const TemplateFormMock = vi.fn(() => <div data-testid={templateId}></div>);
const PreviewMock = vi.fn(() => <div data-testid={previewId}></div>);
const onChangeMock = vi.fn(() => {});
const TestMock = vi.fn(() => {});

const cases = [
  {
    label: "UserFormsManager",
    id: "userForm",
    componentId: userFormId,
  },
  {
    label: "TemplateForm",
    id: "templateForm",
    componentId: templateId,
  },
  {
    label: "Preview",
    id: "preview",
    componentId: previewId,
  },
];

describe("buildScreens", () => {
  beforeEach(async () => {
    const mocks = [
      ["../Form/userDataForm/FormsManager", UserFormsManagerMock],
      ["../Form/templateForm/TemplateForm", TemplateFormMock],
      ["../Preview/Preview", PreviewMock],
    ];
    const setMocks = ([path, mock]) => {
      vi.doMock(import(path), () => ({ default: mock }));
    };
    mocks.forEach(setMocks);
    const buildScreens = (await import("./buildScreens")).default;
    TestMock.mockImplementation((props) => {
      const mapper = ({ id, component, label }) => {
        return (
          <div key={id} data-testid={id}>
            {label}
            {component}
          </div>
        );
      };
      return <div data-testid="Test">{buildScreens(props).map(mapper)}</div>;
    });
  });

  afterEach(() => vi.resetAllMocks());

  it.each(cases)("builds the $label component", async (currentCase) => {
    await render(
      <TestMock
        {...{ screensData: [currentCase], userData, onChange: onChangeMock }}
      ></TestMock>,
    );
    const target = page.getByTestId(currentCase.id);
    const component = page.getByTestId(currentCase.componentId);
    await expect.element(target).toContainHTML(currentCase.label);
    await expect.element(target).toContainElement(component);
  });
});

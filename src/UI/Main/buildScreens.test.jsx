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
const screensData = {
  screen1: {
    label: "UserFormsManager",
    data: {
      component: userFormId,
    },
    id: "screen1",
  },
  screen2: {
    label: "TemplateForm",
    data: {
      component: templateId,
    },
    id: "screen2",
  },
  screen3: {
    label: "Preview",
    data: { component: previewId },
    id: "screen3",
  },
};

const testSubjects = Object.values(screensData);

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

  it.each(testSubjects)("builds the $label component", async (screenData) => {
    const {
      id,
      label,
      data: { component: componentId },
    } = screenData;
    await render(
      <TestMock
        {...{ screensData: [screenData], userData, onChange: onChangeMock }}
      ></TestMock>,
    );
    const target = page.getByTestId(id);
    const component = page.getByTestId(componentId);
    await expect.element(target).toContainHTML(label);
    await expect.element(target).toContainElement(component);
  });
});

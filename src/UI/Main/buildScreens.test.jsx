import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const userData = { message: "userData" };

const screen1 = {
  label: "UserFormsManager",
  data: {
    component: "UserFormsManager",
    data: ["data de UserFormsManager"],
    exampleContent: ["exampleContent de UserFormsManager"],
  },
};

const screen2 = {
  label: "TemplateForm",
  data: {
    component: "TemplateForm",
    templates: ["template de TemplateForm"],
    id: "TemplateForm",
    currentTemplateId: 100,
  },
};

const screen3 = {
  label: "Preview",
  data: { component: "Preview", currentTemplateId: 10 },
};

const CarrouselMock = vi.fn(({ screens }) => {
  const mapper = ({ component }) => component;
  return <div data-testid="Carrousel">{screens.map(mapper)}</div>;
});
const UserFormsManagerMock = vi.fn(() => <div data-testid="userForm"></div>);
const TemplateFormMock = vi.fn(() => <div data-testid="template"></div>);
const PreviewMock = vi.fn(() => <div data-testid="preview"></div>);
const onChangeMock = vi.fn(() => {});
const TestMock = vi.fn((props) => {
  return <div data-testid="Test">{buildViews(props)}</div>;
});
let buildViews;

describe("buildScreens", () => {
  beforeEach(async () => {
    const mocks = [
      ["../Carrousel/Carrousel", CarrouselMock],
      ["../Form/userDataForm/FormsManager", UserFormsManagerMock],
      ["../Form/templateForm/TemplateForm", TemplateFormMock],
      ["../Preview/Preview", PreviewMock],
    ];
    const setMocks = ([path, mock]) => {
      vi.doMock(path, () => ({ default: mock }));
    };
    mocks.forEach(setMocks);
    buildViews = (await import("./buildScreens")).default;
  });

  afterEach(() => vi.resetAllMocks());

  it("builds the components", () => {
    const subjects = [
      [screen1, UserFormsManagerMock],
      [screen2, TemplateFormMock],
      [screen3, PreviewMock],
    ];
    const settings = {
      content: subjects.map(([screen]) => screen),
      onChange: onChangeMock,
      data: userData,
    };
    render(<TestMock {...settings}></TestMock>);
    const setExpectations = ([{ data, label }, mock]) => {
      const extra = {
        UserFormsManager: { onChange: onChangeMock },
        TemplateForm: { onChange: onChangeMock },
        Preview: { data: userData },
      };
      const filter = ([key]) => key !== "component";
      const filterData = Object.fromEntries(
        Object.entries(data).filter(filter),
      );
      const expectedValue = { ...filterData, ...extra[label] };
      const value = mock.mock.lastCall[0];
      expect(value).toEqual(expectedValue);
    };
    subjects.forEach(setExpectations);
  });

  it("returns the components inside 1 container if hasIndependentLastPanel is falsy", () => {
    const settings = {
      content: [screen1, screen2],
      onChange: onChangeMock,
      data: userData,
      hasIndependentLastPanel: false,
    };
    render(<TestMock {...settings}></TestMock>);
    expect(CarrouselMock).toHaveBeenCalledOnce();
  });

  it("returns the component inside 1 container if theres only 1 component and hasIndependentLastPanel is truthy", () => {
    const settings = {
      content: [screen1],
      onChange: onChangeMock,
      data: userData,
      hasIndependentLastPanel: true,
    };
    render(<TestMock {...settings}></TestMock>);
    expect(CarrouselMock).toHaveBeenCalledOnce();
  });

  it("returns the components inside 2 containers if hasIndependentLastPanel is truthy", () => {
    const settings = {
      content: [screen1, screen2, screen3],
      onChange: onChangeMock,
      data: userData,
      hasIndependentLastPanel: true,
    };
    render(<TestMock {...settings}></TestMock>);
    expect(CarrouselMock).toHaveBeenCalledTimes(2);
  });
});

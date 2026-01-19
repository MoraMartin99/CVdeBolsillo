import { describe, expect, it } from "vitest";
import SUT from "./ClassicInput";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

const TestComponent = () => {
  const [, setCount] = useState(0);
  return (
    <SUT
      onChange={() => setCount(1)}
      isInvalid={true}
      tip={"Es invalido"}
    ></SUT>
  );
};

describe("ClassicInput", () => {
  it("sets the validity only if the component had been focus out at least 1 time", () => {
    render(<TestComponent></TestComponent>);
    const target = screen.queryByRole("textbox");
    const initialValidity = target.checkValidity();
    fireEvent.blur(target);
    const finalValidity = target.checkValidity();

    expect(initialValidity).toBeTruthy();
    expect(finalValidity).toBeFalsy();
  });
});

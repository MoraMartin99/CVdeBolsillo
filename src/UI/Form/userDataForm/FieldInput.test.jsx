import { describe, expect, it } from "vitest";
import FieldInput from "./FieldInput";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

const TestComponent = () => {
  const [, setCount] = useState(0);
  return (
    <FieldInput
      onChange={() => setCount(1)}
      isInvalid={true}
      tip={"Es invalido"}
    ></FieldInput>
  );
};

describe("FieldInput", () => {
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

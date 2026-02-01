import { beforeEach, describe, expect, vi, it } from "vitest";
import useOnUpdate from "./useOnUpdate";
import { useState } from "react";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

describe("useOnUpdate hook test suite", () => {
  const effectMock = vi.fn(() => {});

  function TestButton() {
    const [count, setCount] = useState(0);
    const [has10, setHas10] = useState(false);

    useOnUpdate(effectMock, [count, has10]);

    const onClick = () => {
      setCount(count + 1);
      if (count === 10 && !has10) setHas10(true);
    };

    return (
      <button
        onClick={onClick}
      >{`mount es ${count}, has10 es ${has10}, boolean es ${count === 10 && !has10}`}</button>
    );
  }

  beforeEach(() => {
    effectMock.mockReset();
    render(<TestButton></TestButton>);
  });

  it("doesn't run on initial render", () => {
    expect(effectMock).not.toHaveBeenCalled();
  });

  it("runs the effect for every change in the dependency list after re-renders", async () => {
    const target = page.getByRole("button");
    for (let i = 1; i <= 11; i++) await target.click();
    expect(effectMock).toHaveBeenCalledTimes(11);
  });
});

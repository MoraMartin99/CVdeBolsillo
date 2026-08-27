import { describe, expect, it } from "vitest";
import extractUserData from "./extractUserData";
import testCase from "./testCase";

describe("extractUserData", () => {
  it("returns the expected UserData", () => {
    expect(extractUserData(testCase.model)).toEqual(testCase.expectedResult);
  });
});

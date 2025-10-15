import { describe, expect, it } from "vitest";
import extractValuesFromModel from "./extractValuesFromModel";

const setExpectation = (model, expectedValues) => {
  const values = extractValuesFromModel(model);
  expect(values).toEqual(expectedValues);
};

describe("extractValuesFromModel", () => {
  describe("returns the expected value", () => {
    it("works with an empty model", () => {
      const model = [];
      const expectedValues = {};
      setExpectation(model, expectedValues);
    });

    it("works with multi dimensional models", () => {
      const model = [
        { id: "a", value: [{ id: "a1", value: "soy un valor" }] },
        { id: "b", value: true },
      ];
      const expectedValues = { a: { a1: "soy un valor" }, b: true };
      setExpectation(model, expectedValues);
    });

    it("returns non modelItems objects as they are", () => {
      const model = [
        { id: "a", value: [{ id: "a1", value: [1, 2, 3] }] },
        { id: "b", value: [{}, { myKey: 100, isRed: false }, true, null] },
      ];
      const expectedValues = {
        a: { a1: [1, 2, 3] },
        b: [{}, { myKey: 100, isRed: false }, true, null],
      };
      setExpectation(model, expectedValues);
    });
  });
});

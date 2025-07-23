import { describe, expect, it } from "vitest";
import extractValuesFromModelList from "./extractValuesFromModelList";

describe("extractValuesFromModelList", () => {
  it("returns the expected value", () => {
    const list = [
      [[], {}],
      [[{ id: 1, value: "value1" }], { 1: "value1" }],
      [
        [
          { id: 1, value: "value1" },
          { id: 2, value: "value2" },
          { id: 3 },
          { value: "value4" },
          { other1: "other1" },
          { id: 5, contentDataList: [{ id: "a", value: "valueA" }] },
          {
            id: 6,
            value: "value6",
            contentDataList: [{ id: "b", value: "valueB" }],
          },
        ],
        { 1: "value1", 2: "value2", 5: { a: "valueA" }, 6: "value6" },
      ],
    ];
    const setExpectations = ([initialValue, expectedValue]) => {
      expect(extractValuesFromModelList(initialValue)).toEqual(expectedValue);
    };
    list.forEach(setExpectations);
  });
});

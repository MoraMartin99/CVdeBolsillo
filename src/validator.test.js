import { describe, expect, it } from "vitest";
import { containsText } from "./validators";

describe("validator", () => {
  describe("containsText", () => {
    const nonStringsValues = [undefined, 3, null, false];
    const hasNotLetterValues = ["", "1", "./*", "  1  *"];
    const hasLetterValues = ["a", "a1", " a 1  a"];

    it.each(nonStringsValues)(
      "returns false if value is not a string, value = %s",
      (value) => expect(containsText(value)).toBeFalsy(),
    );

    it.each(hasNotLetterValues)(
      "returns false if value is a string but doesn't contain a letter, value = '%s'",
      (value) => expect(containsText(value)).toBeFalsy(),
    );

    it.each(hasLetterValues)(
      "returns true if value contains a letter, value = '%s'",
      (value) => expect(containsText(value)).toBeTruthy(),
    );
  });
});

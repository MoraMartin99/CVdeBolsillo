import { describe, expect, it } from "vitest";
import { containsText, isImagePath, hasSource } from "./validators";

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

  describe("isImagePath", () => {
    const nonStringsValues = [undefined, 3, null, false];
    const hasExtensionButNotAtTheEndValues = [
      "/closeIcon.png.md",
      "/Documents/svgBook1.xlsx",
      "./frente.jpeg.pdf",
      "/homewebp/marco.txt",
      "/home/archivo.jpg.zip",
      "./variables.pjpeg.json",
      "./music/mySong.pjp.mp3",
    ];
    const hasExtensionAtTheEndValues = [
      "/Downloads/decoracion.png",
      "/Downloads/arrow.svg",
      "/images/55228.jpeg",
      "./8518.webp",
      "/home/Documents/atras.jpg",
      "/marco.pjpeg",
      "/Backups/rosas.pjp",
    ];

    it.each(nonStringsValues)(
      "returns false if value is not a string, value = %s",
      (value) => expect(isImagePath(value)).toBeFalsy(),
    );

    it.each(hasExtensionButNotAtTheEndValues)(
      "returns false if the string contains the valid file extension but not at the end, value = '%s'",
      (value) => expect(isImagePath(value)).toBeFalsy(),
    );

    it.each(hasExtensionAtTheEndValues)(
      "return true if the string contains a valid file extension at the end, value = '%s'",
      (value) => expect(isImagePath(value)).toBeTruthy(),
    );
  });

  describe("hasSource", () => {
    const nonObjectValues = [1, "hola", null, false, () => {}, undefined];

    it.each(nonObjectValues)(
      `returns false if value is not an object, value = %s`,
      (value) => expect(hasSource(value)).toBeFalsy(),
    );

    describe("if value is an object", () => {
      const valuesWithoutSource = [{}, { someProp: true }];

      it.each(valuesWithoutSource)(
        "returns false if value.source is undefined, value = %s",
        (value) => expect(hasSource(value)).toBeFalsy(),
      );

      it("returns false if value.source is a string with a length = 0", () => {
        const value = { source: "" };
        expect(hasSource(value)).toBeFalsy();
      });

      it("returns true if value.source is a string with a length > 0", () => {
        const value = { source: "soy una cadena valida!" };
        expect(hasSource(value)).toBeTruthy();
      });
    });
  });
});

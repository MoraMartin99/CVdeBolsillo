import { describe, expect, it } from "vitest";
import {
  matchRegex,
  containsText,
  isImagePath,
  hasSource,
  isValidMail,
  isValidTelNumber,
} from "./validators";

const nonStringsValues = [undefined, 3, null, false, {}, () => {}];
const nonObjectValues = [1, "hola", null, false, () => {}, undefined];

describe("validator", () => {
  describe("matchRegex", () => {
    const cases = [
      ["hola", /hola/, true],
      ["adios", /123/, false],
      ["Camarón que se duerme", /camar.n que se \w+/i, true],
    ];

    it.each(nonStringsValues)(
      "returns false if value is not a string, value = %s",
      (value) => expect(matchRegex(value, /\w+/)).toBeFalsy(),
    );

    it.each(cases)(
      "returns the expected regex testing result, value = '%s', regex = %s, expectedResult = %s",
      (value, regex, expectedResult) => {
        expect(matchRegex(value, regex)).toBe(expectedResult);
      },
    );
  });

  describe("containsText", () => {
    const hasNotLetterValues = ["", "1", "./*", "  1  *"];
    const hasLetterValues = ["a", "a1", " a 1  a"];

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

  describe("isValidMail", () => {
    const multipleAtSignsCases = [
      "example@@domain.com",
      "@1@dom.es",
      "a.@b.@c@dominio.us",
    ];
    const validCases = ["example@domain.com", "1@dom.es", "a.b.c@dominio.us"];
    const invalidTopDomainCases = [
      "example@domain.a",
      "1@dom.1",
      "a.b.c@dominio..",
    ];

    it.each(validCases)(
      "return true if value is a valid mail, value = '%s'",
      (value) => {
        expect(isValidMail(value)).toBeTruthy();
      },
    );

    it.each(multipleAtSignsCases)(
      "returns false if it contains more than 1 at (@) signs, value = '%s'",
      (value) => {
        expect(isValidMail(value)).toBeFalsy();
      },
    );

    describe("local part", () => {
      it("returns false if length === 0", () => {
        const value = "@dominio.com";
        expect(isValidMail(value)).toBeFalsy();
      });
    });

    describe("domain part", () => {
      it("returns false if length === 0", () => {
        const value = "example@";
        expect(isValidMail(value)).toBeFalsy();
      });

      it.each(invalidTopDomainCases)(
        "returns false if it doesn't end in a valid top level domain, value = '%s'",
        (value) => {
          expect(isValidMail(value)).toBeFalsy();
        },
      );
    });
  });

  describe("isValidTelNumber", () => {
    it("returns false if contains letters", () => {
      const value = "12345678a";
      expect(isValidTelNumber(value)).toBeFalsy();
    });

    const paddingCases = [
      [" 123", "start"],
      ["123 ", "end"],
    ];

    it.each(paddingCases)(
      "returns false if contains extra spaces at case = $1",
      ({ value }) => expect(isValidTelNumber(value)).toBeFalsy(),
    );

    describe("country code", () => {
      const validCases = [
        "+505 123",
        "+(1) 123",
        "+ 42 123",
        "+ (112) 125",
        "123",
        "999 123",
      ];
      const invalidCases = [
        ["+12345 123", "code length > 4"],
        ["+ (62 123", "only contains initial parenthesis"],
        ["+52) 123", "only contains final parenthesis"],
        ["+)52( 123", "misplace parenthesis"],
      ];

      it.each(validCases)("returns true on valid cases, value = $0", (value) =>
        expect(isValidTelNumber(value)).toBeTruthy(),
      );

      it.each(invalidCases)(
        "returns false on invalid cases, value = $0, case = $1",
        (value) => expect(isValidTelNumber(value)).toBeFalsy(),
      );
    });

    describe("number part", () => {
      const validCases = [
        "12345",
        "+1 123 345",
        "+ (45) 1-2-3 458",
        "+505 88888888",
      ];
      const invalidCases = [
        ["+505 123  456", "consecutive spaces"],
        ["+ (2) 123--456", "consecutive hyphens"],
      ];

      it.each(validCases)(
        "returns true on valid cases, value = $0",
        (value) => {
          expect(isValidTelNumber(value)).toBeTruthy();
        },
      );

      it.each(invalidCases)(
        "returns false on invalid cases, value = $0, case = $1",
        (value) => {
          expect(isValidTelNumber(value)).toBeFalsy();
        },
      );
    });
  });
});

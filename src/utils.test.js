import { describe, expect, it } from "vitest";
import { toPascalCase } from "./utils";

describe("utils test suite", () => {
  describe("toPascalCase test suite", () => {
    const setExpectation = ([text, expectedValue]) => {
      expect(toPascalCase(text)).toBe(expectedValue);
    };

    it("returns the expected result with single words", () => {
      const testSubjects = [
        ["hola", "Hola"],
        ["1", "1"],
        ["¡hola!", "¡hola!"],
        ["Adios", "Adios"],
      ];
      testSubjects.forEach(setExpectation);
    });

    it("returns the expected result with multiple words separated by whitespaces, underscores(_), hyphens(-) or any combination of the previous separators", () => {
      const testSubjects = [
        ["perro caliente", "PerroCaliente"],
        ["Hot-Dog", "HotDog"],
        ["¡hola!_¿Adios?", "¡hola!¿adios?"],
        ["6 6_3-4", "6634"],
        [
          "Tres tristes-tigres_Azules _-pardos",
          "TresTristesTigresAzulesPardos",
        ],
      ];
      testSubjects.forEach(setExpectation);
    });

    it("works with start and/or end whitespaces, underscores(_), hyphens(-) or any combination of the previous separators", () => {
      const testSubjects = [
        [" perro caliente", "PerroCaliente"],
        ["oso-grande-", "OsoGrande"],
        ["_camarón_que_Se_duerme_", "CamarónQueSeDuerme"],
        [" _- Rojo y azul _- _", "RojoYAzul"],
      ];
      testSubjects.forEach(setExpectation);
    });

    it("works with multiple whitespaces, underscores(_), hyphens(-) or any combination of the previous separators between words", () => {
      const testSubjects = [
        ["perro   caliente", "PerroCaliente"],
        ["Hot-----Dog", "HotDog"],
        ["¡hola!______¿Adios?", "¡hola!¿adios?"],
        ["6    6__3-----4", "6634"],
        [
          "Tres -_ tristes--___  tigres   Azules _---___pardos",
          "TresTristesTigresAzulesPardos",
        ],
      ];
      testSubjects.forEach(setExpectation);
    });

    it("works with single letter words", () => {
      const testSubjects = [
        ["a", "A"],
        ["a b c", "ABC"],
        ["F", "F"],
        ["1", "1"],
      ];
      testSubjects.forEach(setExpectation);
    });

    it("works with empty words", () => {
      const testSubjects = [["", ""]];
      testSubjects.forEach(setExpectation);
    });

    it("return an empty string if only separator are passed", () => {
      const testSubjects = [
        [" ", ""],
        ["-", ""],
        ["_", ""],
        [" -_", ""],
      ];
      testSubjects.forEach(setExpectation);
    });
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import { toPascalCase, Debouncer, clamp } from "./utils";

describe("utils", () => {
  describe("toPascalCase", () => {
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

  describe("Debouncer", () => {
    const callbackMock = vi.fn(() => {});
    const delay = 100;

    beforeEach(() => {
      vi.resetAllMocks();
    });

    describe("on run", () => {
      it("runs the callback after the delay", async () => {
        const debouncer = new Debouncer(delay);
        const options = { timeout: delay + delay * 0.2, interval: 10 };
        debouncer.run(callbackMock);
        expect(callbackMock).toHaveBeenCalledTimes(0);
        await vi.waitFor(() => {
          if (!callbackMock.mock.calls.length) {
            throw new Error("No se lamo callback");
          }
        }, options);
        expect(callbackMock).toHaveBeenCalledTimes(1);
      });

      it("aborts previously scheduled callbacks", async () => {
        const debouncer = new Debouncer(delay);
        const options = { timeout: delay * 2 + delay * 0.2, interval: 10 };
        const firstValue = 1;
        const secondValue = 2;
        const firstCallback = () => callbackMock(firstValue);
        const secondCallback = () => callbackMock(secondValue);
        debouncer.run(firstCallback);
        setTimeout(() => debouncer.run(secondCallback), delay - 10);
        await vi.waitFor(() => {
          if (!callbackMock.mock.calls.length) {
            throw new Error("No se lamo callback");
          }
        }, options);
        expect(callbackMock).toHaveBeenCalledExactlyOnceWith(secondValue);
      });
    });
  });

  describe("clamp", () => {
    const min = 5;
    const max = 10;

    const setCase = (preferred) => {
      return { preferred, min, max };
    };

    it.each([min, 1].map(setCase))(
      "returns the min value if preferred <= min, preferred = $preferred, min = $min, max = $max",
      ({ preferred }) => {
        expect(clamp(min, preferred, max)).toBe(min);
      },
    );

    it.each([max, 42].map(setCase))(
      "returns the max value if preferred >= max, preferred = $preferred, min = $min, max = $max",
      ({ preferred }) => {
        expect(clamp(min, preferred, max)).toBe(max);
      },
    );

    it.each([7].map(setCase))(
      "return the preferred value if min < preferred < max",
      ({ preferred }) => {
        expect(clamp(min, preferred, max)).toBe(preferred);
      },
    );
  });
});

import { describe, expect, it } from "vitest";
import SUT from "./createVirtualModulePlugin";

const moduleId = "testModule";
const resolvedVirtualId = `\0virtual:${moduleId}`;

describe("createVirtualModulePlugin", () => {
  it("returns the correct name", () => {
    const { name } = SUT({ moduleId });
    const expectedName = "virtual-" + moduleId;
    expect(name).toBe(expectedName);
  });

  describe("resolveId", () => {
    const testResolvedId = (id, response) => {
      const { resolveId } = SUT({ moduleId });
      expect(resolveId(id)).toBe(response);
    };

    describe("returns the resolved virtual id", () => {
      it("if an id is the module id", () => {
        testResolvedId(moduleId, resolvedVirtualId);
      });

      const ids = [`${moduleId}.js`, `folder/src/${moduleId}.js`];

      it.each(ids)(
        "if an id is a path to a file with the module id as its name, id: '%s'",
        (id) => testResolvedId(id, resolvedVirtualId),
      );
    });

    describe("returns undefined", () => {
      it("if an id is not the module id", () => {
        testResolvedId("anotherModule", undefined);
      });

      const paths = [`${moduleId}.test.js`, "./folder/anotherModule.css"];

      it.each(paths)(
        "if an id is not a path to a file with the module id as its name, id: '%s'",
        (path) => testResolvedId(path, undefined),
      );
    });
  });

  describe("load", () => {
    const customExportString = "export default function A(){};";

    describe("if an id is the resolved virtual id", () => {
      it("returns exportString if it is defined", () => {
        const { load } = SUT({ moduleId, exportString: customExportString });
        expect(load(resolvedVirtualId)).toBe(customExportString);
      });

      it("returns a default export if exportString is undefined", () => {
        const { load } = SUT({ moduleId });
        expect.assert.isString(load(resolvedVirtualId));
      });
    });

    const cases = [
      {
        id: `folder/src/${moduleId}.js`,
        exportString: customExportString,
      },
      { id: "anotherModule" },
    ];

    it.each(cases)(
      "returns undefined if id is not the resolved virtual id, id: $id, exportString: $exportString",
      ({ id, exportString }) => {
        const { load } = SUT({ moduleId, exportString });
        expect(load(id)).toBe(undefined);
      },
    );
  });
});

import { describe, expect, it } from "@jest/globals";
import * as path from "path";
import {
  getTypeAliasTypeStructure,
  getVariableTypeStructure,
} from "../../jest/testFileTypeKeyValues";

import { Project } from "ts-morph";

describe("primitive array schema", () => {
  it("should infer number and string arrays", () => {
    expect(
      getTypeAliasTypeStructure([__dirname, "primitive-arrays.ts"], "myObject")
    ).toEqual({
      string: "string",
      stringArr: "string[]",
      int: "number",
      intArr: "number[]",
    });

    expect(
      getVariableTypeStructure([__dirname, "primitive-arrays.ts"], "schema")
    ).toMatchSnapshot();
  });
  it("should create ts morph resources correctly", () => {
    const project = new Project({});
    const filePath = path.join(__dirname, "primitive-arrays.ts");
    project.addSourceFilesAtPaths(filePath);
    const sourceTsFile = project.getSourceFile(
      path.join(__dirname, "primitive-arrays.ts")
    );

    expect(sourceTsFile.getFilePath()).toBe(
      path.join(__dirname, "primitive-arrays.ts")
    );
  });
});

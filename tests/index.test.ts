import { describe, expect, it } from "@jest/globals";
import {
  getTypeAliasTypeStructure,
  getVariableTypeStructure,
} from "../jest/testFileTypeKeyValues";

describe("schema to ts", () => {
  it("shuold convert", () => {
    expect(
      getTypeAliasTypeStructure(
        [__dirname, "tsconfig.json"],
        "index.ts",
        "myObject"
      )
    ).toEqual({
      string: "string",
      stringArr: "string[]",
      int: "number",
      intArr: "number[]",
    });

    expect(
      getVariableTypeStructure(
        [__dirname, "tsconfig.json"],
        "index.ts",
        "schema"
      )
    ).toMatchSnapshot();
  });
});

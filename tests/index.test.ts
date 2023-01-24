import { describe, it, expect } from '@jest/globals';
import { log } from 'console';
import * as path from 'path';
import { Project } from 'ts-morph';

const testFileTypeKeyValues = (file: string, type: string) => {
  const project = new Project({
    tsConfigFilePath: path.join(__dirname, './tsconfig.json'),
  });
  const indexTs = project.getSourceFile(file);
  const typeAlias = indexTs.getTypeAliasOrThrow(type);
  const typeAliasType = typeAlias.getType();
  const typeAliasProperties = typeAliasType.getProperties();

  const actual = {};
  for (const prop of typeAliasProperties) {
    actual[prop.getFullyQualifiedName()] = prop
      .getTypeAtLocation(typeAlias)
      .getText();
  }

  return actual;
};

describe('schema to ts', () => {
  it('shuold convert', () => {
    const actual = testFileTypeKeyValues('index.ts', 'mySchema');
    expect(actual).toEqual({
      name: 'string',
      id: 'number',
      resource_tag_ids: 'number[]',
      rsa_private: 'unknown',
      rsa_public: 'unknown',
    });
  });
});

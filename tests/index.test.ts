import { describe, it, expect } from '@jest/globals';
import {
  testFileTypeKeyValues,
  getProjectFile,
} from '../jest/testFileTypeKeyValues';

describe('schema to ts', () => {
  it('shuold convert', () => {
    expect(
      testFileTypeKeyValues(
        [__dirname, 'tsconfig.json'],
        'index.ts',
        'myObject'
      )
    ).toEqual({
      name: 'string',
      id: 'number',
      resource_tag_ids: 'number[]',
      rsa_private: 'unknown',
      rsa_public: 'unknown',
    });

    const indexTs = getProjectFile([__dirname, 'tsconfig.json'], 'index.ts');
    const schemaConst = indexTs.getVariableDeclarationOrThrow('schema');
    const schemaConstType = schemaConst.getType();
    const schemaConstProps = schemaConstType.getProperties();

    const actual = {};
    for (const prop of schemaConstProps) {
      actual[prop.getFullyQualifiedName()] = prop
        .getTypeAtLocation(schemaConst)
        .getText();
    }
    expect(actual).toMatchSnapshot();
  });
});

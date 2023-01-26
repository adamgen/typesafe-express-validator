import { describe, it, expect } from '@jest/globals';
import {
  getTypeAliasTypeStructure,
  getVariableTypeStructure,
} from '../jest/testFileTypeKeyValues';

describe('schema to ts', () => {
  it('shuold convert', () => {
    expect(
      getTypeAliasTypeStructure(
        [__dirname, 'tsconfig.json'],
        'index.ts',
        'myObject'
      )
    ).toEqual({
      name: 'string',
      id: 'number',
      resource_tag_ids: 'number[]',
      rsa_private: 'string',
      rsa_public: 'string',
    });

    expect(
      getVariableTypeStructure(
        [__dirname, 'tsconfig.json'],
        'index.ts',
        'schema'
      )
    ).toMatchSnapshot();
  });
});

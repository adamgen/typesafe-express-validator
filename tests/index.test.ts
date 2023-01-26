import { describe, it, expect } from '@jest/globals';
import { testFileTypeKeyValues } from '../jest/testFileTypeKeyValues';

describe('schema to ts', () => {
  it('shuold convert', () => {
    const actual = testFileTypeKeyValues(
      [__dirname, 'tsconfig.json'],
      'index.ts',
      'myObject'
    );
    expect(actual).toEqual({
      name: 'string',
      id: 'number',
      resource_tag_ids: 'number[]',
      rsa_private: 'unknown',
      rsa_public: 'unknown',
    });
  });
});

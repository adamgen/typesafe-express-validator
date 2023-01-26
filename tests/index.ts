import { ExpressValidatorToSchema } from '../lib/ExpressValidatorToSchema';
import { ParamSchema, Schema } from 'express-validator';

type MyKeys =
  | 'name'
  | 'resource_tag_ids'
  | 'resource_tag_ids.*'
  | 'rsa_private'
  | 'rsa_public'
  | 'id';

const defineSchema = <T extends Schema>(schema: T & Schema): T =>
  schema as unknown as T;

const schema = defineSchema({
  name: {
    in: 'body',
    isString: true,
    isEmpty: {
      negated: true,
    },
    optional: true,
  },
  resource_tag_ids: {
    in: 'body',
    isArray: true,
    optional: true,
  },
  'resource_tag_ids.*': {
    in: 'body',
    isInt: true,
    optional: true,
  },
  rsa_private: {
    in: 'body',
    exists: {
      negated: true,
    },
  },
  rsa_public: {
    in: 'body',
    custom: {
      options: (rsa_public) => true,
    },
  },
  id: {
    in: 'body',
    isInt: true,
    exists: { negated: true },
  },
} as const);

type TypeofSchema = typeof schema;
type Keys = keyof TypeofSchema;
type Value = {
  [key in Keys]: TypeofSchema[key];
};

// export type ExpressValidatorToSchema<T extends Schema> = {
//   [key in keyof RawSchema<T>]: RawSchema<T>[key];
// };

type mySchema = ExpressValidatorToSchema<Value>;

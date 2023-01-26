import { defineSchema, Infer } from '../lib/';

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
    isString: true,
    in: 'body',
    exists: {
      negated: true,
    },
  },
  rsa_public: {
    isString: true,
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

type mySchema = typeof schema;
type myObject = Infer<typeof schema>;

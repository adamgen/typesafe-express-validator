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

type mySchema = typeof schema;
type myObject = Infer<typeof schema>;

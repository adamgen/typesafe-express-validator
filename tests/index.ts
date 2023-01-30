import { defineSchema, Infer } from "lib";

const schema = defineSchema({
  string: {
    in: "body",
    isString: true,
  },
  stringArr: {
    in: "body",
    isArray: true,
    optional: true,
  },
  "stringArr.*": {
    in: "body",
    isString: true,
  },
  int: {
    in: "body",
    isInt: true,
  },
  intArr: {
    in: "body",
    isArray: true,
    optional: true,
  },
  "intArr.*": {
    in: "body",
    isInt: true,
  },
} as const);

type mySchema = typeof schema;
type myObject = Infer<typeof schema>;

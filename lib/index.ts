import { ParamSchema, Schema } from "express-validator/check";

type ArrayKeys<T extends Schema> = keyof T & `${string}.*`;
type NonArrayKeys<T extends Schema> = Exclude<keyof T, ArrayKeys<T>>;

type RemoveArrayKeys<T extends `${string}.*`> = T extends `${infer Prefix}.*`
  ? Prefix
  : never;

type KeysThatHaveArrays<T extends Schema> = RemoveArrayKeys<ArrayKeys<T>>;
type KeysWithoutArrays<T extends Schema> = Exclude<
  NonArrayKeys<T>,
  KeysThatHaveArrays<T>
>;

type ParamCheck<
  T extends ParamSchema,
  K extends keyof ParamSchema
> = T[K] extends true ? true : false;

// prettier-ignore
type MapSchemaParamToObjectProp<T extends ParamSchema> =
      ParamCheck<T, 'isArray'>   extends true ? Array<never>
    : ParamCheck<T, 'isInt'>     extends true ? number
    : ParamCheck<T, 'isString'>  extends true ? string
    : ParamCheck<T, 'isAlphanumeric'>  extends true ? string
    : ParamCheck<T, 'isAscii'>  extends true ? string
    : ParamCheck<T, 'isBase32'>  extends true ? string
    : ParamCheck<T, 'isBase58'>  extends true ? string
    : ParamCheck<T, 'isBase64'>  extends true ? string
    : ParamCheck<T, 'isBoolean'>  extends true ? boolean
    : ParamCheck<T, 'isBtcAddress'>  extends true ? string
    : ParamCheck<T, 'isCurrency'>  extends true ? string
    : ParamCheck<T, 'isDataURI'>  extends true ? string
    : ParamCheck<T, 'isDecimal'>  extends true ? number
    : ParamCheck<T, 'isEmail'>  extends true ? string
    : ParamCheck<T, 'isEthereumAddress'>  extends true ? string
    : ParamCheck<T, 'isFloat'>  extends true ? number
    : ParamCheck<T, 'isHash'>  extends true ? string
    : ParamCheck<T, 'isHexColor'>  extends true ? string
    : ParamCheck<T, 'isHexadecimal'>  extends true ? string
    : unknown;

type SchemaForStrKeysWithoutArrays<T extends Schema> = {
  [key in KeysWithoutArrays<T>]: MapSchemaParamToObjectProp<T[key]>;
};

type SchemaForStrKeysThatHaveArrays<T extends Schema> = {
  [key in KeysThatHaveArrays<T>]: Array<
    MapSchemaParamToObjectProp<T[`${key}.*`]>
  >;
};

type RawSchema<T extends Schema> = SchemaForStrKeysWithoutArrays<T> &
  SchemaForStrKeysThatHaveArrays<T>;

export type Infer<T extends Schema> = {
  [key in keyof RawSchema<T>]: RawSchema<T>[key];
};

export const defineSchema = <T extends Schema>(schema: T & Schema): T =>
  schema as T;

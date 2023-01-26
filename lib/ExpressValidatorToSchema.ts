import { ParamSchema, Schema } from 'express-validator/check';

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

export type ExpressValidatorToSchema<T extends Schema> = {
  [key in keyof RawSchema<T>]: RawSchema<T>[key];
};

export const defineSchema = <T extends Schema>(
  schema: T & Schema
): ExpressValidatorToSchema<T> =>
  schema as unknown as ExpressValidatorToSchema<T>;

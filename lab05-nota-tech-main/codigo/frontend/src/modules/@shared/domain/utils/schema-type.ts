import * as Yup from "yup";

export type SchemaType<T> = T extends Yup.ObjectSchema<infer R> ? R : never;
export const path = (root: string, sublink: string) =>
  `${root}${sublink}`;

type Primitive = string | number | bigint | boolean | symbol | null | undefined

type PathImpl<K extends keyof T, T> = K extends string ? (
  T[K] extends Primitive ? K : `${K}.${Path<T[K]>}`
) : never;

export type Path<T extends any> = {
  [K in keyof T]: PathImpl<K, T>;
}[keyof T];
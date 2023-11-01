interface HasAny {
  [key: string]: any;
}

export type Requires<T> = {
  [key in keyof T]: T[key]
} & HasAny
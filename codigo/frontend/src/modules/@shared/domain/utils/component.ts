export type DeductComponentProps<T> = 
  T extends (args: infer R) => any ? R : never;
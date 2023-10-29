export type Func<T extends any[], R> = {
  (...param: T): R;
}

export type Action<T extends any[]> = Func<T, void>;
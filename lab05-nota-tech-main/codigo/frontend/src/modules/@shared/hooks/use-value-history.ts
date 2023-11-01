import { useState } from 'react';
import { Action } from 'src/modules/@shared/domain/utils/func';

export interface DataType<T> {
  prev?: DataType<T>;
  next?: DataType<T>;
  value?: T;
}

export type ValueHistoryReturn<T> = [DataType<T>, Action<[T]>, Action<[DataType<T>]>];

export default function useValueHistory<T>(defaultValue?: T): ValueHistoryReturn<T> {
  const [data, setData] = useState<DataType<T>>({
    prev: undefined,
    next: undefined,
    value: defaultValue
  });

  const handleChange = (newValue: T) => {
    setData(data => {
      data.next = {
        prev: data,
        next: undefined,
        value: newValue
      };
  
      const res = newValue == data.prev?.value
        ? data.prev : data.next;
      
      return res;
    });
  }

  return [data, handleChange, setData];
}
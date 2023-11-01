import { useRef } from 'react';
import { FormProvider as Form } from 'react-hook-form';
import { Action } from '../domain/utils/func';

export interface FormProviderProps {
  children: React.ReactNode;
  methods: any;
  onSubmit: Action<[any]>
  id?: string;
  innerRef?: React.MutableRefObject<any>;
  [other: string]: any;
}

export default function FormProvider({ children, onSubmit, methods, id, innerRef, ...other }: FormProviderProps) {
  const test = useRef();
  return (
    <Form {...methods}>
      <form id={id ?? 'form'} ref={innerRef} onSubmit={onSubmit} {...other}>{children}</form>
    </Form>
  );
}
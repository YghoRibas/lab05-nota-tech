import { Controller, useFormContext } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import React, { forwardRef, useState } from 'react';
import { createToCurrency } from 'src/modules/@shared/domain/utils/money-input';
import { Action } from 'src/modules/@shared/domain/utils/func';

export interface RMoneyInputProps {
  name: string;
  separator?: string;
  decimals?: number;
  [other: string]: any;
}

export default function RMoneyInput({ 
  name, 
  separator = '.',
  decimals = 2,
  ...other 
}: RMoneyInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <MoneyInput
         {...field}
         {...other}
         decimals={decimals}
         error={!!error}
         helperText={error?.message}
         inputRef={ref}
        />
      )}
    />
  );
}

export interface MoneyInputProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  separator?: string;
  decimals?: number;
  value?: number | string;
  onChange?: Action<[React.ChangeEvent<HTMLInputElement>]>
}

const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(function({ 
  separator = '.',
  decimals = 2,
  value = '',
  onChange,
  ...other
}: MoneyInputProps, ref) {
  let [state, setState] = useState(value);

  if(isValidNumber(value)){
    value = String(value).replace(',', '.');
    const number = Number(value);
    state = number.toFixed(decimals).replace('.', separator);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    const currency = createToCurrency(decimals)(value, separator);
    event.target.value = currency;
    setState(currency);
    if(onChange)
      onChange(event);
  }

  return (
    <TextField
      fullWidth
      {...other}
      value={state}
      ref={ref}
      onChange={handleChange}
    />
  );
})


function isValidNumber(value: string | number){
  return parseFloat(value as any) > 0 
  || String(value).length > 0
}
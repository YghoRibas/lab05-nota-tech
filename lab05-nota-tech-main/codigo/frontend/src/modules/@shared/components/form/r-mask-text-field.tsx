import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import InputMask from 'react-input-mask';

export interface RTextFieldProps {
  name: string;
  mask: string;
  [other: string]: any;
}
export default function RMaskTextField({ name, mask, ...other }: RTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <InputMask mask={mask} {...field}>
          {(inputProps: any) => <TextField
            {...inputProps}
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...other}
            inputRef={ref}
          />}
        </InputMask>
      )}
    />
  );
}
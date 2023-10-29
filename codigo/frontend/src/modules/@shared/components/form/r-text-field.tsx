import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

export interface RTextFieldProps {
  name: string;
  [other: string]: any;
}

export default function RTextField({ name, ...other }: RTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <TextField
          {...field}
          inputRef={ref}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}

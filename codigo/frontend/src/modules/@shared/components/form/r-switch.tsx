// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { FormControlLabel, Switch } from '@mui/material';

export interface RSwitchProps {
  name: string;
  [other: string]: any;
}

export default function RHFSwitch({ name, ...other }: RSwitchProps) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      label=""
      control={
        <Controller name={name} control={control} render={({ field }) => <Switch {...field} checked={field.value} />} />
      }
      {...other}
    />
  );
}

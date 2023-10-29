import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export interface RCheckboxProps {
  name: string;
  [other: string]: any;
}

export function RCheckbox({ name, ...other }: RCheckboxProps) {
  const { control } = useFormContext();
  return (
    <FormControlLabel
      label=""
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return <Checkbox {...field} checked={field.value} {...other} />;
          }}
        />
      }
      {...other}
    />
  );
}

export interface RHFMultiCheckboxProps {
  name: string;
  options: any[]
  [other: string]: any;
}


export function RHFMultiCheckbox({ name, options, ...other }: RHFMultiCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option: any) =>
          field.value.includes(option) ? field.value.filter((value: any) => value !== option) : [...field.value, option];

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={field.value.includes(option)}
                    onChange={() => field.onChange(onSelected(option))}
                  />
                }
                label={option}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}

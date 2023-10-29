import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import { Requires } from 'src/modules/@shared/domain/utils/requires';
import { DeductComponentProps } from 'src/modules/@shared/domain/utils/component';

export interface SelectItem {
  id: string | number;
  name: string;
}

export interface RSelectProps {
  name: string;
  options: Requires<SelectItem>[];
  label?: string;
  FormControlProps?: DeductComponentProps<typeof FormControl>;
  SelectProps?: DeductComponentProps<typeof Select>
  [other: string]: any;
}

export default function RSelect({ 
  name,
  children, 
  label, 
  options,
  FormControlProps,
  SelectProps,
  ...other 
}: RSelectProps) {
  const { control } = useFormContext();
  
  const value = useWatch({ control, name }) ?? ''
  
  return (
    <FormControl {...FormControlProps}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            {label && <InputLabel id={name}>{label}</InputLabel>}
            <Select
              sx={{ width: '100%' }}
              {...SelectProps}
              {...field}
              error={!!error}
              onChange={event => {
                field.onChange(event)
                if (other.onChange)
                  other.onChange(event)
              }}
              labelId={name}
              label={label}
              value={value}
            >
              <MenuItem value="">
                <em>Nenhum</em>
              </MenuItem>
              {options.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: '#d32f2f' }}>
              {error?.message ?? ''}
            </FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
}
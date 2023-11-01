import { useFormContext, Controller } from 'react-hook-form';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useEffect } from 'react';

export interface RDatePickerProps {
  name: string;
  defaultValue?: any;
  [other: string]: any;
}

export default function RDatePicker({ name, defaultValue, ...other }: RDatePickerProps) {
  const { control, getValues, setValue } = useFormContext();
  const date = getValues(name) ? getValues(name) : null;
  
  useEffect(() => {
    if(!date)
      setValue(name, defaultValue ?? new Date());
  })

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MobileDatePicker
          format="dd/MM/yyyy"
          onChange={(date: any) => field.onChange(date)}
          label={other.label}
          value={field.value}
          slotProps={{ 
            textField: { 
              error: !!error, 
              helperText: error?.message 
            } 
          }}
          sx={other.sx}
        />
      )}
    />
  );
}

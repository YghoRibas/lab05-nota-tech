import { useFormContext, Controller } from 'react-hook-form';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { useEffect } from 'react';

export interface RDateTimePickerProps {
  name: string;
  defaultValue?: any;
  [other: string]: any;
}

export default function RDateTimePicker({ name, defaultValue, ...other }: RDateTimePickerProps) {
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
        <MobileDateTimePicker
          localeText={{ toolbarTitle: 'SELECIONE A DATA E HORA' }}
          format="dd/MM/yyyy HH:mm"
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

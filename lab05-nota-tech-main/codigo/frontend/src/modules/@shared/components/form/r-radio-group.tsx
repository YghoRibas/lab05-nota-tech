import { Controller, FieldError, useFormContext, useFormState } from 'react-hook-form';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Requires } from 'src/modules/@shared/domain/utils/requires';
import BorderedSection, { BorderedSectionProps } from '../sections/bordered-section';
import { DeductComponentProps } from 'src/modules/@shared/domain/utils/component';
import { AccessObjectFromString } from 'src/modules/@shared/domain/utils/access-obj-from-str'
import { Func } from 'src/modules/@shared/domain/utils/func';

export interface RadioOption {
  id: number | string;
  label: string;
}

export interface RRadioGroupProps {
  name: string;
  label: string;
  variant?: 'default' | 'bordered';
  FormControlProps?: DeductComponentProps<typeof FormControl>;
  BorderedSectionProps?: Partial<BorderedSectionProps>;
  onChange?: Func<[any], void>;
  options: Requires<RadioOption>[]
}

export default function RRadioGroup({
  name,
  label,
  options,
  variant = 'default',
  FormControlProps,
  onChange,
  BorderedSectionProps = {}
}: RRadioGroupProps) {
  const { control } = useFormContext()

  const { errors } = useFormState({ control, name })

  const hasError = AccessObjectFromString(errors, name)

  const content = (field: any, error: FieldError | undefined) => (
    <>
      {variant == 'default' && <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>}
      <RadioGroup
        {...field}
        onChange={event => {
          field.onChange(event)

          onChange && onChange(event.currentTarget.value)
        }}
      >
        {options.map(option => (
          <FormControlLabel
            key={option.id}
            value={option.id}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>

      {variant == 'default' &&
        <FormHelperText error margin='dense'>{error?.message}</FormHelperText>}
    </>
  )

  BorderedSectionProps = {
    ...BorderedSectionProps,
    ...(hasError && {
      titleColor: '#d32f2f',
      borderColor: '#d32f2f'
    })
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <>
          {variant == 'default' && (
            <FormControl {...FormControlProps}>
              {content(field, error)}
            </FormControl>
          )}

          {variant == 'bordered' && (
            <FormControl {...FormControlProps}>
              <BorderedSection
                title={label}
                {...BorderedSectionProps}
              >
                {content(field, error)}
              </BorderedSection>

              <FormHelperText error margin='dense'>{error?.message}</FormHelperText>
            </FormControl>
          )}
        </>
      )}
    />
  );
}
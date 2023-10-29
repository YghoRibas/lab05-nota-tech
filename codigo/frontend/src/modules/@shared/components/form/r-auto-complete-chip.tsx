import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Autocomplete, AutocompleteChangeDetails, ListItem, SxProps, Theme, Typography } from '@mui/material';
import { RChipInputChild, RChipInputProps } from './r-chip-input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useRef } from 'react';
import { Func } from 'src/modules/@shared/domain/utils/func';
import { Requires } from 'src/modules/@shared/domain/utils/requires';

export interface RAutoCompleteChipProps extends RChipInputProps {
  keySelector: Func<[any], string | number>;
  isOptionEqualToValue?: Func<[any, any], boolean>;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  multiple?: boolean;
  options: Requires<{ label: string }>[]

  label?: string;
}

export default function RAutoCompleteChip({
  name,
  keySelector,
  labelSelector,
  options,
  ...other
}: RAutoCompleteChipProps) {
  if (!labelSelector)
    labelSelector = (item: any) => item.label;

  const ref = useRef<HTMLDivElement>()

  const { control, getValues } = useFormContext()

  const array = useFieldArray({ control, name })

  const autoCompleteProps = {
    isOptionEqualToValue: other.isOptionEqualToValue,
    fullWidth: other.fullWidth,
    sx: other.sx,
    label: other.label,
    multiple: other.multiple
  }

  const itens = getValues(name)

  const clear = () => {
    const input = ref.current?.querySelector('input')! as HTMLInputElement

    const nativeSet = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!

    nativeSet.call(input, '')

    input.dispatchEvent(new Event('change', { bubbles: true }))
  }

  const handleChange = (
    e: React.SyntheticEvent, _: any[],
    reason: string,
    details: AutocompleteChangeDetails<any> | undefined
  ) => {
    if (!details?.option ||
      (e as any).code == 'Backspace')
      return e.stopPropagation();

    if (reason == 'selectOption')
      array.append(details.option)

    if (reason == 'removeOption') {
      const i = (itens as any[]).findIndex(item =>
        keySelector(item) == keySelector(details.option))

      array.remove(i)
    }

    clear()
  }

  const hasItem = (item: any) =>
    !!(itens as any[]).find(itm =>
      keySelector(itm) == keySelector(item))

  return (
    <Autocomplete
      ref={ref}
      value={itens ?? []}
      clearOnBlur
      options={options}
      onChange={handleChange}
      {...autoCompleteProps}
      renderOption={(props, option) =>
        <ListItem
          {...props}
          key={keySelector(option)}
          sx={{
            display: 'flex!important',
            justifyContent: 'space-between!important',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
          className='MuiAutocomplete-option'
        >
          <Typography>{labelSelector!(option)}</Typography>

          {hasItem(option) && <CheckCircleOutlineIcon sx={{ color: 'grey' }} />}
        </ListItem>
      }
      renderInput={params =>
        <RChipInputChild
          {...params}
          label={other.label ?? ''}
          name={name}
          labelSelector={labelSelector!}
          array={array}
        />
      }
    />
  );
}
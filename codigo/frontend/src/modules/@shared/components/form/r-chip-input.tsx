import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { FieldValues, UseFieldArrayAppend, UseFieldArrayRemove, useFieldArray, useFormContext, useFormState } from 'react-hook-form';
import { Chip, TextField, styled } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Func } from 'src/modules/@shared/domain/utils/func';
import AccessObjectFromString from '../../domain/utils/access-obj-from-str';

export interface RChipInputProps {
  name: string;
  labelSelector: Func<[any], string>;
  add?: Func<[string], any>;
  [other: string]: any;
}

export default function RChipInput({
  name,
  labelSelector,
  add,
  ...other
}: RChipInputProps) {
  const { control } = useFormContext();

  const array = useFieldArray({ control, name })

  return (
    <RChipInputChild
      name={name}
      labelSelector={labelSelector}
      add={add}
      array={array}
      {...other}
    />
  )
}


export interface RChipInputChildProps {
  name: string;
  labelSelector: Func<[any], string>;
  add?: Func<[string], any>;
  array: {
    fields: Record<"id", string>[],
    append: UseFieldArrayAppend<FieldValues, string>,
    remove: UseFieldArrayRemove
  }
  [other: string]: any;
}

export function RChipInputChild({
  name,
  labelSelector,
  add,
  array: {
    fields,
    append,
    remove
  },
  ...other
}: RChipInputChildProps) {
  const { control } = useFormContext();

  const total = useRef(fields.length)

  const { errors } = useFormState({ control, name })

  const [i, setI] = useState<number>()

  const hasAtLeastOne = fields.length > 0

  const [value, setValue] = useState('')

  const setValueI = (i: number) => {
    if (i < 0 ||
      i >= fields.length ||
      fields.length == 0)
      return setI(undefined)

    setI(i)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (other.inputProps?.onKeyDown)
      other.inputProps?.onKeyDown(event)

    const action = () => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
          if (i == undefined)
            return setValueI(fields.length - 1)

          const operand = 1 * (event.key == 'ArrowLeft' ? -1 : 1)

          setValueI(i + operand)
          break;

        case 'Backspace':
        case 'Delete':
          if (value.length)
            return;

          if (i == undefined)
            return setValueI(fields.length - 1);

          remove(i);

          setValueI(i - 1)

          break;

        case 'Tab':
        case 'Enter':
          event.preventDefault()
          
          if (!add)
            return;

          const isAdd = event.key == 'Tab' || event.key == 'Enter'

          if (!isAdd) return;

          const target = event.currentTarget

          const { value: name } = target

          if (name.trim().length == 0)
            return;

          setValue('')

          append(add(name))
          break;
      }
    }

    action()

    if (i != undefined) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const inputRef = useRef<HTMLInputElement>()

  const handleDelete = (index: number) =>
    remove(index)

  const hasError = AccessObjectFromString(errors, name)

  const helperText = hasError ?
    hasError?.message as string : ''

  const handleClearAll = () =>
    fields.length && remove()

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (other.inputProps?.onBlur)
      other.inputProps?.onBlur(event)

    setI(undefined)
  }

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (other.inputProps?.onClick)
      other.inputProps?.onClick(event)

    setI(undefined)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value)

  if (other.inputProps?.ref)
    other.inputRef = other.inputProps.ref

  useEffect(() => {
    if(fields.length > total.current)
      setI(undefined)

    total.current = fields.length
  }, [fields.length])

  return (
    <TextFieldStyled
      {...other}
      fullWidth
      value={value}
      onChange={handleChange}
      hasAtLeastOne={hasAtLeastOne}
      error={!!hasError}
      helperText={helperText}
      inputRef={ref => {
        inputRef.current = ref;

        if (other.inputRef) {
          if (typeof other.inputRef == 'function')
            other.inputRef(ref)
          else
            other.inputRef.current = ref;
        }
      }}
      inputProps={{
        ...(other.inputProps && other.inputProps),
        onKeyDown: handleKeyDown,
        onBlur: handleBlur,
        onClick: handleClick,
        style: {
          caretColor: i != undefined ? 'transparent' : 'auto'
        }
      }}
      InputProps={{
        ...(other.InputProps && other.InputProps),
        startAdornment: hasAtLeastOne ? fields.map((chip, index) =>
          <Chip
            key={chip.id}
            label={labelSelector(chip)}
            sx={{ mr: 1, borderRadius: 0 }}
            onClick={() => setI(index)}
            onDelete={() => handleDelete(index)}
            {...(i == index && {
              variant: 'outlined',
              color: 'primary'
            })}
          />
        ) : undefined,
        endAdornment: hasAtLeastOne &&
          <IconButton
            aria-label="Limpar"
            title="Limpar"
            size="small"
            onClick={handleClearAll}
            sx={{ 
              top: 'calc(50% - 14px)',
              position: 'absolute',
              right: '7px'
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
      }}
    />
  );
}

interface TextFieldStyledProps {
  hasAtLeastOne: boolean;
}

const TextFieldStyled = styled(TextField, {
  shouldForwardProp: (prop) => prop != 'hasAtLeastOne'
})<TextFieldStyledProps>(({ size, hasAtLeastOne }) => ({
  '.MuiInputBase-root': {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    rowGap: '5px',
    paddingTop: '9px',
    paddingBottom: '9px',
    paddingRight: '5px!important',

    'input': {
      minWidth: '30px',
      width: 'auto',
      flexGrow: 1,
      textOverflow: 'ellipsis',
      alignSelf: 'center',
      padding: size === 'small' ? '3.5px 4px' : '7.5px 4px',
      ...(!hasAtLeastOne && {
        paddingLeft: '15px'
      })
    }
  }
}))
import {AddressFormInformation} from '../../../../features/addresses/models/Address'
import {Control, Controller, FieldError} from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import React, {FC} from 'react'
import {TextField} from '@mui/material'

const NameField:FC<NameFieldProps> = ({control,defaultValue,nameError,name,label}) => {
  return <>
    <Controller
      rules={{
        required: {message: 'This field is required', value: true},
        maxLength: {message: 'Too enough', value: 20}
      }}
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({field: {onChange, value}, fieldState: {error}}) =>
        <TextField variant={'standard'}
                   error={!!error}
                   required={true}
                   fullWidth
                   onChange={onChange}
                   value={value}
                   aria-invalid={error ? "true" : "false"}
                   label={label}/>}/>
    <ErrorMessage error={nameError}/>
  </>
}

interface NameFieldProps {
  control: Control<AddressFormInformation, any>,
  defaultValue: string | undefined,
  nameError?: FieldError,
  name: 'firstName' | 'lastName',
  label: string
}

export default NameField;
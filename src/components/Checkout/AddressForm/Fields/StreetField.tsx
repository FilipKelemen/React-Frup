import {AddressFormInformation} from '../../../../features/addresses/models/Address'
import {Control, Controller, FieldError} from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import React, {FC} from 'react'
import {TextField} from '@mui/material'

const StreetField:FC<StreetFieldProps> = ({control,defaultValue,streetError,label}) => {
  return <>
    <Controller
      rules={{
        required: {message: 'This field is required', value: true},
        maxLength: {message: 'Too enough', value: 50}
      }}
      control={control}
      name={'completeStreet'}
      defaultValue={defaultValue}
      render={({field: {onChange, value}, fieldState: {error}}) =>
        <TextField variant='standard'
                   error={!!error}
                   required={true}
                   onChange={(event) => {
                     event.target.value = event.target.value.slice(0, 50)
                     onChange(event)
                   }}
                   value={value}
                   fullWidth
                   aria-invalid={error ? "true" : "false"}
                   label={label}/>}/>
    <ErrorMessage error={streetError}/>
  </>
}

interface StreetFieldProps {
  control: Control<AddressFormInformation, any>,
  defaultValue: string | undefined,
  streetError?: FieldError,
  label: string
}

export default StreetField;
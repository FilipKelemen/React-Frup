import {AddressFormInformation} from '../../../../features/addresses/models/Address'
import {Control, Controller, FieldError} from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import React, {FC} from 'react'
import {TextField} from '@mui/material'

const EmailField:FC<EmailFieldProps> = ({control,defaultValue,emailError,label}) => {
  return <>
    <Controller
      rules={{
      required: {message: 'This field is required', value: true},
      pattern: {message: 'E-mail is not valid', value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g}
    }}
      control={control}
      name='email'
      defaultValue={defaultValue}
      render={({field: {onChange, value}, fieldState: {error}}) =>
      <TextField variant='standard'
                 error={!!error}
                 required={true}
                 onChange={onChange}
                 type={'email'}
                 value={value}
                 fullWidth
                 aria-invalid={error ? "true" : "false"}
                 label={label}/>}/>
    <ErrorMessage error={emailError}/>
  </>
}

interface EmailFieldProps {
  control: Control<AddressFormInformation, any>;
  defaultValue: string | undefined;
  emailError?: FieldError;
  label: string;
}

export default EmailField;
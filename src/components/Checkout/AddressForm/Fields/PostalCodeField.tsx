import React, {FC} from 'react';
import {Control, Controller, FieldError} from 'react-hook-form'
import {AddressFormInformation} from '../../../../features/addresses/models/Address'
import {TextField} from '@mui/material'
import ErrorMessage from '../ErrorMessage'

const PostalCodeField:FC<PostalCodeFieldProps> = ({control,defaultValue,postalCodeError,label}) => {
  return (
    <>
      <Controller
        rules={{
          required: {message: 'This field is required', value: true},
          maxLength: {message: 'Too long', value: 10}
        }}
        control={control}
        name='postalCode'
        defaultValue={defaultValue}
        render={({field: {onChange, value}, fieldState: {error}}) =>
          <TextField variant={'standard'}
                     error={!!error}
                     required={true}
                     onChange={(event) => {
                       event.target.value = event.target.value.slice(0, 10)
                       onChange(event)
                     }}
                     value={value}
                     fullWidth
                     aria-invalid={error ? "true" : "false"}
                     label={label}/>}/>
      <ErrorMessage error={postalCodeError}/>
    </>
  );
};

interface PostalCodeFieldProps {
  control: Control<AddressFormInformation, any>,
  defaultValue: string | undefined,
  postalCodeError?: FieldError,
  label: string
}

export default PostalCodeField;
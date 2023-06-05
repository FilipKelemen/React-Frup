import React, {FC} from 'react';
import {Control, Controller, FieldError} from 'react-hook-form'
import {AddressFormInformation} from '../../../../features/addresses/models/Address'
import {TextField} from '@mui/material'
import ErrorMessage from '../ErrorMessage'

const CompanyField:FC<CompanyFieldProps> = ({control,defaultValue,companyError,label}) => {
  return (
    <>
      <Controller
        rules={{maxLength: {message: 'Too long', value: 40}}}
        control={control}
        name='company'
        defaultValue={defaultValue}
        render={({field: {onChange, value}, fieldState: {error}}) =>
          <TextField variant={'standard'}
                     error={!!error}
                     onChange={(event) => {
                       event.target.value = event.target.value.slice(0, 40)
                       onChange(event)
                     }}
                     value={value}
                     fullWidth
                     aria-invalid={error ? "true" : "false"}
                     label={label}/>}/>
      <ErrorMessage error={companyError}/>
    </>
  );
};

interface CompanyFieldProps{
  control: Control<AddressFormInformation, any>,
  defaultValue: string | undefined,
  companyError?: FieldError,
  label: string
}

export default CompanyField;
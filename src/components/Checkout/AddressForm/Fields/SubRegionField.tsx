import {AddressFormInformation} from '../../../../features/addresses/models/Address'
import {Control, Controller, FieldError} from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import React, {FC} from 'react'
import {TextField} from '@mui/material'

const SubRegionField:FC<SubRegionFieldProps> = ({control,defaultValue,subRegionError,name,label}) => {
  return <>
    <Controller
      rules={{required: {message: 'This field is required', value: true}}}
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({field: {onChange, value}, fieldState: {error}}) =>
        <TextField variant='standard'
                   error={!!error}
                   required={true}
                   onChange={onChange}
                   value={value}
                   fullWidth
                   aria-invalid={error ? "true" : "false"}
                   label={label}/>}/>
    <ErrorMessage error={subRegionError}/>
  </>
}

interface SubRegionFieldProps {
  control: Control<AddressFormInformation, any>,
  defaultValue: string | undefined,
  subRegionError?: FieldError,
  name: 'state' | 'city',
  label: string
}

export default SubRegionField;
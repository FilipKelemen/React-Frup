import React, {FC} from 'react';
import {Control, Controller, FieldError} from 'react-hook-form'
import {InputAdornment, TextField} from '@mui/material'
import ErrorMessage from '../ErrorMessage'
import {AddressFormInformation} from '../../../../features/addresses/models/Address'
import {CountryInSelect} from '../../../../features/addresses/models/CountryInSelect'
import CountryFlag from '../../../Countries/Flag/CountryFlag'
import CountryFlagSkeleton from '../../../Countries/Flag/CountryFlagSkeleton'

const PhoneNumberField:FC<PhoneNumberFieldProps> = ({control,defaultValue,countryValue,phoneNumberError,label}) => {
  return (
    <>
      <Controller
        rules={{required: {message: 'This field is required', value: true}, maxLength: 9, minLength: 9}}
        control={control}
        name='phoneNumber'
        defaultValue={defaultValue}
        render={({field: {onChange, value}, fieldState: {error}}) =>
          <TextField variant='standard'
                     error={!!error}
                     required={true}
                     fullWidth
                     onChange={(event) => {
                       event.target.value = event.target.value.replace(/\D/g, '').slice(0, 9)
                       onChange(event)
                     }}
                     value={value}
                     aria-invalid={error ? "true" : "false"}
                     label={label}
                     type={'tel'}
                     InputProps={{
                       startAdornment:
                         (countryValue?.phone)
                           ? <InputAdornment position={'start'}>
                             <CountryFlag countryInSelect={countryValue}/>
                             +({countryValue.phone})
                           </InputAdornment>
                           : <InputAdornment position={'start'}>
                             <CountryFlagSkeleton/>
                             +(00)
                           </InputAdornment>
                     }}
          />}/>
      <ErrorMessage error={phoneNumberError}/>
    </>
  );
};

interface PhoneNumberFieldProps {
  control: Control<AddressFormInformation, any>;
  defaultValue: string | undefined;
  countryValue: CountryInSelect;
  phoneNumberError?: FieldError;
  label: string;
}

export default PhoneNumberField;
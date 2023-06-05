import {AddressFormInformation} from '../../../../features/addresses/models/Address'
import {Control, Controller, FieldError, FieldErrorsImpl, Merge} from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import React, {FC} from 'react'
import {Autocomplete, TextField} from '@mui/material'
import {CountryInSelect} from '../../../../features/addresses/models/CountryInSelect'
import {COUNTRIES} from '../../../../features/addresses/constants'
import Box from '@mui/material/Box'
import CountryFlag from '../../../Countries/Flag/CountryFlag'


const CountryField:FC<EmailFieldProps> = ({control,countryErrors,label}) => {
  return <>
    <Controller
      rules={{required: {message: 'This field is required', value: true}}}
      control={control}
      name='country'
      render={({field: {onChange, value}, fieldState: {error}}) =>
        <CountrySelect value={value} onChange={onChange} error={error} label={label}/>}/>

    {/* todo make error good here */}
    <ErrorMessage error={countryErrors as FieldError}/>
  </>
}

interface EmailFieldProps {
  control: Control<AddressFormInformation, any>;
  countryErrors?: Merge<FieldError, FieldErrorsImpl<{code: string, label: string, phone: string}>>;
  label: string;
}

const CountrySelect: FC<{onChange:(...event: any[]) => void, value: CountryInSelect,label: string,  error?: FieldError}> = React.memo(({onChange, value, error,label}) => {
  return (
    <Autocomplete
      id="country-select"
      options={COUNTRIES}
      onChange={(_, item) => {
        onChange(item)
      }}
      isOptionEqualToValue={(option,value) => JSON.stringify(option) === JSON.stringify(value)}
      value={value}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2} }} {...props}>
          <CountryFlag countryInSelect={option}/>
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='standard'
          label={label}
          error={!!error}
          required={true}
          aria-invalid={!!error ? "true" : "false"}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
})

export default CountryField;

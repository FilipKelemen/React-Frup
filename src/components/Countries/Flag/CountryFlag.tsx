import React, {FC} from 'react'
import {CountryInSelect} from '../../../features/addresses/models/CountryInSelect'

const CountryFlag: FC<{countryInSelect: CountryInSelect}> = ({countryInSelect}) => {
  return (
    <img
      loading="lazy"
      width="20"
      src={`https://flagcdn.com/w20/${countryInSelect.code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w40/${countryInSelect.code.toLowerCase()}.png 2x`}
      alt={`${countryInSelect.label} flag`}
    />
  )
}

export default CountryFlag;

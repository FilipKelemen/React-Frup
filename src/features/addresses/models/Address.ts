import {CountryInSelect} from './CountryInSelect'

interface AddressInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  completeStreet: string;
  state: string;
  city: string;
  postalCode: string;
  company?: string;
}

export interface AddressFormInformation extends AddressInfo{
  country: CountryInSelect;
}

export interface AddressRequestBodyInformation extends AddressInfo{
  country: string;
}

export interface AddressCache {
  addressId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  completeStreet?: string;
  country?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  company?: string;
  type: AddressType;
}

export const AddressType = {
  BILLING: 'billing',
  DELIVERY: 'delivery'
} as const

export type AddressType = typeof AddressType[keyof typeof AddressType]
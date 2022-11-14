export interface Address {
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

type AddressType = typeof AddressType[keyof typeof AddressType]
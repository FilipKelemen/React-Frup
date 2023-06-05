import {CartEntry} from './CartEntry'
import {AddressCache} from '../../addresses/models/Address'

export interface CartCache {
  cart: Cart
}

//total and formatted total is calculated with utility functions
export interface Cart {
  cartId: string
  paymentMethod: string | null
  status: string
  cartEntries: Array<CartEntry>
  billingAddress: AddressCache;
  deliveryAddress: AddressCache;
}
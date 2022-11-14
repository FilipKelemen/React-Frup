import {CartEntry} from './CartEntry'
import {Address} from './Address'

export interface CartCache {
  cart: Cart
}

//total and formatted total is calculated with utility functions
export interface Cart {
  cartId: string
  paymentMethod: string | null
  status: string
  cartEntries: Array<CartEntry>
  billingAddress: Address;
  deliveryAddress: Address;
}
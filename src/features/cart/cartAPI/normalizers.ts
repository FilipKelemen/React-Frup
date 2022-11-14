import {CartResponse} from '../models/CartResponse'
import {CartCache} from '../models/CartCache'

export const normalizeCart = (response: CartResponse): CartCache=> {
  return response.data;
}
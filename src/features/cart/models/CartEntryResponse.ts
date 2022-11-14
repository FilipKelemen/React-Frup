import {MyResponse} from '../../../app/API/models/MyResponse'
import {CartEntry} from './CartEntry'

export type CartEntryResponse = MyResponse<{cartEntry: CartEntry}>
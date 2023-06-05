import {MyResponse} from '../../../app/API/models/MyResponse'
import {AddressCache} from './Address'

export type AddressResponse =  MyResponse<{address: AddressCache}>;
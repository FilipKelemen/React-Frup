import {API} from '../../../app/API/API'
import {AddressRequestBodyInformation, AddressType} from '../models/Address'
import {CART_PATH} from '../../cart/cartAPI/constants'
import {CartCache} from '../../cart/models/CartCache'
import {AddressResponse} from '../models/AddressResponse'

export const addressAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    updateAddress: builder.mutation<AddressResponse,{cartId: string, address: AddressRequestBodyInformation, addressType: AddressType}>({
      query: ({cartId, address, addressType}) => ({
        url: `${CART_PATH}/${cartId}/address/${addressType}`,
        method: 'PATCH',
        body: address,
      }),
      async onQueryStarted({cartId, address, addressType}, {dispatch, queryFulfilled}) {
        try {
          const { data: {data: {address: updatedAddress} } } = await queryFulfilled
          dispatch(
            // @ts-ignore
            API.util.updateQueryData('getCart', cartId, (draft) => {
              if((draft as CartCache).cart[`${addressType}Address`]) {
                (draft as CartCache).cart[`${addressType}Address`] = updatedAddress
              }
            })
          )
        } catch (error){
          console.error(error)
        }
      },
    }),
  }),
  overrideExisting: false,
})
export const { useUpdateAddressMutation } = addressAPI;

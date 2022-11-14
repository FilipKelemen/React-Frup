import {API} from '../../../app/API/API'
import {USER_PATH} from './constants'
import {CartResponse} from '../../cart/models/CartResponse'
import {appendCartId, logOut} from '../authenticationSlice'
import {store} from '../../../app/store/store'

export const userAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getCartOfUser: builder.query<CartResponse, string>({
      query: () => `/${USER_PATH}/cart`,
      providesTags: ['UserTag'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: { data: updatedCart} } = await queryFulfilled
          dispatch(appendCartId(updatedCart.cart.cartId))
        } catch(error) {
          console.error('Google authentication failed on the resource server',error)
          store.dispatch(logOut())
        }
      },
    }),
  }),
  overrideExisting: false,
})
export const { useGetCartOfUserQuery } = userAPI;

import {API} from '../../../app/API/API'
import {CART_ENTRY_PATH, CART_PATH} from './constants'
import {normalizeCart} from './normalizers'
import {CartCache} from '../models/CartCache'
import {CartEntryResponse} from '../models/CartEntryResponse'
import {CartEntry, CartEntryPatchRequestBody, CartEntryPostRequestBody} from '../models/CartEntry'
import {Product} from '../../products/models/ProductsCache'
import _uniqueId from 'lodash/uniqueId'

export const cartAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartCache, string>({
      query: (cartId) => `/${CART_PATH}/${cartId}`,
      providesTags: (cartCache) =>
        cartCache
          ? [{type: 'CartTag', id: cartCache.cart.cartId}]
          : [{type: 'CartTag', id: 'THIS SHOULD NEVER BE NULL, GO IN CART API AND DEBUG WHAT\'S GOING ON' }],
      transformResponse: normalizeCart
    }),
    postCartEntry: builder.mutation<CartEntryResponse, {cartId: string, product: Product, quantity: number}>({
      query: ({cartId,product,quantity}) => ({
        url: `${CART_PATH}/${cartId}/${CART_ENTRY_PATH}`,
        method: 'POST',
        body: {quantity, productId: product.productId} as CartEntryPostRequestBody,
      }),
      async onQueryStarted({cartId,product,quantity}, {dispatch, queryFulfilled}) {
        const postCartEntryResult = dispatch(
          // @ts-ignore
          API.util.updateQueryData('getCart', cartId, (draft) => {
            if(!(draft as CartCache).cart.cartEntries.find((cartEntry) => cartEntry.product.productId === product.productId)) {
              Object.assign(draft,(draft as CartCache).cart.cartEntries.push({cartEntryId: _uniqueId(),quantity: quantity, product: product} as CartEntry))
            }
          })
        )
        try {
          const { data: {data: {cartEntry: updatedCartEntry}} } = await queryFulfilled
          dispatch(
            // @ts-ignore
            API.util.updateQueryData('getCart', cartId, (draft) => {
              const cartEntriesWithUpdatedId =
                (draft as CartCache).cart.cartEntries
                  .map((cartEntry) => (cartEntry.product.productId !== product.productId) ? cartEntry : updatedCartEntry);
              const desiredDraft = {cart: {...(draft as CartCache).cart, cartEntries: cartEntriesWithUpdatedId}}
              Object.assign(draft,desiredDraft)
            })
          )
        } catch {
          postCartEntryResult.undo()
        }
      },
    }),
    updateCartEntry: builder.mutation<CartEntryResponse,{cartId: string, cartEntryId: string, quantity: number}>({
      query: ({cartId, cartEntryId, quantity}) => ({
        url: `${CART_PATH}/${cartId}/${CART_ENTRY_PATH}/${cartEntryId}`,
        method: 'PATCH',
        body: {quantity} as CartEntryPatchRequestBody,
      }),
      async onQueryStarted({cartId,cartEntryId,quantity}, {dispatch, queryFulfilled}) {
        const patchCartEntryResult = dispatch(
          // @ts-ignore
          API.util.updateQueryData('getCart', cartId, (draft) => {
            let foundCartEntry = (draft as CartCache).cart.cartEntries.find((cartEntry) => cartEntry.cartEntryId === cartEntryId)
            if(foundCartEntry) {
              foundCartEntry.quantity = quantity
            }
          })
        )
        try {
          const { data: {data: {cartEntry: updatedCartEntry}} } = await queryFulfilled
          dispatch(
            // @ts-ignore
            API.util.updateQueryData('getCart', cartId, (draft) => {
              let foundCartEntry = (draft as CartCache).cart.cartEntries.find((cartEntry) => cartEntry.cartEntryId === cartEntryId)
              //objects change by reference, I need this ignore
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              if(foundCartEntry) {
                foundCartEntry = updatedCartEntry
              }
            })
          )
        } catch {
          patchCartEntryResult.undo()
        }
      },
    }),
    deleteCartEntry: builder.mutation<CartEntryResponse,{cartId: string, cartEntryId: string}>({
      query: ({cartId, cartEntryId}) => ({
        url: `${CART_PATH}/${cartId}/${CART_ENTRY_PATH}/${cartEntryId}`,
        method: 'DELETE'
      }),
      async onQueryStarted({cartId,cartEntryId}, {dispatch, queryFulfilled}) {
        const deleteCartEntryResult = dispatch(
          // @ts-ignore
          API.util.updateQueryData('getCart', cartId, (draft) => {
            (draft as CartCache).cart.cartEntries =
              (draft as CartCache).cart.cartEntries
                .filter((cartEntry) => cartEntry.cartEntryId !== cartEntryId)
          })
        )
        try {
          await queryFulfilled
        } catch {
          deleteCartEntryResult.undo()
        }
      },
    })
  }),
  overrideExisting: false,
})
export const { useGetCartQuery, usePostCartEntryMutation, useUpdateCartEntryMutation, useDeleteCartEntryMutation } = cartAPI;

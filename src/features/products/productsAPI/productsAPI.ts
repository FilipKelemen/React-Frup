import {API} from '../../../app/API/API'
import {ProductsCache} from '../models/ProductsCache'
import {PRODUCTS_PATH, SortingMode} from './constants'
import {normalizeProductsAndNumberOfPagesOnPage} from './normalizers'

export const productsAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getProductsAndNumberOfPagesOnPage: builder.query<ProductsCache,{page: number, sortingMode: SortingMode}>({
      query: (objectWithAllParams) => {
        const {page, sortingMode} = objectWithAllParams;
        return `${PRODUCTS_PATH}/page-and-number-of-pages-${page}/sortedBy-${sortingMode}`
      },
      transformResponse: normalizeProductsAndNumberOfPagesOnPage
    })
  }),
  overrideExisting: false,
})

export const { useGetProductsAndNumberOfPagesOnPageQuery } = productsAPI
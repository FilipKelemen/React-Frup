import {ProductsPageAndNumberOfPagesResponse} from '../models/ProductsPageAndNumberOfPagesResponse'
import {ProductsCache} from '../models/ProductsCache'

export const normalizeProductsAndNumberOfPagesOnPage = (response: ProductsPageAndNumberOfPagesResponse)=> {
  let normalizedResponse: any = {};
  normalizedResponse.products = response.data.products.content;
  normalizedResponse.pageable = {};
  normalizedResponse.pageable.pageNumber = response.data.products.pageable.pageNumber;
  normalizedResponse.pageable.pageSize = response.data.products.pageable.pageSize;
  normalizedResponse.pageable.totalPages = response.data.products.totalPages;
  normalizedResponse.pageable.totalElements = response.data.products.totalElements;
  return (normalizedResponse as ProductsCache);
}
import {MyResponse} from '../../../app/API/models/MyResponse'

export type ProductsPageAndNumberOfPagesResponse =  MyResponse<ProductsData>;

export interface Color {
  colorId: string;
  name: string;
}

interface Content {
  productId: string;
  name: string;
  numberInStock: number;
  imageUrl: string;
  priceValue: number;
  formattedPrice: string;
  currency: string;
  description: string;
  colors: Color[];
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort2 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Products {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  sort: Sort2;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface ProductsData {
  products: Products;
}

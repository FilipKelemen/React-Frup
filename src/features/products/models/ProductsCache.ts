import {Color} from './ProductsPageAndNumberOfPagesResponse'

export interface ProductsCache {
  products: Array<Product>;
  pageable: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
  };
}

export interface Product {
  productId: string;
  name: string;
  numberInStock: number;
  imageUrl: string;
  priceValue: number;
  formattedPrice: string;
  currency: string;
  description: string;
  colors: Array<Color>;
}

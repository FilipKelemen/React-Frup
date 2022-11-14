import {Product} from '../../products/models/ProductsCache'

export interface CartEntry {
  cartEntryId: string;
  quantity: number;
  product: Product;
  formattedTotal: string;
}

export interface CartEntryPostRequestBody {
  quantity: number;
  productId: string;
}

export interface CartEntryPatchRequestBody {
  quantity: number;
}
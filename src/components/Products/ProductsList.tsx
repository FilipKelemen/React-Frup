import React from 'react';
import {Product} from '../../features/products/models/ProductsCache'
import {Grid} from '@mui/material'
import {ProductCardContainer} from './ProductCardContainer'
const GRID_SPACING_AND_PADDING = {xs: 4,sm: 7, md:7, lg:10.7, xl:17};

const ProductsList = ({products} : {products:Array<Product>}) => {
  const renderedProducts = products.map((product) =>
    <Grid key={product.productId} item xs={6} sm={4} md={3} xl={3}>
      <ProductCardContainer product={product}/>
    </Grid>
  )
  return (
      <Grid container paddingX={GRID_SPACING_AND_PADDING} spacing={GRID_SPACING_AND_PADDING}>
        {renderedProducts}
      </Grid>
  );
};

export default ProductsList;
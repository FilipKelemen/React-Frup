import React from 'react';
import {SortingMode} from '../features/products/productsAPI/constants'
import ProductsList from '../components/Products/ProductsList'
import {Grid} from '@mui/material'
import {useGetProductsAndNumberOfPagesOnPageQuery} from '../features/products/productsAPI/productsAPI'

const ProductsListPage = () => {
  const {data} = useGetProductsAndNumberOfPagesOnPageQuery({page:1, sortingMode: SortingMode.NONE});
    return (
      <Grid container paddingTop={3}>
        <Grid item sx={{ display:{xs:'none', md:'block'} }} md={2}>
          <div>
            Filters
          </div>
        </Grid>
        <Grid item xs={12} md={10}>
          {data ? <ProductsList products={data.products}/> : <div>Loading...</div>}
        </Grid>
      </Grid>
    );
};

export default ProductsListPage;

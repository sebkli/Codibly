import {
  Box,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterProduct from '../filterProduct/FilterProduct';
import ProductItem from '../productItem/ProductItem';
import ProductsListProps from './ProductsListProps';

function ProductsList({
  products,
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isError,
}: ProductsListProps) {
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    const page = Number(searchParams.get('page'));

    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);

    if (newPage > page && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const page = Number(searchParams.get('page'));

    if (page > 1 || hasPreviousPage) {
      fetchPreviousPage();
    }

    if (page > 1 && hasNextPage) {
      fetchNextPage();
    }
  }, [
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    searchParams,
  ]);

  const PRODUCTS_PER_PAGE = 5;
  const startIndex = (Number(searchParams.get('page')) - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const displayedProducts = useMemo(() => {
    return products.slice(startIndex, endIndex);
  }, [products, startIndex, endIndex]);

  if (!products.length) {
    return (
      <Typography variant="h1" align="center" marginTop="1.5rem">
        No products found.
      </Typography>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="1.5rem"
      gap="1.5rem"
    >
      <FilterProduct />
      <TableContainer
        component={Paper}
        sx={{ height: '20.5rem', maxWidth: '650px' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Product ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
        {isFetchingNextPage && (
          <Typography
            variant="h4"
            align="center"
            marginTop="1.5rem"
            component="p"
          >
            Loading... <CircularProgress size={45} />
          </Typography>
        )}
        {isError && (
          <Typography
            variant="h4"
            color="error"
            align="center"
            marginTop="1.5rem"
          >
            Something went wrong
          </Typography>
        )}
      </TableContainer>
      <Pagination
        count={Math.ceil(products.length / PRODUCTS_PER_PAGE)}
        page={Number(searchParams.get('page'))}
        onChange={handleChangePage}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
}
export default ProductsList;

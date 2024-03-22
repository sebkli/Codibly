import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import Product from '../../interfaces/Product';
import ProductItem from '../productItem/ProductItem';
import styles from './filterProduct.module.css';

function FilterProduct() {
  const [searchParams, setSearchParams] = useSearchParams({ id: '' });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set('id', event.target.value);
    setSearchParams(searchParams);
  };

  const debouncedSearchTerm = useDebounce(searchParams.get('id'));

  const fetchProduct = async (id: string | null): Promise<Product> => {
    const { data } = await axios.get(`https://reqres.in/api/products/${id}`);
    return data.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', debouncedSearchTerm],
    queryFn: () => {
      return fetchProduct(debouncedSearchTerm);
    },
    enabled: !!debouncedSearchTerm,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return (
    <Box>
      <TextField
        label="Search by id"
        type="number"
        value={searchParams.get('id')}
        onChange={handleFilterChange}
        sx={{ width: '250px' }}
        className={styles.input}
      />
      {!data && debouncedSearchTerm && !isLoading && (
        <Typography variant="body1" component="p" align="center">
          No products matching the criteria.
        </Typography>
      )}
      {isLoading && (
        <Typography variant="subtitle1" align="center" component="p">
          Searching... <CircularProgress size={15} />
        </Typography>
      )}
      {error && !data && (
        <Typography
          variant="subtitle1"
          align="center"
          component="p"
          color="error"
        >
          {error?.message || 'Something went wrong'}
        </Typography>
      )}
      {data && (
        <Table sx={{ width: '250px' }}>
          <TableBody>
            <ProductItem product={data} />
          </TableBody>
        </Table>
      )}
    </Box>
  );
}
export default FilterProduct;

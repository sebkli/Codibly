import Product from '../../interfaces/Product';

interface ProductsListProps {
  products: Product[];
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
}
export default ProductsListProps;
